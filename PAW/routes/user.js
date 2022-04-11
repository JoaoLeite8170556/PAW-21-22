var express = require('express');
var router = express.Router();


var AuthController = require('../controllers/userController');

router.post('/RegisterCliente',AuthController.RegisterCliente);

module.exports = router;