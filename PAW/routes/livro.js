var express = require('express');
var router = express.Router();


var livroController = require('../controllers/livroController');


router.post('/addLivro',livroController.addLivro);
router.put('/updateStock/:id',livroController.UpdateStock);


module.exports = router;