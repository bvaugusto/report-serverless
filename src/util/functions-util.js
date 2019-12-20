class FunctionsUtil {

    getDateNow = () => {
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(),
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"-"+mesF+"-"+anoF;
    };

    formatEmailRecipients = emails => {
        emails = emails.replace(/\s/g, '');
        emails = emails.split(',')

        return emails
    };

    getNameReportCSV = nameReport => nameReport + '-' + this.getDateNow() + '.csv';
}

module.exports = FunctionsUtil