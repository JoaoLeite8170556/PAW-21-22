var express = require('express');
var router = express.Router();
const storage = require('../helpers/storage');

const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');

router.post('/register',storage, bookController.RegisterBook);
router.post('/updateStock/:id',userController.verifyToken, userController.verifyFuncionario, bookController.UpdateStock);
router.get('/delete/:id',userController.verifyFuncionario,bookController.DeleteBook);
router.post('/buyBook/:id/:idUtilizador',bookController.buyBook);
router.post('/sellBook/:id',bookController.sellBook);
router.put("/acceptedBookToSell/:id",bookController.ApprovedBook);
router.post('/list',userController.verifyToken, bookController.allBooks);
router.get('/list',bookController.allBooks);
router.get('/show/:id', bookController.getBook);
router.get('/getBooksWtihoutStock',userController.verifyToken,bookController.getBooksWithoutStock);
router.get('/getBooksWtihoutAccept',bookController.GetAllBooksForAccept);
router.get('/getBooksVendidosPorCliente/:id',bookController.getBookVendidosPorCliente);
router.get('/getBooksAindaNaoVendidosPorCliente/:id',bookController.getBookAindaNaoVendidosPorCliente);
router.get('/new',userController.verifyToken, bookController.getBooksNovos);
router.get('/used',userController.verifyToken, bookController.getBooksUsados);
router.post('/update/:id',userController.verifyToken,bookController.Update);
router.put('/avaliarBook/:id/:idUtilizador',bookController.AvaliarBook);


module.exports = router;