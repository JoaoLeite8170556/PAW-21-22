var Utilizador = require('../models/utilizador');
var Livro = require('../models/livro');
const { findByIdAndUpdate, findByIdAndRemove, find, findOne } = require('../models/utilizador');


var livroController  = {};





////Método que vai adicionar um livro na BD
livroController.addLivro = async function(req,res,next){

    var ISBNTemp = await Livro.findOne({ISBN:req.body.ISBN}).exec();

    if(ISBNTemp){
        return res.json({message:"Este livro já exsite, não pode voltar a adicionar!!!"});
    }

    const livro = new Livro({
        Imagem : req.body.Imagem,
        ISBN : req.body.ISBN,
        Titulo : req.body.Titulo,
        Autores : req.body.Autores,
        AnoPublicacao : req.body.AnoPublicacao,
        Preco : req.body.Preco,
        Estado : req.body.Estado,
        Stock : req.body.Stock
    });


    livro.save(function(err,livro){
        if(err){ return next(err)}
        res.status(201).json(livro);
    });


}

////Método para atualizar o stock de um determinado livro
livroController.UpdateStock = function(req,res,next){


    const sotck = {
        Stock : req.body.Stock
    }

    Livro.updateOne(req.params.ISBN,{$set:sotck}, { new: true },(err,livro)=>{
        if(err){return next(err)}

        return res.status(200).json(livro);
    });
}

module.exports = livroController;