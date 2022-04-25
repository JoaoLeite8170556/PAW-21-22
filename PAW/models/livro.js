const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LivroSchema = new Schema({
    Imagem : {type : String},
    ISBN :{type : String},
    Titulo : {type: String},
    Autores : [{
        type: String
    }],
    AnoPublicacao : {type: String},
    Preco :{type : Number},
    Editora : {type : String},
    Estado : {
        type : String,
        enum : ['Novo','Usado'],
        default: "Novo"
    },
    Stock : {
        type : Number,
        default : 1
    }
});

module.exports = mongoose.model('Livro',LivroSchema);
