var express = require('express');
var router = express.Router();


const userController = require('../controllers/userController');



router.get('/client/addClient', userController.addClient);
router.get('/employee/addEmployee',userController.verifyToken,userController.addEmployee);
router.get('/editUser/:id',userController.verifyToken,userController.editUser);

router.post('/client/register',userController.RegisterCliente);
router.post('/employee/register',userController.RegisterFuncionario);
router.get('/show/:id',userController.verifyToken,userController.GetUtilizador);
router.get('/list',userController.list);
router.put('/update/:id',userController.Update);
router.post('/editPassword/:_id',userController.EditPassword);
router.post('/login',userController.login);
router.get('/logout');
router.get('/delete/:id',userController.DeleteUser);


module.exports = router;

