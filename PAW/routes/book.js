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

router.get('/addBook', bookController.addBook);
router.get('/editBook/:id', bookController.editBook);

router.post('/register', bookController.RegisterBook);
router.post('/updateStock/:id',bookController.UpdateStock);
router.get('/delete/:id',userController.verifyFuncionario,bookController.DeleteBook);
router.put('/buyBook/:id',bookController.buyBook);
router.get('/list',bookController.allBooks);
router.get('/show/:id',bookController.getBook);
router.get('/getBooksWtihoutStock',bookController.getBooksWithoutStock);
router.get('/new',bookController.getBooksNovos);
router.get('/used',bookController.getBooksUsados);
router.post('/update/:id', bookController.Update);


module.exports = router;