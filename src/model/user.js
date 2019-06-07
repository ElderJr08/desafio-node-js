const mongoose = require('../database');
const bcrypt = require('bcrypt');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    telefones:{
        type: Array,
        required: true,
        ddd:{
            type: String,
            required: true
        },
        numero:{
            type: String,
            required: true
        }
    },
    tokenAuth:{
        type: String,
        required: true
    },
    ultimo_login:{
        type: Date,
        default: Date.now
    },
    data_criacao: {
        type: Date,
        default: Date.now
    },
    data_atualizacao:{
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    const date = new Date().getTime()-10800000;
    this.senha = hash;
    this.ultimo_login = date;
    this.data_criacao = date;
    this.data_atualizacao = date;
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;