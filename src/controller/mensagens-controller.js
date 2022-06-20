'use strict';

 const Grupo = require('../models/dtb_bots');
 const MsgDouble = require('../models/dtb_mensagem_double');
 const MsgCrash = require('../models/dtb_mensagem_crash');
 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 const { Op } = require("sequelize");
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

async showdouble(req,res){
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


    const msgdouble = await MsgDouble.findOne({
        where: {bot_id:id},
        order: [ [ 'id', 'DESC' ]],
        });

       return res.status(201).send({
           mensagemdouble:msgdouble
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async showcrash(req,res){
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


    const msgcrash = await MsgCrash.findOne({
        where: {bot_id:id},
        order: [ [ 'id', 'DESC' ]],
        });

       return res.status(201).send({
        mensagemcrash:msgcrash
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async updatedouble(req,res){
         
    try{
        //id do bottt
        const {id} = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
      

     


 
  
    const {atencao,red,black,win,loss} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(atencao, 'atencao', 'A atencao é obrigatorio');
        contract.isRequired(red, 'red', 'O red é obrigatorio');
        contract.isRequired(black, 'black', 'O black é obrigatorio');
        contract.isRequired(win, 'win', 'O win é obrigatorio');
        contract.isRequired(loss, 'loss', 'O loss é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        
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


        const msgOld = await MsgDouble.findOne({
            where: {bot_id:id},
            order: [ [ 'id', 'DESC' ]],
            });
 
    if(!msgOld){
        const msgdouble = await MsgDouble.create({
            bot_id: id,
            atencao,
            red,
            black,
            win,
            loss,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Mensagem cadastrado com sucesso",
            data:msgdouble

        })
     
    }

   
    const msgDoubleRes = await msgOld.update({
            atencao,
            red,
            black,
            win,
            loss,
        
    }); 

    return res.status(201).json({
        msg:"Mensagem Atualizado com sucesso",
        data:msgDoubleRes

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


async updatecrash(req,res){
         
    try{
        //id do bottt
        const {id} = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
      

     


 
  
    const {atencao,confirmacao,win,loss} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(atencao, 'atencao', 'A atencao é obrigatorio');
        contract.isRequired(confirmacao, 'confirmacao', 'O confirmacao é obrigatorio');
        contract.isRequired(win, 'win', 'O win é obrigatorio');
        contract.isRequired(loss, 'loss', 'O loss é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        
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


        const msgOld = await MsgCrash.findOne({
            where: {bot_id:id},
            order: [ [ 'id', 'DESC' ]],
            });
 
    if(!msgOld){
        const msgCrash = await MsgCrash.create({
            bot_id: id,
            atencao,
            confirmacao,
            win,
            loss,
        }); 
      
        return res.status(201).json({
            resolucao:true,
            msg:"Mensagem cadastrado com sucesso",
            data:msgCrash

        })
     
    }

   
    const msgCrash = await msgOld.update({
        atencao,
        confirmacao,
        win,
        loss,
        
    }); 

    return res.status(201).json({
        msg:"Mensagem Atualizado com sucesso",
        data:msgCrash

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
   
}

