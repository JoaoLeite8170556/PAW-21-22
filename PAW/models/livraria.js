const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LivrariaSchema = new Schema({
    nome : {type : String},
    Morada : {type : String},
    Livros : [{ type: mongoose.Schema.Types.ObjectId, ref: "Livro"}]
});

module.exports = mongoose.Schema('Livraria',LivrariaSchema)