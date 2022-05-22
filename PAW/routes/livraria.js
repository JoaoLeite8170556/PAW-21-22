var express = require('express');
var router = express.Router();


const livrariaController = require('../controllers/livrariaController');


router.post("/postData",livrariaController.createInformation);
router.get("/getInformationAboutLivraria",livrariaController.getInformationLivraria);
router.put("/updateInformationLivraria",livrariaController.updateInformation);

module.exports = router;