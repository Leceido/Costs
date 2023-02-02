const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Projeto = new Schema({
    nome: {
        type: String,
        required: true
    },
    orcamento: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categorias',
        required: true
    }
})

mongoose.model('projetos', Projeto)