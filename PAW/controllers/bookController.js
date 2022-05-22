var Utilizador = require("../models/utilizador");
var Livro = require("../models/book");
const book = require("../models/book");
const { render } = require("ejs");

var bookController = {};

bookController.addBook = (req, res) => {
  res.render("book/create");
};

bookController.editBook = (req, res) => {
  Livro.findById(req.params.id, (err, book) => {
    if (err) {
      res.status(400).json({ message: "Livro não encontrado!!!" });
    } else {
      res.render("book/update", { book: book });
    }
  });
};

////Método que vai adicionar um livro na BD
bookController.RegisterBook = async function (req, res, next) {
  var ISBNTemp = await Livro.findOne({ ISBN: req.body.ISBN }).exec();

  if (ISBNTemp) {
    return res.json({
      message: "Este livro já exsite, não pode voltar a adicionar!!!",
    });
  }

  const livro = new Livro({
    /* Imagem : req.body.Imagem, */
    ISBN: req.body.ISBN,
    Titulo: req.body.Titulo,
    Autores: req.body.Autores,
    AnoPublicacao: req.body.AnoPublicacao,
    Preco: req.body.Preco,
    Editora: req.body.Editora,
    Estado: req.body.Estado,
    Stock: req.body.Stock,
    LivroAprovado: true
  });

  livro.save(function (err, livro) {
    if (err) {
      return next(err);
    }
    res.redirect("/books/list");
  });
};

///Método que permite editar os dados de um livro
bookController.Update = function (req, res, next) {
  Livro.findByIdAndUpdate(
    req.params.id,
    req.body,
    { useFindAndModify: false },
    (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/books/list");
    }
  );
};

//Método para renderizar update Stock
bookController.editStock = (req, res) =>{
    Livro.findById(req.params.id, (err, book) => {
        if (err) {
          res.status(400).json({ message: "Utilizador não encontrado!!!" });
        } else {
          res.render("book/editStock", { book: book });
        }
      })
}

////Método para atualizar o stock de um determinado livro
bookController.UpdateStock = async function (req, res, next) {
  const stock = {
    Stock: req.body.Stock,
  };

  const livroTemp = await Livro.findOne({ _id: req.params.id }).exec();

  if (!livroTemp) {
    return res.redirect('back');
  }

  if (livroTemp.Stock == stock.Stock) {
    return res.redirect('back');
  }

  Livro.findByIdAndUpdate(
    req.params.id,
    { $set: stock },
    { useFindAndModify: false },
    (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/books/list")
    }
  );
};

////Método para remover livro
bookController.DeleteBook = function (req, res) {
  Livro.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(400).json({ message: "Livro não encontrado!!!" });
    } else {
      res.redirect("/books/list");
    }
  });
};

bookController.buy = (req, res) => {
  Livro.findById(req.params.id, (err, book) => {
    if (err) {
      res.status(400).json({ message: "Livro não encontrado!!!" });
    } else {
      res.render("book/buy", { book: book });
    }
  });
};

/// Método para comprar um livro
bookController.buyBook = async function (req, res) {
  var id = req.cookies["user"]._id;

  const utilizador = await Utilizador.findOne({ _id: id }).exec();

  if (!utilizador) {
    return res.status(404).json({ message: "Este utilizador não existe!!" });
  }

  const book = await Livro.findOne({ _id: req.params.id }).exec();

  if (!book) {
    return res.status(404).json({ message: "Este livro não existe!!!" });
  }

  if(book.LivroAprovado == false){
    return res.json({message:"Não pode comprar o livro porque ele não esta aceite pelo um funcionário!!!"});
  }

  if (book.Stock == 0) {
    return res.redirect("/books/show/" + book._id);
  }

  let newStock = book.Stock - 1;
  let newAquisicoes = utilizador.NumAquisicoes + 1;
  var newPontos = utilizador.Pontos;



  if (utilizador.CategoriaIdade == "Infantil") {
    newPontos += 10 + book.Preco;
  } else if (utilizador.CategoriaIdade == "Adolescente") {
    newPontos += 15 + book.Preco;
  } else if (utilizador.CategoriaIdade == "Adulto") {
    newPontos += 20 + book.Preco;
  } else if (utilizador.CategoriaIdade == "Senior") {
    newPontos += 25 + book.Preco;
  }

  ////Metodo para adicionar o livro ao utilizador
  Utilizador.findOneAndUpdate(
    { _id: id },
    { $push: { LivrosComprados: book } },
    { new: true, upsert: true },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  ).exec();

  /// Metodo para atualizar o stock do livro
  Livro.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { Stock: newStock } },
    { new: true, upsert: true },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  ).exec();

  /// Método para atualizar o num aquisições
  Utilizador.findOneAndUpdate(
    { _id: id },
    { $set: { NumAquisicoes : newAquisicoes, Pontos : newPontos } },
    { new: true, upsert: true },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  ).exec();

  return res.redirect("/books/list");
};

