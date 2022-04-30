var express = require('express');
var router = express.Router();


var userController = require('../controllers/userController');




router.post('/cliente/create',userController.RegisterCliente);
router.post('/funcionario/create',userController.RegisterFuncionario);
router.get('/show/:id',userController.verifyToken,userController.GetUtilizador);
router.get('/list',userController.verifyToken,userController.verifyAdmin,userController.list);
router.put('/edit/:id',userController.editUser);
router.put('/editPassword/:_id',userController.EditPassword);
router.post('/login',userController.login);


module.exports = router;

