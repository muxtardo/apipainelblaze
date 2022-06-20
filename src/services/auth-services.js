'use strict';
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.APP_SECRET_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
  
    var data = await jwt.verify(token, process.env.APP_SECRET_KEY);
    return data;
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
   
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
       
        jwt.verify(token, process.env.APP_SECRET_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
                
    } 
        
    
},

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
   
   
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, process.env.APP_SECRET_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                const result = decoded.permissoes.find(atv=>atv.nome == "ADM");
                 
                if (result) {
                    next();
                } else {
                    res.status(200).json({
                        auth:true,
                        message: 'Restrito  e adm'
                    });
                }
            }
        });
    }
};

exports.isParcelamento = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, process.env.APP_SECRET_KEY, function (error, decoded) {
            console.log(decoded);
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                const result = decoded.permissoes.find(atv=>atv.nome == "Parcelamento" || atv.nome == "Parcelamento"  );
               
                if (result) {
                    next();
                } else {
                    res.status(200).json({
                        auth:true,
                        message: 'Você não tem Acesso ao Modulo Parcelamento'
                    });
                }
            }
        });
    }
};

exports.isE_social = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, process.env.APP_SECRET_KEY, function (error, decoded) {
            console.log(decoded);
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                const result = decoded.permissoes.find(atv=>atv.nome == "E_social" || atv.nome == "E_social"  );
               
                if (result) {
                    next();
                } else {
                    res.status(200).json({
                        auth:true,
                        message: 'Você não tem Acesso ao Modulo E_social'
                    });
                }
            }
        });
    }
};