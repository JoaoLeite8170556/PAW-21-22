var Livraria = require("../models/livraria");

var livrariaController = {};

livrariaController.createInformation = function(req,res,){
    const livraria = new Livraria();
    livraria.save(function (err, livraria) {
        if (err) {
          return next(err);
        }
        return res.json({livraria});
      });
}

///Obter dados sobre os decontos na aquisição de livros
livrariaController.getInformationLivraria = function(req,res){
    Livraria.find({}, (err, livraria) => {
        if (err) {
          res.status(400).json({ message: "A informação da livraria não foi encontrado!!!" });
        } else {
          res.json({livraria});
        }
      });
}

//Metodo para atualizar a informação dos descontos dos livros
livrariaController.updateInformation = function(req,res){
    Livraria.findByIdAndUpdate("628a7d88e4ec03e5112f617b", req.body, { useFindAndModify: false}, (err) => {
        if (err) {
          return next(err);
        }
        res.json({message:"Dados atualizados com sucesso"});
      });
}

module.exports = livrariaController;
