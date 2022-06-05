
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LivroSchema = new Schema({
    ISBN :{type : String,required:true},
    Titulo : {type: String,required:true},
    Autores : {type:String},
    AnoPublicacao : {type: Number,required:true},
    Preco :{type : Number,required:true},
    Editora : {type : String,required:true},
    Estado : {
        type : String,
        enum : ['Novo','Usado'],
        default: "Novo"
    },
    Stock : {
        type : Number,
        default : 1
    },
    LivroAprovado :{
        type: Boolean,
        default : false
    },
    IDVendedor : {
        type: String,
        default : ""
    },
    Avaliacao :{
        type: Number,
        default:0,
        max:5
    }
});

module.exports = mongoose.model('Livro',LivroSchema);
