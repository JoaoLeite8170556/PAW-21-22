var express = require('express');
var router = express.Router();


var livroController = require('../controllers/livroController');


router.post('/addLivro',livroController.addLivro);
router.put('/updateStock/:id',livroController.UpdateStock);
router.delete('/deleteBook/:ISBN',livroController.DeleteBook);
router.put('/buyBook/:id/:ISBN',livroController.buyBook);
router.get('/allBooks',livroController.allBooks);


module.exports = router;