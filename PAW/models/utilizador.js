const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Genero = {
    MASCULINO : 'Masculino',
    FEMININO : 'Feminino'
}

const Role = {
    Admin : 'Administrador',
    Func : 'Funcionário',
    Cli : 'Cliente'
}

var utilizadorSchema = new Schema({
    nome : {type : String, required : true},
    email : {type : String,required : true},
    password : {type: String,required : true},
    Morada : {type : String},
    Genero : {type : Genero},
    Role : {type : Role.Admin},
    DataNascimento : {type : Date},
    Idade : {type : Number}
});

module.exports = mongoose.model('Utilizador',utilizadorSchema);