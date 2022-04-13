var express = require('express');
var Utilizador = require('../models/utilizador');
var Livro = require('../models/livro');



var AuthController = {};

///Método que vai servir para guardar um Cliente
AuthController.RegisterCliente = function(req,res,next){

    const cliente = new Utilizador({
        Nome: req.body.Nome,
        Email : req.body.Email,
        Password : req.body.Password,
        Morada : req.body.Morada,
        Genero : req.body.Genero,
        Role : 'Cliente',
        DataNascimento : req.body.DataNascimento,
        NumAquisicoes : 0,
        QuantidadeVendas : 0,
        ValorTotalVendas: 0,
        CategoriaIdade: null,
        LivrosComprados : new Array[Livro],
        LivrosVendidos : new Array[Livro]
    });

    cliente.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Cliente foi criado com sucesso!!!"
        });
        
        
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })


}

////Método que vai criar um Funcionário
AuthController.RegisterFuncionario = function(req,res,next){

    const cliente = new Utilizador({
        Nome: req.body.Nome,
        Email : req.body.Email,
        Password : req.body.Password,
        Morada : req.body.Morada,
        Genero : req.body.Genero,
        Role : 'Funcionario',
        DataNascimento : req.body.DataNascimento 
    });

    cliente.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Funcionario foi criado com sucesso!!!"
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}


AuthController.GetUtilizador = function(req,res){
    Utilizador.findById(req.params.id,(err,user)=>{
        if(err){
            res.status(400).json(err);
        }else{
            res.status(200).json(user);
        }
    })
}

AuthController.GetAllUsers = function(req,res,next){
    Utilizador.find({}).exec((err,utilizadores)=>{
        if(err){
            console.log("Erro a obter os dados da BD");
            next(err);
        }else{
            console.log(utilizadores);
            res.json(utilizadores);
        }
    });
}



module.exports = AuthController;