const fs = require('fs-extra')
const Json2csvParser = require("json2csv").Parser

class GenerateCsvService {

    constructor(data) {
        this._data = data
    }

    generateCSV = (nameReport) => {
        const filePath = process.env.FILE_PATH+nameReport
        const jsonData = this._data
        const json2csvParser = new Json2csvParser({ header: true})
        const csv = json2csvParser.parse(jsonData);

        if (!fs.existsSync(process.env.FILE_PATH)){
            fs.mkdirSync(process.env.FILE_PATH);
        }

        return fs.writeFile(filePath, csv);
    };
}

module.exports = GenerateCsvService