var Utilizador = require('../models/utilizador');
var Livro = require('../models/livro');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../jwt_secret/config');





var userController = {};

////Método que converte um string para Date
function covertStringToDate(dateString) {
  //dateString should be in ISO format: "yyyy-mm-dd", "yyyy-mm" or "yyyy"
  if(new Date(dateString).toString() === "Invalid Date") {
      return false
  } else {
      const onlyNumbers = dateString.replace(/\D/g, ""); 
      const year = onlyNumbers.slice(0,4) 
      const month = onlyNumbers.slice(4,6)
      const day = onlyNumbers.slice(6,8)
      if(!month){
          return(new Date(year))
      } else if (!day) {
          return(new Date(year, month - 1))
      } else {
          return(new Date(year, month - 1, day))
      }        
  }
}


////Metodo que vai calcular a idade de um cliente;
function getAge(dateString) {
  var ageInMilliseconds = new Date() - new Date(dateString);
  return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
}


userController.login = async (req, res) => {
    
    let user = await Utilizador.findOne({ Email: req.body.Email });
  
    ////Utilizador não existe na Base de Dados
    if (!user) {
      return res.status(400).json({ message: "Este utilizador não existe!!!"});
    }
  
    try {
      if (await bcrypt.compare(req.body.Password, user.Password)) {
  
        const token = jwt.sign(
          {
            Nome: user.Nome,
            Email: user.Email,
            Role: user.Role,
            id: user._id
          },
         config.secret,
          {
            expiresIn: 86400
          }
        );
        res.json({ message: "Login realizado com sucesso!!!", token: token });

      } else {
        res.send("Password incorreta");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };

///Método que vai servir para guardar um Cliente
userController.RegisterCliente = async function(req,res,next){


    var dataNascimento = req.body.DataNascimento;

    var dateParse = covertStringToDate(dataNascimento);

    var idade = getAge(dateParse);



    //Verifica conforme a idade a sua categoria;
    var categoriaIdade = "";


    if(idade > 0 && idade <= 12){
      categoriaIdade = "Infantil";
    }else if(idade > 12 && idade <= 18){
      categoriaIdade = "Adolescente";
    }else if(idade > 18 && idade <= 60){
      categoriaIdade = "Adulto";
    }else{
      categoriaIdade = "Senior";
    }

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
        Role: "Cliente",
        Idade : idade,
        CategoriaIdade : categoriaIdade
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
            //res.status(200).json(user);
            res.render("user/userDetails", { user: user });
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
            //res.status(201).json(utilizadores);
            res.render("user/userList", { users: utilizadores });
        }
    });
}

///Método para editar 
userController.editUser = function(req,res,next){
    Utilizador.findByIdAndUpdate(req.params.id,req.body,(err,user)=>{
        if(err){return next(err)}

        res.status(200).json(user);
        //console.log(user);
        res.render("user/userEdit", { users: utilizadores });
    })
}

////Método para atualizar a password
userController.EditPassword = async function(req,res){


    ///Verificamos se a password não coencidem
    if(req.body.Password != req.body.Password2){
       res.status(404).json({message : "As passwords não coêncidem!!!"});
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