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

var livroController = require('../controllers/livroController');



router.post('/addLivro',upload.single('Imagem'),livroController.addLivro);
router.put('/updateStock/:id',livroController.UpdateStock);
router.delete('/deleteBook/:id',livroController.DeleteBook);
router.put('/buyBook/:id/:ISBN',livroController.buyBook);
router.get('/list',livroController.allBooks);
router.get('/getBook/:id',livroController.getBook);
router.get('/getBooksWtihoutStock',livroController.getBooksWithoutStock);
router.get('/getBooksNovos',livroController.getBooksNovos);
router.get('/getBooksUsados',livroController.getBooksUsados);


module.exports = router;