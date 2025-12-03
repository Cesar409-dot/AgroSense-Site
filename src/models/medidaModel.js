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
						ORDER BY idMedicao DESC LIMIT 7;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mostrarKpis(fkEmpresaUser) {

    var instrucaoSql = `SELECT 
    (SELECT m.umidade FROM medicao AS m ORDER BY m.idMedicao DESC LIMIT 1) as umiatual,
    (SELECT MAX(m.umidade) FROM medicao AS m LIMIT 1) AS maxumi,
    (SELECT DATE_FORMAT(m.dtMedicao, '%Hh%i') FROM medicao m
	WHERE m.umidade = (SELECT MAX(m.umidade) FROM medicao m) LIMIT 1) AS hrMax,
    (SELECT MIN(m.umidade) FROM medicao AS m LIMIT 1) as minumi,
	(SELECT COUNT(*) FROM vwAlertas)as qtdOcorrencia,
	(SELECT DATE_FORMAT(m.dtMedicao, '%Hh%i') FROM medicao m
	WHERE m.umidade = (SELECT MIN(m.umidade) FROM medicao m) LIMIT 1) AS hrMin
    FROM medicao AS m JOIN sensor s ON m.fksensor = s.idSensor
		JOIN subarea sa ON s.fkSub = sa.idSubArea
			JOIN hectare h ON sa.fkHectare = h.idHectare
				JOIN empresa e ON h.fkEmpresaHect = e.codAtivacao
                WHERE e.codAtivacao = '${fkEmpresaUser}'
                GROUP BY m.umidade
					ORDER BY m.umidade LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarGrafico(fkEmpresaUser) {

    var instrucaoSql = `SELECT m.umidade  as umi, 
     DATE_FORMAT(m.dtMedicao, '%Hh%i')AS hr
    FROM medicao AS m 
		JOIN sensor s ON m.fksensor = s.idSensor
			JOIN subarea sa ON s.fkSub = sa.idSubArea
				JOIN hectare h ON sa.fkHectare = h.idHectare
					JOIN empresa e ON h.fkEmpresaHect = e.codAtivacao
						WHERE e.codAtivacao = '${fkEmpresaUser}'
							GROUP BY m.umidade, hr
								ORDER BY hr DESC LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function mostrarGrafico(fkEmpresaUser) {

    var instrucaoSql = `SELECT m.umidade  as umi, 
     DATE_FORMAT(m.dtMedicao, '%Hh%i')AS hr
    FROM medicao AS m 
		JOIN sensor s ON m.fksensor = s.idSensor
			JOIN subarea sa ON s.fkSub = sa.idSubArea
				JOIN hectare h ON sa.fkHectare = h.idHectare
					JOIN empresa e ON h.fkEmpresaHect = e.codAtivacao
						WHERE e.codAtivacao = '${fkEmpresaUser}'
							GROUP BY m.umidade, hr
								ORDER BY hr DESC LIMIT 10;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    alertasDash,
    saudeSensores,
    mostrarKpis,
    atualizarGrafico,
    mostrarGrafico
}
