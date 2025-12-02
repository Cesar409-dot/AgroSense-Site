var medidaModel = require("../models/medidaModel");



function saudeSensores(req, res) {

    var fkEmpresaUser = req.body.codEmpresaServer;

    console.log(`Recebendo a saúde dos sensores`);

    medidaModel.saudeSensores(fkEmpresaUser).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function alertasDash(req, res) {

    var fkEmpresaUser = req.body.codEmpresaServer;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.alertasDash(fkEmpresaUser).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function mostrarKpis(req, res) {

    var fkEmpresaUser = req.body.codEmpresaServer;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.mostrarKpis(fkEmpresaUser).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    alertasDash,
    saudeSensores,
    mostrarKpis
}