const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const rotaCategorias = require('./routes/categorias')
const rotaProjetos = require('./routes/projetos')

const mongoose = require('mongoose')
require('./models/Categoria')
const Categoria = mongoose.model('categorias')
require('./models/Projeto')
const Projeto = mongoose.model('projetos')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }

    next()
})*/

mongoose.set('strictQuery', false)
mongoose.Promise = global.Promise
mongoose.connect("mongodb://127.0.0.1/costs").then(() => {
    console.log("Conectado ao mongoDB");
}).catch((err) => {
    console.log("Erro ao tentar se conectar com o mongoDB" + err);
})

app.use('/categorias', rotaCategorias)
app.use('/projetos', rotaProjetos)

app.use((req, res, next) => {
    const erro = new Error('Nao encontrado')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app