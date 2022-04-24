const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var utilizadorSchema = new Schema({
  Nome: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  Morada: { type: String },
  Genero: {
    type: String,
    enum: ["Masculino", "Feminino"],
  },
  Role: {
    type: String,
    enum: ["Administrador", "Funcionario", "Cliente"],
  },
  DataNascimento: { type: String},
  Idade: { type: Number, default:0},
  NumAquisicoes: { type: Number, default:0},
  QuantidadeVendas: { type: Number ,default:0},
  ValorTotalVendas: { type: Number ,default:0},
  CategoriaIdade: {
    type: String,
    enum: ["Infantil", "Adolescente", "Adulto", "Senior"],
  },
  LivrosComprados: [],
  LivrosVendidos: [],
});

module.exports = mongoose.model("Utilizador", utilizadorSchema);
