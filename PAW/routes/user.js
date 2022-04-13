var express = require('express');
var router = express.Router();


var AuthController = require('../controllers/userController');

router.post('/RegisterCliente',AuthController.RegisterCliente);
router.post('/RegisterFuncionario',AuthController.RegisterFuncionario);
router.get('/GetUser/:id',AuthController.GetUtilizador);
router.get('/GetAllUsers',AuthController.GetAllUsers);



module.exports = router;

