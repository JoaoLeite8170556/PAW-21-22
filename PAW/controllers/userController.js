var Utilizador = require('../models/utilizador');
var Livro = require('../models/livro');
const bcrypt = require("bcryptjs");
const { exists } = require('../models/utilizador');



var userController = {};

///Método que vai servir para guardar um Cliente
userController.RegisterCliente = async function(req,res,next){

      ///Verifica se o Email não existe!!
      var email = req.body.Email;

      const userExit = await Utilizador.findOne({Email : email}).exec();
  
      if(userExit) {
          return res.status(409).json({message:"Este email já existe, introduza outro!!"});
      }

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
userController.RegisterFuncionario = async function(req,res,next){

    var hashedPassword = bcrypt.hashSync(req.body.Password,8);

    var email = req.body.Email;

      const userExit = await Utilizador.findOne({Email : email}).exec();
  
      if(userExit) {
          return res.status(409).json({message:"Este email já existe, introduza outro!!"});
      }
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
            res.status(400).json({message : "Utilizador não encontrado!!!"});
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

        res.status(200).json(user);
        console.log(user);
    })
}

////Método para atualizar a password
userController.EditPassword = async function(req,res){


    ///Verificamos se a password não coencidem
    if(req.body.Password != req.body.Password2){
       res.status(404).json({message : "As password não coêncidem!!!"});
    }

    ///Verifica se o Email não existe!!
    var email = req.body.Email;

    const userExit = await Utilizador.findOne({Email : email}).exec();

    if(!userExit) {
        return res.status(409).json({message:"Este email não existe!!"});
    }


    ////Encriptamos a password
    var hashedPassword = bcrypt.hashSync(req.body.Password,8);


    ///Local onde vamos atualizar a password
     Utilizador.findByIdAndUpdate({_id : req.params._id}, 
        {Password : hashedPassword}, 
        function(err,result){
            if(err){
                res.status(404).json({message: "Utilizador não encontrado!!!!"}); 
            }
            res.status(200).json({message:result});
     });

   
    
}



module.exports = userController;