var database = require("../database/config");


function saudeSensores() {

    var instrucaoSql = `SELECT (SELECT COUNT(*) FROM sensor WHERE statuss = 0) AS 'Offline', (SELECT COUNT(*) FROM sensor WHERE statuss = 1) AS 'Online'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alertasDash(fkEmpresaUser) {

    var instrucaoSql = ``;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    alertasDash,
    saudeSensores
}
