var Utilizador = require("../models/utilizador");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../jwt_secret/config");


var userController = {};

////Método que converte um string para Date
function covertStringToDate(dateString) {
  //dateString should be in ISO format: "yyyy-mm-dd", "yyyy-mm" or "yyyy"
  if (new Date(dateString).toString() === "Invalid Date") {
    return false;
  } else {
    const onlyNumbers = dateString.replace(/\D/g, "");
    const year = onlyNumbers.slice(0, 4);
    const month = onlyNumbers.slice(4, 6);
    const day = onlyNumbers.slice(6, 8);
    if (!month) {
      return new Date(year);
    } else if (!day) {
      return new Date(year, month - 1);
    } else {
      return new Date(year, month - 1, day);
    }
  }
}

userController.editUser = (req, res) =>{
  Utilizador.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(400).json({ message: "Utilizador não encontrado!!!" });
    } else {
      return res.status(200).json({
        user
      })
    }
  })
}

////Metodo que vai calcular a idade de um cliente;
function getAge(dateString) {
  var ageInMilliseconds = new Date() - new Date(dateString);
  return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
}



///Metodo que permite realizar o login;
userController.login = async (req, res) => {

  let user = await Utilizador.findOne({Email: req.body.Email});

  ////Utilizador não existe na Base de Dados
  if (!user) {
    return res.json({message:"Este utilizador na existe"})
  }
  
  var passwordValid = await bcrypt.compare(req.body.Password, user.Password)

  if(!passwordValid){
    return res.json({message:"Esta password não corresponde a sua password;"});
  }

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

 return res.status(200).json({auth:true,token:token,role:user.Role,_id:user._id,Email:user.Email});
};


///Método que vai servir para guardar um Cliente
userController.RegisterCliente = async function (req, res, next) {
  var dataNascimento = req.body.DataNascimento;

  var dateParse = covertStringToDate(dataNascimento);

  var idade = getAge(dateParse);

  //Verifica conforme a idade a sua categoria;
  var categoriaIdade = "";

  if (idade > 0 && idade <= 12) {
    categoriaIdade = "Infantil";
  } else if (idade > 12 && idade <= 18) {
    categoriaIdade = "Adolescente";
  } else if (idade > 18 && idade <= 60) {
    categoriaIdade = "Adulto";
  } else {
    categoriaIdade = "Senior";
  }

  ///Verifica se o Email não existe!!
  var email = req.body.Email;

  const userExit = await Utilizador.findOne({ Email: email }).exec();

  if (userExit) {
    return res
      .status(409)
      .json({ message: "Este email já existe, introduza outro!!" });
  }

  var hashedPassword = bcrypt.hashSync(req.body.Password, 8);

  const user = new Utilizador({
    Nome: req.body.Nome,
    Email: req.body.Email,
    Password: hashedPassword,
    Morada: req.body.Morada,
    Genero: req.body.Genero,
    DataNascimento: req.body.DataNascimento,
    Role: "Cliente",
    Idade: idade,
    CategoriaIdade: categoriaIdade
  });

  user.save(function (err, cliente) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({cliente});
  });
};

//// Método que vai criar um Funcionário
userController.RegisterFuncionario = async function (req, res, next) {

  var dataNascimento = req.body.DataNascimento;

  var dateParse = covertStringToDate(dataNascimento);

  var idade = getAge(dateParse);

  //Verifica conforme a idade a sua categoria;
  var categoriaIdade = "";

  if (idade > 0 && idade <= 12) {
    categoriaIdade = "Infantil";
  } else if (idade > 12 && idade <= 18) {
    categoriaIdade = "Adolescente";
  } else if (idade > 18 && idade <= 60) {
    categoriaIdade = "Adulto";
  } else {
    categoriaIdade = "Senior";
  }
  
  var hashedPassword = bcrypt.hashSync(req.body.Password, 8);

  var email = req.body.Email;

  const userExit = await Utilizador.findOne({ Email: email }).exec();

  if (userExit) {
    return res
      .status(409)
      .json({ message: "Este email já existe, introduza outro!!" });
  }
  const user = new Utilizador({
    Nome: req.body.Nome,
    Email: req.body.Email,
    Password: hashedPassword,
    Morada: req.body.Morada,
    Genero: req.body.Genero,
    DataNascimento: req.body.DataNascimento,
    Role: "Funcionario",
    Idade: idade,
    CategoriaIdade: categoriaIdade,
  });

  user.save(function (err, Funcionario) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({Funcionario});
  });
};

