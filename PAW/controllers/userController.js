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

userController.addClient = (req, res) =>{
  res.render('user/createClient');
}

userController.addEmployee = (req, res) =>{
  res.render('user/createEmployee');
}

userController.editUser = (req, res) =>{
  Utilizador.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(400).json({ message: "Utilizador não encontrado!!!" });
    } else {
      res.render("user/update", { user: user });
    }
  })
}

////Metodo que vai calcular a idade de um cliente;
function getAge(dateString) {
  var ageInMilliseconds = new Date() - new Date(dateString);
  return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
}

userController.login = async (req, res) => {

  let user = await Utilizador.findOne({Email: req.body.Email});

  ////Utilizador não existe na Base de Dados
  if (!user) {
    return res.redirect("/");
  }
  
  var passwordValid = await bcrypt.compare(req.body.Password, user.Password)

  if(!passwordValid){
    return res.redirect("/");
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

  var utilizador = {
    _id : user._id,
    Nome : user.Nome,
    Email : user.Email,
    Role : user.Role,
    CategoriaIdade: user.CategoriaIdade
  };

  res.cookie("token",token);
  res.cookie("user",utilizador);
  

  return res.redirect('/books/list');
};

/// Metodo para fazer logout 
userController.logOut = function(req,res){
  res.clearCookie("user");
  res.clearCookie("token");

  return res.redirect("/");
}

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
    res.redirect('/users/list');
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
    res.redirect('/users/list');
  });
};

///Método que retorna o Utilizador
userController.GetUtilizador = function (req, res) {
  Utilizador.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Utilizador não encontrado!!!" });
    } else {
      return res.json({user});
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

//Métodon que retorna profile de user
userController.getLoggedUser = function (req, res) {
  var id = req.cookies["user"]._id;

  Utilizador.findById(id, (err, user) => {
    if (err) {
      res.status(400).json({ message: "Utilizador não encontrado!!!" });
    } else {
      res.render("user/details", { user: user });
    }
  });
};

///Método que elimina o Utilizador
userController.DeleteUser = function (req, res) {
  Utilizador.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(400).json({ message: "Utilizador não encontrado!!!" });
    } else {
      res.redirect('/users/list');
    }
  });
};

///Método que retorna todos os Utilizadores
userController.list = function (req, res, next) {
  Utilizador.find({}).exec((err, users) => {
    if (err) {
      console.log("Erro a obter os dados da BD");
      next(err);
    } else {
      //res.status(201).json(utilizadores);
      res.render("user/list", { users: users });
    }
  });
};

///Método para editar
userController.Update = function (req, res, next) {
  Utilizador.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false}, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/users/list');
  });
};

//Método para renderizar página de mudar password
userController.changePassword = (req, res) =>{
  Utilizador.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(400).json({ message: "Utilizador não encontrado!!!" });
    } else {
      res.render("user/changePassword", { user: user });
    }
  })
}

////Método para atualizar a password
userController.EditPassword = async function (req, res) {
  ///Verificamos se a password não coencidem
  if (req.body.Password != req.body.Password2) {
    res.status(404).json({ message: "As passwords não coêncidem!!!" });
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
        res.status(404).json({ message: "Utilizador não encontrado!!!!" });
      }
      res.redirect("/users/show/"+ user._id);
    }
  );
};

/// Verifica se tem token
userController.verifyToken = function (req, res, next) {
  var token = req.cookies["token"];
  var id = req.cookies["user"]._id;

  if(!token){
    return res.redirect("/");
  }

  Utilizador.findOne({_id:id},function(err,user){
    if(err){
      console.log("Erro a encontrar a informação");
      return res.redirect('back');
    }else if(user.Role == "Cliente" || user.Role == "Funcionario" || user.Role =="Administrador"){
      return next();
    }else{
      console.log("Não tem permissões para aceder aqui!");
      return res.redirect('back');
    }
  })

    
};

/// Verifica se ele funcionario
userController.verifyFuncionario = function (req, res, next) {
  var token = req.cookies["token"];
  var id = req.cookies["user"]._id;

  if(!token){
    return res.redirect("/");
  }

  Utilizador.findOne({_id:id},function(err,user){
    if(err){
      console.log("Erro a encontrar a informação");
      return res.redirect('back');
    }else if(user.Role == "Funcionario"){
      return next();
    }else{
      console.log("Não tem permissões para aceder aqui!");
      return res.redirect('back');
    }
  })

}

/// Verificar se é administrador
userController.verifyAdmin = function (req, res, next) {
  var token = req.cookies["token"];
  var id = req.cookies["user"]._id;

  if(!token){
    return res.redirect("/");
  }

  Utilizador.findOne({_id:id},function(err,user){
    if(err){
      console.log("Erro a encontrar a informação");
      return res.redirect('back');
    }else if(user.Role =="Administrador"){
      return next();
    }else{
      console.log("Não tem permissões para aceder aqui!");
      return res.redirect('back');
    }
  })

};

// Verifica se é Cliente
userController.verifyCliente = function (req, res, next) {

  var token = req.cookies["token"];
  var id = req.cookies["user"]._id;

  console.log(token);


  if(!token){
    return res.redirect('/');
  }


  Utilizador.findOne({_id:id},function(err,user){
    if(err){
      console.log("Erro a encontrar a informação");
      return res.redirect('back');
    }else if(user.Role == "Cliente"){
      return next();
    }else{
      console.log("Não tem permissões para aceder aqui!");
      res.redirect('back');
    }
  })

    
};


module.exports = userController;
