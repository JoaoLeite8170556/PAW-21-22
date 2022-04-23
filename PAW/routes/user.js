var express = require('express');
var router = express.Router();
const multer = require("multer");

var userController = require('../controllers/userController');


var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads')
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname)
    }
})

var upload = multer({storage : storage});

router.post('/cliente/create',userController.RegisterCliente);
router.post('/funcionario/create',userController.RegisterFuncionario);
router.get('/show/:id',userController.GetUtilizador);
router.get('/list',userController.list);
router.put('/edit/:id',userController.editUser);
router.put('/editPassword/:_id',userController.EditPassword);
router.post('/login',userController.login);


module.exports = router;

