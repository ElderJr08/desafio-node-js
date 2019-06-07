const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const User = require('../model/user');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 1800, //para 30min
    });
}

router.post('/signup', async (req, res) =>{
    const { nome, senha, email, telefones } = req.body;
    console.log(req.body)
    try {
        if(await User.findOne({ email }))
            return res.status(400).json({ error: 'E-mail já existente' });
        
        User.create({
            nome: nome,
            senha: senha,
            email: email,
            telefones: telefones,
            tokenAuth: generateToken({ id: email })
        }).then(async(user) =>{
            user.senha = undefined;

            res.json({
                user
            });
        }).catch((err) => {
            console.log(err)
            return res.status(400).json({ message: `O campo ${err.message.match(/nome|email|senha/)} é obrigatório. ` });
        })
    } catch (error) {
        return res.status(400).json({ error: 'Não foi possivel registrar o usuário.' });
    }
});

router.post('/signin', (req, res) =>{
    const { email, senha } = req.body;
    try {
        var date = new Date().getTime()-10800000;
        var tokenAuth = generateToken({ id: email })
        User.findOneAndUpdate({ email }, {$set: {ultimo_login: date, tokenAuth: tokenAuth, data_atualizacao: date}}).select('+senha')
        .then(async(user) =>{
            if(!await bcrypt.compare(senha, user.senha))
                return res.status(400).json({ error: 'Senha inválida' });

            user.ultimo_login = date;
            user.tokenAuth = tokenAuth;
            user.data_atualizacao = date;
            user.senha = undefined;

            res.json({ 
                user
            });
        }).catch((err) =>{
            res.status(400).json({ error:  'Usuário e/ou senha inválidos' });
        });
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
});

module.exports = app => app.use('/auth', router);