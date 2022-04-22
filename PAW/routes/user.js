var express = require('express');
var router = express.Router();


var userController = require('../controllers/userController');

router.post('/cliente/create',userController.RegisterCliente);
router.post('/funcionario/create',userController.RegisterFuncionario);
router.get('/show/:id',userController.GetUtilizador);
router.get('/list',userController.list);
router.put('/edit/:id',userController.editUser);
router.put('/editPassword/:_id',userController.EditPassword);


module.exports = router;

