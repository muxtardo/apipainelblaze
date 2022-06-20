'use strict';
 const Permissao = require('../models/Permissoes');
 const Usuario = require('../models/usuarios');
 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 const md5 = require('md5');
module.exports = {
 

async index(req,res){
    try{
        const permissoes = await Permissao.findAll();
        return res.status(201).send({
            permissoes:permissoes
        })
    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},


async linkPermissao(req,res){
    try{
        const{id,userid} = req.params;
        const permissao = await Permissao.findByPk(id);
        if(!permissao){
            return res.status(200).send({
                msg:'Permissao não existe'
            })
        }
        const usuario = await Usuario.findByPk(userid,{include:{association:"permissoes"}});
        const result = usuario.permissoes.find(atv => atv.id == id.toString());

        if(result){
         
            usuario.removePermissoes(permissao);
        }
        else{
            usuario.addPermissoes(permissao);
        }
        return res.status(201).json({
            msg:'Atualizado com sucesso',
            data:result,
        })

    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
}


}

