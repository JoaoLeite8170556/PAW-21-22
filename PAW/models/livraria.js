const mongoose = require('mongoose');
var Schema = mongoose.Schema;



var LivrariaSchema = new Schema({
    Infantil : {
        type: Number,
        default: 10
    },
    Adolescente: {
        type:Number,
        default:15
    },
    Adulto : {
        type : Number,
        default: 20
    },
    Senior : {
        type:Number,
        default: 25
    },
    DescontoPorNumAquisicoes : {
        type: Number,
        default: 0.03
    },
    DescontoPorQuantidadeVendidos: {
        type:Number,
        default: 0.02
    }
});

module.exports = mongoose.model('Livraria',LivrariaSchema);
