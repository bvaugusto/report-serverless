const aws = require('aws-sdk')
const ses = new aws.SES();
const fs = require('fs-extra')
const nodemailer = require('nodemailer')
const FunctionsUtil = require('../util/functions-util')

class AWSService {

    sendFileS3 = nameReportCSV => new Promise(async (resolve, reject) => {

        try {

            const filePath = `${process.env.FILE_PATH+nameReportCSV}`

            aws.config.update({region: process.env.REGION})

            const s3 = new aws.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ACCOUNT,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ACCOUNT
            })

            const file = await fs.readFile(filePath);

            const params = {
                Bucket: process.env.BUCKET,
                Key: nameReportCSV,
                Body: file,
                ACL: 'public-read',
                ContentType: 'application/octet-stream'
            }

            await s3.putObject(params).promise();

            s3.getSignedUrl('getObject', {Bucket: process.env.BUCKET, Key: nameReportCSV})
            const urlFile = s3.getSignedUrl('getObject', {Bucket: process.env.BUCKET, Key: nameReportCSV})

            await fs.unlinkSync(filePath)

            resolve(urlFile)
        } catch (error) {
            reject(error)
        }
    })

    sendEMail = (emails, urlFile) => new Promise((resolve, reject) => {
        try {

            const functions = new FunctionsUtil()

            let transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                SES: ses,
                port: process.env.EMAIL_PORT,
                secure: process.env.EMAIL_SECURE,
                auth: {
                    user: process.env.EMAIL_USER_ACCOUNT,
                    pass: process.env.PASSWORD_ACCOUNT_EMAIL
                },
                tls: { rejectUnauthorized: process.env.EMAIL_REJECT_AUTH }
            });

            let mailOptions = {
                from: process.env.EMAIL_USER_ACCOUNT,
                to: functions.formatEmailRecipients(emails),
                subject: `[Relatório - ${functions.getDateNow()}]`,
                text: `[Relatório - ${functions.getDateNow()}]`,
                html: `Segue o link para download do relatório: <a href="${urlFile}">Link relatório</a>`
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) reject(err)
                resolve('Email sent successfully')
            });
        } catch (e) {
            reject(e)
            return {statusCode: 400, body: JSON.stringify(e)}
        }
    })
}

module.exports = AWSService
