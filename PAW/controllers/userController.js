var Utilizador = require('../models/utilizador');
var Livro = require('../models/livro');
const bcrypt = require("bcryptjs");



var userController = {};

///Método que vai servir para guardar um Cliente
userController.RegisterCliente = function(req,res,next){

    var hashedPassword = bcrypt.hashSync(req.body.Password,8);

    const user = new Utilizador({
        Nome: req.body.Nome,
        Email: req.body.Email,
        Password: hashedPassword,
        Morada: req.body.Morada,
        Genero: req.body.Genero,
        DataNascimento: req.body.DataNascimento,
        Role: "Cliente"
    });

   user.save(function(err,cliente){
       if(err){ return next(err)}
       res.status(201).json(cliente);
   });
}

////Método que vai criar um Funcionário
userController.RegisterFuncionario = function(req,res,next){

    var hashedPassword = bcrypt.hashSync(req.body.Password,8);
    const user = new Utilizador({
        Nome: req.body.Nome,
        Email: req.body.Email,
        Password: hashedPassword,
        Morada: req.body.Morada,
        Genero: req.body.Genero,
        DataNascimento: req.body.DataNascimento,
        Role: "Funcionario"
    });

   user.save(function(err,Funcionario){
       if(err){ return next(err)}
       res.status(201).json(Funcionario);
   });
}

///Método que retorna o Utilizador aleatorio
userController.GetUtilizador = function(req,res){
    Utilizador.findById(req.params.id,(err,user)=>{
        if(err){
            res.status(400).json(err);
        }else{
            res.status(200).json(user);
        }
    })
}


///Método que retorna todos os Utilizadores
userController.list = function(req,res,next){
    Utilizador.find({}).exec((err,utilizadores)=>{
        if(err){
            console.log("Erro a obter os dados da BD");
            next(err);
        }else{
            console.log(utilizadores);
            res.status(201).json(utilizadores);
        }
    });
}

///Método para editar 
userController.editUser = function(req,res,next){
    Utilizador.findByIdAndUpdate(req.params.id,req.body,(err,user)=>{
        if(err){return next(err)}

        res.status(201).json(user);
        console.log(user);
    })
}



module.exports = userController;