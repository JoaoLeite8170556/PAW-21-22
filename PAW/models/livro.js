const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Estado = {
    ESTADO  : 'Usado',
    NOVO : 'Novo'
}

var LivroSchema = new Schema({
    Imagem : {type : String},
    ISBN :{type : String},
    Titulo : {type: String},
    Autores : Array[String],
    AnoPublicacao : {type: Date},
    Preco :{type : Number},
    Editora : {type : String},
    Estado : {type : Estado},
    Stock : {
        type : Number,
        default : 1
    }
});

module.exports = mongoose.model('Livro',LivroSchema);
