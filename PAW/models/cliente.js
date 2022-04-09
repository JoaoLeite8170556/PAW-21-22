const mongoose = require('mongoose');
import { Utilizador } from '../models/utilizador'
import { Livro } from '../models/livro'
var Schema = mongoose.Schema;
const extendSchema = require('mongoose-extend-schema');


const CategoriaIdade = {
    INFANTIL : 'Infantil',
    JUVENIL : 'Juvenil',
    ADULTO : 'Adulto',
    SENIOR : 'Senior'
}


var ClienteSchema = extendSchema(Utilizador,{
    NumAquisicoes : {type : Number},
    QuantidadeVendas : {type : Number},
    ValorTotalVendas : {type : Number},
    CategoriaIdade : {type : CategoriaIdade},
    LivrosComprados : { type : Array[Livro]},
    LivrosVendidos : {type : Array[Livro]}
});


module.exports = mongoose.model('Cliente',ClienteSchema);
