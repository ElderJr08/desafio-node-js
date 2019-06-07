const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: 'Nenhum token foi passado.' });
    
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Não autorizado'});

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Formato inválido de token.' });


    jwt.verify(token, authConfig.secret, (err, decoded)=>{
        if(err) {
            if(err.name === 'TokenExpiredError'){
                return res.status(401).send({ error: 'Sessão expirada.' });
            }else {
                return res.status(401).send({ error: 'Token inválido.' });
            }
        }
        req.userId = decoded.id;

        return next();

    });

};