const mongoose = require('mongoose');
import { Livro } from '../models/livro'
var Schema = mongoose.Schema;

var LivrariaSchema = new Schema({
    nome : {type : String},
    Morada : {type : String},
    Livros : {type : Array[Livro]}
});

module.exports = mongoose.Schema('Livraria',LivrariaSchema)