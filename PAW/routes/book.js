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

var bookController = require('../controllers/bookController');

router.get('/addBook', bookController.addBook);
router.get('/editBook/:id', bookController.editBook);

router.post('/register',upload.single('Imagem'),bookController.RegisterBook);
router.post('/updateStock/:id',bookController.UpdateStock);
router.get('/delete/:id',bookController.DeleteBook);
router.post('/buyBook/:id/:ISBN',bookController.buyBook);
router.get('/list',bookController.allBooks);
router.get('/show/:id',bookController.getBook);
router.get('/getBooksWtihoutStock',bookController.getBooksWithoutStock);
router.get('/getBooksNovos',bookController.getBooksNovos);
router.get('/getBooksUsados',bookController.getBooksUsados);
router.post('/update/:id', bookController.Update);


module.exports = router;