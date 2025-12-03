var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/saudeSensores", function (req, res) {
    medidaController.saudeSensores(req, res);
})

router.post("/alertasDash", function (req, res) {
    medidaController.alertasDash(req, res);
})

router.post("/mostrarKpis", function (req, res) {
    medidaController.mostrarKpis(req, res);
})

router.post("/atualizarGrafico", function (req, res) {
    medidaController.atualizarGrafico(req, res);
})

router.post("/mostrarGrafico", function (req, res) {
    medidaController.mostrarGrafico(req, res);
})

module.exports = router;