const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../model/user');

const router = express.Router();

router.use(authMiddleware);

router.get('/:id', (req, res)=>{
    const { id } = req.params;
    const { authorization } = req.headers;
    const [scheme, tokenAuth] = authorization.split(' ');

    User.findOne({ _id: id }, async(err, user) =>{
        if(!user) return res.status(400).json({error: 'Usuário inexistente.'});
        
        if(tokenAuth !== user.tokenAuth) return res.status(401).json({ error: 'Token não correspondente.' });

        res.json(user);
    })   
});

module.exports = app => app.use('/user', router);