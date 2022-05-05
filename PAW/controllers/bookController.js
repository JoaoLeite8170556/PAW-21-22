var Utilizador = require('../models/utilizador');
var Livro = require('../models/book');

var bookController  = {};

bookController.addBook = (req, res) =>{
    res.render('book/create');
}

bookController.editBook = (req, res) =>{
    Livro.findById(req.params.id, (err, book) => {
      if (err) {
        res.status(400).json({ message: "Livro não encontrado!!!" });
      } else {
        res.render("book/update", { book : book });
      }
    })
}

////Método que vai adicionar um livro na BD
bookController.RegisterBook = async function(req,res,next){

    var ISBNTemp = await Livro.findOne({ISBN:req.body.ISBN}).exec();

    if(ISBNTemp){
        return res.json({message:"Este livro já exsite, não pode voltar a adicionar!!!"});
    }

    const livro = new Livro({
        /* Imagem : req.body.Imagem, */
        ISBN : req.body.ISBN,
        Titulo : req.body.Titulo,
        Autores : req.body.Autores,
        AnoPublicacao : req.body.AnoPublicacao,
        Preco : req.body.Preco,
        Editora : req.body.Editora,
        Estado : req.body.Estado,
        Stock : req.body.Stock
    });


    livro.save(function(err,livro){
        if(err){ return next(err)}
        res.redirect('/books/list');
    });


}

///Método que permite editar os dados de um livro
bookController.Update = function(req,res,next){

    Livro.findByIdAndUpdate(req.params.id,req.body,{ useFindAndModify: false},(err)=>{
        if (err) {
            return next(err);
          }
          res.redirect('/books/list');
    });
}

////Método para atualizar o stock de um determinado livro
bookController.UpdateStock = async function(req,res,next){
    const sotck = {
        Stock : req.body.Stock
    }

   const livroTemp =  await Livro.findOne({_id:req.params.id}).exec(); 

   if(!livroTemp){
       return res.json({message:"Este livro não existe!!!"});
   }

   if(livroTemp.Stock == sotck.Stock){
       return res.json({message:"Stock introduzido igual ao que já estava!!"});
   }

    Livro.findByIdAndUpdate(req.params.id,{$set:sotck},{ useFindAndModify: false},(err)=>{
        if (err) {
            return next(err);
          }
          return res.status(200).json({message:"Stock atualizado com sucesso!!"});
    });
}

////Método para remover livro
bookController.DeleteBook = function(req,res){
    Livro.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
          res.status(400).json({ message: "Livro não encontrado!!!" });
        } else {
          res.redirect('/books/list');
        }
      });
}


/// Método para comprar um livro
bookController.buyBook = async function(req,res){
    var id = req.cookies["user"]._id;
    console.log(id,req.params.id);

    const utilizador = await Utilizador.findOne({_id : id}).exec();

    if(!utilizador){
        return res.status(404).json({message: "Este utilizador não existe!!"});
    }

    const book = await Livro.findOne({_id: req.params.id}).exec();

    if(!book){
        return res.status(404).json({message: "Este livro não existe!!!"});
    }

    if(book.Stock == 0){
        return res.json({message:"Não pode comprar este livro, porque já não em stock!!!"});
    }

    let newStock = book.Stock - 1;

    console.log(newStock);

    ////Metodo para adicionar o livro ao utilizador
    Utilizador.findOneAndUpdate({_id:id},
        {$push:{LivrosComprados: book}},
        {new: true, upsert: true },
        function(error,success){
            if(error){
                console.log(error);
            }else{
                console.log(success);
            }
        }).exec();

    /// Metodo para atualizar o stock do livro
    Livro.findOneAndUpdate({_id:req.params.id},{$set:{Stock:newStock}},{new:true,upsert:true},
        function(error,success){
            if(error){
                console.log(error);
            }else{
                console.log(success);
            }
        }).exec();

    return res.status(200).json({
        message: "Este livro foi comprado com sucesso!!!"
    });

}

///Método que retorna uma lista de livros
bookController.allBooks = function(req,res,next){
    Livro.find({}).exec((err,books)=>{
        if(err){
            console.log("Erro a obter os dados da BD");
            next(err);
        }else{
            console.log(books);
            res.render("book/list", { books: books });
        }
    });
}

/// Metódo que retorna um livro
bookController.getBook = function(req,res){
    Livro.findOne({_id:req.params.id},(err,book)=>{
        if(err){
            res.status(400).json({message : "O livro não foi encontrado!!!"});
        }else{
            res.render("book/details", { book: book });
        }});
        
}

///Método que retorna livros onde não tem stock
bookController.getBooksWithoutStock = function(req,res,next){
    Livro.find({Stock : 0}).exec((err,livros)=>{
        if(err){
            console.log("Erro a obter os dados da BD");
            next(err);
        }else{
            console.log(livros);
            res.status(201).json(livros);
        }
    });
}
///Método que retorna livros que tenham o estado "Novo"
bookController.getBooksNovos = function(req,res,next){
    Livro.find({Estado : 'Novo'}).exec((err,livros)=>{
        if(err){
            console.log("Erro a obter os dados da BD");
            next(err);
        }else{
            console.log(livros);
            res.status(201).json(livros);
        }
    });
}

////Método que retorna livros que estão com o estado "Usado"
bookController.getBooksUsados = function(req,res,next){
    Livro.find({Estado : 'Usado'}).exec((err,livros)=>{
        if(err){
            console.log("Erro a obter os dados da BD");
            next(err);
        }else{
            console.log(livros);
            res.status(201).json(livros);
        }
    });
}




module.exports = bookController;