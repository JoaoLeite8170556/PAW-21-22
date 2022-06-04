var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


router.post('/client/register', userController.RegisterCliente);
router.post('/employee/register', userController.verifyToken, userController.verifyAdmin, userController.RegisterFuncionario);
router.get('/show/:id', userController.GetUtilizador);
router.get('/list', userController.list);
router.post('/editPassword/:id',userController.verifyToken, userController.EditPassword);
router.get('/getAvaliacoesLivros/:id',userController.GetAvaliacoesUtilizadorALivros);
router.post('/login', userController.login);
router.get('/delete/:id',userController.verifyToken, userController.verifyAdmin, userController.DeleteUser);


module.exports = router;

