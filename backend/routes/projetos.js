const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Projeto')
const Projeto = mongoose.model('projetos')

router.get('/', async (req,res, next) => {
    try {
        const projetos = await Projeto.find()
        res.status(200).send({projetos})
    } catch (err) {
        res.status(500).send({error: err})
    }
})

router.post('/', (req, res, next) => {
    const novoProjeto = {
        nome: req.body.name,
        categoria: req.body.category,
        orcamento: req.body.budget
    }

    new Projeto(novoProjeto).save().then(() => {
        const response = {
            mensagem: "Projeto criado",
            projeto: novoProjeto,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todos os Projetos',
                url: 'http://localhost:5000/projetos/'
            }
        }
        res.status(201).send({response})
    }).catch((err) => {
        res.status(500).send({
            error: err
        })
    })
})

module.exports = router