///Método que retorna o Utilizador
userController.GetUtilizador = function (req, res) {
  Utilizador.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Utilizador não encontrado!!!" });
    } else {
      return res.status(200).json({user});
    }
  });
};


///Metodo para ver as avaliações a livros por parte de um cliente
userController.GetAvaliacoesUtilizadorALivros = async function(req,res){
  let utilizador = await Utilizador.findOne({_id: req.params.id});

 if(!utilizador){
   return res.json({message:"Este utilizador não existe!!"});
 } 

 let array = utilizador.LivrosAvaliados;

 return res.json({array});

};


///Método que elimina o Utilizador
userController.DeleteUser = function (req, res) {
  Utilizador.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.status(400).json({ message: "Utilizador não encontrado!!!" });
    } else {
      return res.json({message:"Utilizador eliminado com sucesso!!"});
    }
  });
};

///Método que retorna todos os Utilizadores
userController.list = function (req, res, next) {
  Utilizador.find({}).exec((err, users) => {
    if (err) {
      next(err);
    } else {
      return res.status(200).json({users});
    }
  });
};


////Método para atualizar a password
userController.EditPassword = async function (req, res) {
  ///Verificamos se a password não coencidem
  if (req.body.Password != req.body.Password2) {
    return res.status(404).json({ message: "As passwords não coêncidem!!!" });
  }

  ///Verifica se o Email não existe!!
  var email = req.body.Email;

  const user = await Utilizador.findOne({ Email: email }).exec();

  if (!user) {
    return res.status(409).json({ message: "Este email não existe!!" });
  }

  ////Encriptamos a password
  var hashedPassword = bcrypt.hashSync(req.body.Password, 8);

  ///Local onde vamos atualizar a password
  Utilizador.findByIdAndUpdate(
    { _id: req.params.id },
    { Password: hashedPassword },
    function (err) {
      if (err) {
        return res.status(404).json({ message: "Utilizador não encontrado!!!!" });
      }
      return res.status(200);
    }
  );
};

/// Verifica se tem token
userController.verifyToken = function (req, res, next) {

  if(!token){
    return res.json({message:"Este utilizador não tem token"});
  }

  Utilizador.findOne({_id:id},function(err,user){
    if(err){
      return res.json({err});
    }else if(user.Role == "Cliente" || user.Role == "Funcionario" || user.Role =="Administrador"){
      return next();
    }else{
      return res.status(200);
    }
  })

    
};

/// Verifica se ele funcionario
userController.verifyFuncionario = function (req, res, next) {
  var token = req.headers["x-access-token"];

  if(!token){
    return res.json({message:"O utilizador não possui token"});
  }

  Utilizador.findOne({_id:id},function(err,user){
    if(err){
      return res.json({message:"Este utilizador não existe!!"});
    }else if(user.Role == "Funcionario"){
      return next();
    }
  })

}

/// Verificar se é administrador
userController.verifyAdmin = function (req, res, next) {
  var token = req.headers["x-access-token"];

  if(!token){
    return res.json({message:"Este utilizador não possui token"});
  }

  Utilizador.findOne({_id:id},function(err,user){
    if(err){
      return res.json({err});
    }else if(user.Role =="Administrador"){
      return next();
    }
  })
};

// Verifica se é Cliente
userController.verifyCliente = function (req, res, next) {

  var token = req.headers["x-access-token"];

  if(!token){
    return res.json({message:"Este utilizador não existe!!"});
  }
  Utilizador.findOne({_id:id},function(err,user){
    if(err){
      return res.json({err});
    }else if(user.Role == "Cliente"){
      return next();
    }
  })
};
module.exports = userController;
