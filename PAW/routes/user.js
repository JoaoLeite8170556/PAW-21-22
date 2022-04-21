var express = require('express');
var router = express.Router();


var Users = require('../controllers/userController');

router.post('/RegisterCliente',Users.RegisterCliente);
router.post('/RegisterFuncionario',Users.RegisterFuncionario);
router.get('/GetUtilizador/:id',Users.GetUtilizador);
router.get('/GetAllUsers',Users.GetAllUsers);



module.exports = router;

