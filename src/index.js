const DBConnect = require('./infra/db')
const GenerateCsvService = require('./services/generate-csv-service')
const AWSService = require('./services/aws-service')
const FunctionsUtil = require('./util/functions-util')

const getConfigReport = async codigo => {
    const db = new DBConnect(process.env.DB_HOST_CONFIG, process.env.DB_USER_CONFIG, process.env.DB_PASSWORD_CONFIG, process.env.DB_DATABASE_CONFIG)
    const connection = db.createConnectionDB()
    const sql = `select code, name, host, user, password, dbname, command, email from report_on_demand where code = '${codigo}'`;

    return db.executeSql(connection, sql)
};

const getDataReport = async (configReport) => {
    const db = new DBConnect(configReport[0].host, configReport[0].user, configReport[0].password, configReport[0].dbname)
    const connection = db.createConnectionDB()

    return db.executeSql(connection, configReport[0].command)
};

exports.handle = async function handle (event){

    try {

        const body = event
        const codigo = body.pathParameters.codigo
        const configReport = await getConfigReport(codigo)

        const functions = new FunctionsUtil()
        nameReportCSV = functions.getNameReportCSV(configReport[0].name)

        //Gerando arquivo CSV
        const dataReport = await getDataReport(configReport)
        const generateCsv = new GenerateCsvService(dataReport[0])
        await generateCsv.generateCSV(nameReportCSV)

        //Enviando arquivo para o S3
        const aws = new AWSService()
        const urlFile = await aws.sendFileS3(nameReportCSV)

        //Enviando e-mail
        await aws.sendEMail(configReport[0].email, urlFile)

        return {
            statusCode: 200,
            body: JSON.stringify('Gerado com sucesso!')
        };

    } catch (exception) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: exception.message, stack: exception.stack})
        }
    }
}