///metodo que vai possibilitar colocar livros a venda pelo utilizador
bookController.sellBook = async function(req,res){
  ///Depois temos que descomentar
  //var id = req.cookies["user"]._id;

  const utilizador = await Utilizador.findOne({ _id: req.params.id }).exec();


  if(!utilizador){
      return res.json({message:"Este utilizador não existe!!!"});
  }


  var ISBNTemp = await Livro.findOne({ ISBN: req.body.ISBN }).exec();

  if (ISBNTemp) {
    return res.json({
      message: "Este livro já exsite, não pode voltar a adicionar!!!",
    });
  }
  const livro = new Livro({
    /* Imagem : req.body.Imagem, */
    ISBN: req.body.ISBN,
    Titulo: req.body.Titulo,
    Autores: req.body.Autores,
    AnoPublicacao: req.body.AnoPublicacao,
    Preco: req.body.Preco,
    Editora: req.body.Editora,
    Estado: req.body.Estado,
    Stock: req.body.Stock,
    IDVendedor: req.params.id
  });


  livro.save(function (err, livro) {
    if (err) {
      console.log(err);
    }
   return res.json({livro});
  });


};

bookController.GetAllBooksForAccept = async function(req,res){
  Livro.find({ LivroAprovado: false }).exec((err, livros) => {
    if (err) {
      console.log("Erro a obter os dados da BD");
      next(err);
    } else {
      console.log(livros);
      res.status(201).json(livros);
    }
  });
};


///Método que vai colocar o livro disponivel para ser comprado
bookController.ApprovedBook = async function(req,res){
    const livro = await Livro.findOne({ _id: req.params.id }).exec();

    if(!livro){
      return res.json({message:"Este livro não existe"});
    }

    if(livro.LivroAprovado == true){
      return res.json({message:"Este livro já foi aprovado para ser vendido!!!"});
    }

    const utilizador = await Utilizador.findOne({_id: livro.IDVendedor});

    if(!utilizador){
      return res.json({message: "Este utilizador não existe"});
    }

    let numVendas = utilizador.QuantidadeVendas + 1 + livro.Stock;
    let valorTotalVendas = utilizador.ValorTotalVendas + livro.Preco;
    

    Utilizador.findOneAndUpdate(
      { _id: utilizador._id },
      { $set: { QuantidadeVendas : numVendas, ValorTotalVendas : valorTotalVendas } },
      { new: true, upsert: true},
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    ).exec();

    Livro.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { LivroAprovado: true } },
      { new: true, upsert: true},
      function (error, success) {
        if (error) {
         console.log(error);
        } else {
          console.log(success);
        }
      }
      ).exec();

      return res.json({message:"Livro aprovado com sucesso;"});
  
};

///Método que retorna uma lista de livros (Aprovados para venda)
bookController.allBooks = function (req, res, next) {
  Livro.find({LivroAprovado : true}).exec((err, books) => {
    if (err) {
      console.log("Erro a obter os dados da BD");
      next(err);
    } else {
      return res.json({books});
    }
  });
};

/// Metódo que retorna um livro
bookController.getBook = function (req, res) {
  Livro.findOne({ _id: req.params.id }, (err, book) => {
    if (err) {
      res.status(400).json({ message: "O livro não foi encontrado!!!" });
    } else {
      res.json({book});
    }
  });
};


///Metódo para retorna livros vendidos por um respetivo cliente
bookController.getBookVendidosPorCliente = async function(req,res){
  var utilizador = await Utilizador.findOne({ _id : req.params.id }).exec();

  if(!utilizador){
    return res.json({message:"Este utilizador não existe"});
  }

  Livro.find({LivroAprovado : true, IDVendedor : req.params.id}).exec((err, books) => {
    if (err) {
      console.log("Erro a obter os dados da BD");
      next(err);
    } else {
      return res.json({books});
    }
  });

};


bookController.getBookAindaNaoVendidosPorCliente = async function(req,res){
  var utilizador = await Utilizador.findOne({ _id : req.params.id }).exec();

  if(!utilizador){
    return res.json({message:"Este utilizador não existe"});
  }

  Livro.find({LivroAprovado : false, IDVendedor : req.params.id}).exec((err, books) => {
    if (err) {
      console.log("Erro a obter os dados da BD");
      next(err);
    } else {
      return res.json({books});
    }
  });

};

///Método que retorna livros onde não tem stock
bookController.getBooksWithoutStock = function (req, res, next) {
  Livro.find({ Stock: 0 }).exec((err, livros) => {
    if (err) {
      console.log("Erro a obter os dados da BD");
      next(err);
    } else {
      console.log(livros);
      res.status(201).json(livros);
    }
  });
};
///Método que retorna livros que tenham o estado "Novo"
bookController.getBooksNovos = function (req, res, next) {
  Livro.find({ Estado: "Novo" }).exec((err, books) => {
    if (err) {
      console.log("Erro a obter os dados da BD");
      next(err);
    } else {
      console.log(books);
      res.render("book/list", { books: books });
    }
  });
};

////Método que retorna livros que estão com o estado "Usado"
bookController.getBooksUsados = function (req, res, next) {
  Livro.find({ Estado: "Usado" }).exec((err, books) => {
    if (err) {
      console.log("Erro a obter os dados da BD");
      next(err);
    } else {
      console.log(books);
      res.render("book/list", { books: books });
    }
  });
};

module.exports = bookController;
