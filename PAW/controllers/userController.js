var express = require('express');
var Utilizador = require('../models/utilizador');
var Livro = require('../models/livro');
const { log } = require('debug/src/node');


var AuthController = {};

AuthController.RegisterCliente = function(req,res,next){
   if(err){
       return res.status(500).json({
           error: err
       });
   }else{
       const utilizador = new Utilizador({
           Nome: req.body.Nome,
           Email : req.body.Email,
           Password : req.body.Password,
           Morada : req.body.Morada,
           Genero : req.body.Genero,
           Role : 'Cliente',
           DataNascimento : req.body.DataNascimento,
           NumAquisicoes : 0,
           QuantidadeVendas : 0,
           ValorTotalVendas: 0
       });

       utilizador.save()
       .then(result => {
           console.log(201).json({
               message : 'Cliente Criado Com Sucesso'
           });
       })
       .catch(err =>{
           console.log(err);
           res.status(500).json({
               error : err
           });
       });
   }
}



module.exports = AuthController;