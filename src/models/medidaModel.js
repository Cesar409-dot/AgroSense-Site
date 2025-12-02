var database = require("../database/config");


function saudeSensores(fkEmpresaUser) {

    var instrucaoSql = `SELECT (SELECT COUNT(*) FROM sensor s JOIN subarea sa ON s.fkSub = sa.idSubArea
			JOIN hectare h ON sa.fkHectare = h.idHectare
				JOIN empresa e ON h.fkEmpresaHect = e.codAtivacao WHERE statuss = 0 AND e.codAtivacao = '${fkEmpresaUser}') AS 'Offline', (SELECT COUNT(*) FROM sensor s JOIN subarea sa ON s.fkSub = sa.idSubArea
			JOIN hectare h ON sa.fkHectare = h.idHectare
				JOIN empresa e ON h.fkEmpresaHect = e.codAtivacao WHERE statuss = 1 AND e.codAtivacao = '${fkEmpresaUser}') AS 'Online';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alertasDash(fkEmpresaUser) {

    var instrucaoSql = `SELECT CONCAT(DATE_FORMAT(m.dtMedicao, '%d/%m/%Y - %H:%i'), ' | ', 'Hectare ', h.identificacaoHect, ' - ', 'Subárea ', sa.identificacaoSub) AS 'Ocorrência' FROM medicao m
	JOIN sensor s ON m.fksensor = s.idSensor
		JOIN subarea sa ON s.fkSub = sa.idSubArea
			JOIN hectare h ON sa.fkHectare = h.idHectare
				JOIN empresa e ON h.fkEmpresaHect = e.codAtivacao
					WHERE m.umidade > 80 OR m.umidade < 60 AND e.codAtivacao = '${fkEmpresaUser}'
						LIMIT 7;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mostrarKpis(fkEmpresaUser) {

    var instrucaoSql = ``;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    alertasDash,
    saudeSensores,
    mostrarKpis
}
