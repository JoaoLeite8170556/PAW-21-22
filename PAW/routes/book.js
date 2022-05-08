var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require('path');


var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(path.dirname(__dirname),'/uploads/'));
    },
    filename : function(req,file,cb){
        cb(null,file.originalname);
    }
});

var upload = multer({storage : storage});

const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');

router.get('/addBook', userController.verifyToken, userController.verifyFuncionario, bookController.addBook);
router.get('/editBook/:id', userController.verifyToken, userController.verifyFuncionario, bookController.editBook);
router.get('/buy/:id', userController.verifyToken, userController.verifyCliente, bookController.buy);
router.get('/editStock/:id', userController.verifyToken, userController.verifyFuncionario, bookController.editStock);

router.post('/register', userController.verifyToken, userController.verifyFuncionario, bookController.RegisterBook);
router.post('/updateStock/:id',userController.verifyToken, userController.verifyFuncionario, bookController.UpdateStock);
router.get('/delete/:id',userController.verifyFuncionario,bookController.DeleteBook);
router.post('/buyBook/:id',userController.verifyToken,bookController.buyBook);
router.post('/list',userController.verifyToken, bookController.allBooks);
router.get('/list',userController.verifyToken, bookController.allBooks);
router.get('/show/:id',userController.verifyToken, bookController.getBook);
router.get('/getBooksWtihoutStock',userController.verifyToken,bookController.getBooksWithoutStock);
router.get('/new',userController.verifyToken, bookController.getBooksNovos);
router.get('/used',userController.verifyToken, bookController.getBooksUsados);
router.post('/update/:id',userController.verifyToken,bookController.Update);


module.exports = router;