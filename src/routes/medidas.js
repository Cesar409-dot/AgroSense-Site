var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/saudeSensores", function (req, res) {
    medidaController.saudeSensores(req, res);
})

router.get("/alertasDash", function (req, res) {
    medidaController.alertasDash(req, res);
})

module.exports = router;