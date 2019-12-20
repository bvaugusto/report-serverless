const mysql = require('mysql')

class DBConnect {

    constructor(host, user, password, database) {
        this._host = host
        this._user = user
        this._password = password
        this._database = database
    }

    createConnectionDB = () => {
        const connection = mysql.createConnection({
            host: this._host,
            user: this._user,
            password: this._password,
            database: this._database
        })

        connection.connect()

        return connection
    };

    executeSql = (connection, sql) => new Promise(function (resolve, reject) {
        connection.query(sql, function (err, rows) {
            if (err) reject(err);
            resolve(rows)
        });
        connection.end()
    });
}

module.exports = DBConnect