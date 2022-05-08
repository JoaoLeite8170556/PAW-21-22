var express = require('express');
var router = express.Router();


const userController = require('../controllers/userController');



router.get('/client/addClient', userController.addClient);
router.get('/employee/addEmployee',userController.verifyToken, userController.verifyAdmin, userController.addEmployee);
router.get('/editUser/:id',userController.verifyToken,userController.editUser);
router.get('/changePassword/:id', userController.changePassword);

router.get('/profile', userController.verifyToken, userController.getLoggedUser);
router.post('/client/register',userController.RegisterCliente);
router.post('/employee/register', userController.verifyToken, userController.verifyAdmin, userController.RegisterFuncionario);
router.get('/show/:id', userController.GetUtilizador);
router.get('/list',userController.list);
router.post('/update/:id',userController.Update);
router.post('/editPassword/:id',userController.EditPassword);
router.post('/login',userController.login);
router.get('/logout', userController.verifyToken, userController.logOut);
router.get('/delete/:id',userController.DeleteUser);


module.exports = router;

