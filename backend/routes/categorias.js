const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Projeto')
const Projeto = mongoose.model('projetos')

router.get('/', async (req,res, next) => {
    try {
        const categorias = await Categoria.find()
        res.status(200).send({categorias})
    } catch (err) {
        res.status(500).send({error: err})
    }
})

router.post('/', (req, res, next) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => {
        const response = {
            mensagem: "Categoria criada",
            categoria: novaCategoria,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todas as categorias',
                url: 'http://localhost:5000/categorias/'
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