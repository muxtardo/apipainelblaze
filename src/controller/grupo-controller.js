'use strict';
require('dotenv').config();
 const Grupo = require('../models/dtb_bots');
 const ValidationContract = require("../validator/fluent-validators");
 const pm2 = require('pm2')
 var shell = require('shelljs');
 const authService = require('../services/auth-services');
 const { Op } = require("sequelize");

 function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
module.exports = {
 
async index(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const  grupos = await Grupo.findAll({where:{usuario_id:usuarioLogado.id}})

        return  res.status(200).send({
            grupos:grupos
        });




    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},

async store(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }
        const {nome,tipo_jogo,bot_token,chat_id} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(tipo_jogo, 'tipo_jogo', 'O tipo_jogo é obrigatorio');
        contract.isRequired(bot_token, 'bot_token', 'O bot_token é obrigatorio');
        contract.isRequired(chat_id, 'chat_id', 'O chat_id é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        const grupo = await Grupo.create({
            usuario_id:usuarioLogado.id,
            nome,
            tipo_jogo,
            bot_token,
            chat_id,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Grupo cadastrado com sucesso",
            data:grupo

        })
     

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},

async show(req,res){
    try{
       const { id } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }
       const grupo = await Grupo.findOne({
        where: {
            [Op.and]: [
              { usuario_id: usuarioLogado.id },
              { id:id }
            ]
          }

       });
       return res.status(201).send({
           grupo:grupo
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async update(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
    const {id} = req.params;
    const {nome,tipo_jogo,bot_token,chat_id} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(tipo_jogo, 'tipo_jogo', 'O tipo_jogo é obrigatorio');
        contract.isRequired(bot_token, 'bot_token', 'O bot_token é obrigatorio');
        contract.isRequired(chat_id, 'chat_id', 'O chat_id é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
   
        const grupoOld = await Grupo.findOne({
            where: {
                [Op.and]: [
                  { usuario_id: usuarioLogado.id },
                  { id:id }
                ]
              }
    
           });
    if(!grupoOld){
        return res.status(201).json({
            msg:'Grupo não existe',
           
        })
    }

   
    const grupo = await grupoOld.update({
        nome,
        tipo_jogo,
        bot_token,
        chat_id,
        
    }); 

    return res.status(201).json({
        msg:"Grupo Atualizado com sucesso",
        data:grupo

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


async mudastatus(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const {id} = req.params;
        const grupo = await Grupo.findOne({
            where: {
                [Op.and]: [
                  { usuario_id: usuarioLogado.id },
                  { id:id }
                ]
              }
    
           });
        if(!grupo){
            return res.status(200).send({
                msg:'Grupo não existe'
            });
        }
        ///Colocar o shell aqui
        if(grupo.status == "A"){
                //     shell.exec(`pm2 stop  '${usuario.email}'`, 
                //     function(code, output) {
                
                //   });
            const grupoAtualizado = grupo.update({
                status:"I"
            })
            return res.status(201).send({
                msg:"Grupo Desligado",
                
            })
        }
        else{
        //     shell.exec(`pm2 start ${process.env.APP_CAMINHO} --name '${usuario.email}' --interpreter=python3.8  -- '${usuario.id}'  --no-autorestart`, 
        //        function(code, output,err) {

        //    });
            const grupoAtualizado = grupo.update({
                status:"A"
            })
            return res.status(201).send({
                msg:"Grupo Ligado",
                
            })
        }
       

       
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},


async ligarbot(req,res){
    try{
       const { id } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }
       const grupo = await Grupo.findOne({
        where: {
            [Op.and]: [
              { usuario_id: usuarioLogado.id },
              { id:id }
            ]
          }

       });
       if(!grupo){
        return res.status(201).json({
            msg:'Grupo não existe',
        })
        }


     if(grupo.status == "I"){

        pm2.connect(function(err) {
            if (err) {
              console.error(err)
              process.exit(2)
            }
            
            pm2.start({
                script    : `${process.env.APP_CAMINHO}`,
                name      : `${grupo.id}`,
                //interpreter:'python3.9'
                }, function(err, apps) {
                   console.log(err);
                })
               
             })
             pm2.disconnect();

             const g = await grupo.update({
                status:"A",
              })
     }else{

        pm2.connect(function(err) {
            if (err) {
             console.error(err)
             process.exit(2)
            }
            
            pm2.stop(`${grupo.id}`, function (err, proc) {
                //console.log(err,proc);
                 pm2.disconnect();
              })

            })

            const g = await grupo.update({
                status:"I",
            })
      
     }

   
    
       const grupoNovo = await Grupo.findOne({
        where: {
            [Op.and]: [
              { usuario_id: usuarioLogado.id },
              { id:id }
            ]
          }

       });
      
       return res.status(201).send({
         msg:(grupoNovo.status == "I" ?"Grupo Desativado":"Grupo Ativado"),
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

   
}

