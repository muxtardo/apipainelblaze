'use strict';
require('dotenv').config();
 const Grupo = require('../models/dtb_bots');
 const EstrategiaDouble = require('../models/dtb_estrategia_double');
 const EstrategiaCrash = require('../models/dtb_estrategia_crash');
 const EstrategiaRoleta = require('../models/dtb_estrategia_bet365');

 const MsgDouble = require('../models/dtb_mensagem_double');
 const MsgCrash = require('../models/dtb_mensagem_crash');
 const MsgRoleta = require('../models/dtb_mensagem_bet365');

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
           var grupos = new Grupo();
           if(usuarioLogado.permissoes.length > 0){
              grupos = await Grupo.findAll()
           }else{
            grupos = await Grupo.findAll({where:{usuario_id:usuarioLogado.id}})
           }
          

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
        const {nome,tipo_jogo,bot_token,chat_id,usuario_id} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(tipo_jogo, 'tipo_jogo', 'O tipo_jogo é obrigatorio');
        contract.isRequired(bot_token, 'bot_token', 'O bot_token é obrigatorio');
        contract.isRequired(chat_id, 'chat_id', 'O chat_id é obrigatorio');
        contract.isRequired(usuario_id, 'usuario_id', 'O usuario é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        const grupo = await Grupo.create({
            nome,
            tipo_jogo,
            bot_token,
            chat_id,
            usuario_id,
        }); 

     
      if(grupo.tipo_jogo == "Blaze-Double" || grupo.tipo_jogo == "Smashup-Double"){

        //Estrategias doubles
             await EstrategiaDouble.create({
                bot_id:grupo.id,
                nome:'Sequencia 5 preto',
                sequencia:'2,2,2,2,2,2',
                apostar_em:'1',
                martingale:'2',
            }); 

            await EstrategiaDouble.create({
                bot_id:grupo.id,
                nome:'Sequencia 5 vermelho',
                sequencia:'1,1,1,1,1,1',
                apostar_em:'2',
                martingale:'2',
            }); 


            await EstrategiaDouble.create({
                bot_id:grupo.id,
                nome:'Alternancia 5 preto',
                sequencia:'1,2,1,2,1',
                apostar_em:'2',
                martingale:'2',
            }); 

            await EstrategiaDouble.create({
                bot_id:grupo.id,
                nome:'Alternancia 5 vermelho',
                sequencia:'2,1,2,1,2',
                apostar_em:'1',
                martingale:'2',
            }); 
            
            await EstrategiaDouble.create({
                bot_id:grupo.id,
                nome:'Dois em dois preto',
                sequencia:'2,2,1,1,2',
                apostar_em:'2',
                martingale:'2',
            });
            
            
            await EstrategiaDouble.create({
                bot_id:grupo.id,
                nome:'Dois em dois vermelho',
                sequencia:'1,1,2,2,1',
                apostar_em:'1',
                martingale:'2',
            }); 

        //Mensagem double
           await MsgDouble.create({
                bot_id: grupo.id,
                atencao:'⚠️ ATENÇÃO, possível entrada \n⌚️ Aguarde a confirmação \n🎰 Blaze: <a href="https://blaze.com/pt/games/double">Double</a>',
                
                red:'🔔 Entrada Confirmada 🔔\n📍Entrar Após [ULTIMO_NUMERO] [ULTIMA_COR] \n🎰  Blaze: <a href="https://blaze.com/pt/games/double">Double</a>\n⚪️ Cobrir o BRANCO\n💰 Apostar: 🟥',

                black:'🔔 Entrada Confirmada 🔔 \n📍Entrar Após [ULTIMO_NUMERO] [ULTIMA_COR] \n🎰 Blaze: <a href="https://blaze.com/pt/games/double">Double</a> \n\⚪️ Cobrir o BRANCO \n💰 Apostar: ⬛️',
                
                win:'✅✅✅GREEN - BATEU META? VAZA \n[COR_SEQUENCIA]  \n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
                
                loss:'⛔ RED - SEGUE GERENCIAMENTO \n[COR_SEQUENCIA] \n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',

                martingale:'🔁 [NUMERO]º Martingale!',

                branco:'🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🤑🤑🤑🤑🤑Green no Branco🤑🤑🤑🤑🤑\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
                parcial:'🚀Resultado parcial \n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
                final:'🚀Resultado Final \n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
               
           }); 

            

    
      }else if(grupo.tipo_jogo == "Bet365-Roleta"){
      
       let rouletes_name=[
			"Super Spin Roulette",
			"bet365 Roulette",
			"bet365 Dutch Roulette",
			"Who Wants To Be a Millionaire Roulette",
			"Mega Fire Blaze Roulette Live",
			"Quantum Roulette Live",
			"Roulette",
			"Age Of The Gods Bonus Roulette",
			"Football Roulette",
			"Hindi Roulette",
			"Speed Roulette",
			"Greek Roulette",
			"Turkish Roulette",
			"Roleta Brasileira",
			"Quantum Auto Roulette",
			"Speed Auto Roulette",
			"Prestige Roulette",
			"American Roulette",
			"Spread Bet Roulette",
			"Deutsches Roulette",
			"Auto Roulette",
			"Greek Quantum Roulette",
			"UK Roulette",
			"Quantum Roulette Italiana",
			"Triumph Roulette",
			"Roulette Italiana",
		]

        rouletes_name.forEach( async (res) =>{

            await EstrategiaRoleta.create({
                bot_id:grupo.id,
                nome_roleta:res,
                sequencia_cor:11,
                sequencia_maior_menor:11,
                sequencia_par_impar:11,
                sequencia_duzias:8,
                sequencia_colunas:8,
                martingale:2,
                status:1,
            }); 

        })

        const msgRoleta = await MsgRoleta.create({
            bot_id: grupo.id,
            atencao:"⚠️ ANALISANDO A MESA ⚠️\n🎰 Roleta: [NOME_ROLETA]\n🎲 Estratégia: [REPETICAO]",

            confirmacao:"🔔 APOSTA CONFIRMADA 🔔\n🎰 Roleta: [NOME_ROLETA]\n📍Entrar: [ENTRAR_EM]\n0️⃣ Cobrir o ZERO.",

            win:"✅✅✅ GREEN ✅✅✅\n[RESULTADO]",
            
            loss:"❌❌RED❌❌\n[RED]",
            
            martingale:'🔁 [NUMERO]º Martingale!',

            parcial:"🚀Resultado Parcial:✅([ACERTOS]) VS ❌([ERROS])\nAssertividade: [PORCENTAGEM_ACERTO]",
           
            final:"🚀Resultado Final:✅([ACERTOS]) VS ❌([ERROS])\nAssertividade: [PORCENTAGEM_ACERTO]",
          
        }); 
        
        
          
      }else{
       //Estrategia Crash
        await EstrategiaCrash.create({
            bot_id:grupo.id,
            nome:'Jogada 1.5',
            sequencia:3,
            valor_a:1,
            valor_b:1.5,
            apostar_em:1.5,
            martingale:2,
        });
        
        await EstrategiaCrash.create({
            bot_id:grupo.id,
            nome:'Jogada 2.0',
            sequencia:8,
            valor_a:1,
            valor_b:1.5,
            apostar_em:2,
            martingale:2,
        }); 
        //Mensagem Crash
        const msgCrash = await MsgCrash.create({
            bot_id:grupo.id,
            atencao:'⚠️ ATENÇÃO, possível entrada [ENTRADA] \n⌚️ Aguarde a confirmação \n🎰 Blaze: <a href="https://blaze.com/pt/games/crash">Crash</a>',

            confirmacao:'🔔 Entrada Confirmada 🔔 \n🎰 Blaze: <a href="https://blaze.com/pt/games/crash">Crash</a> \💰 Entrar após [ULTIMA_VELA] \n🚀 Auto retirar [ENTRADA]',

            win:'✅✅✅GREEN - BATEU META? VAZA \n[NUMEROS_SEQUENCIA]',

            loss:'⛔ RED - SEGUE GERENCIAMENTO \n[NUMEROS_SEQUENCIA]',

            martingale:'🔁 [NUMERO]º Martingale!',

            parcial:'🚀Resultado parcial\n✅([ACERTOS]) VS ❌([ERROS])\nAssertividade: [PORCENTAGEM_ACERTO]',
            final:'🚀Resultado Final\n✅([ACERTOS]) VS ❌([ERROS])\nAssertividade: [PORCENTAGEM_ACERTO]'
        }); 
      }


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
        where:{ id:id }

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
    const {nome,tipo_jogo,bot_token,chat_id,usuario_id} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(tipo_jogo, 'tipo_jogo', 'O tipo_jogo é obrigatorio');
        contract.isRequired(bot_token, 'bot_token', 'O bot_token é obrigatorio');
        contract.isRequired(chat_id, 'chat_id', 'O chat_id é obrigatorio');
        contract.isRequired(usuario_id, 'usuario_id', 'O usuario é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
   
        const grupoOld = await Grupo.findOne({
            where:{ id:id }
    
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
        usuario_id,
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
       var grupo = new Grupo();
       if(usuarioLogado.permissoes.length > 0){
        grupo = await Grupo.findOne({where:{ id:id }});
       }else{
           grupo = await Grupo.findOne({
               where: {
                   [Op.and]: [
                     { usuario_id: usuarioLogado.id },
                     { id:id }
                   ]
                 }
           });
       }
       if(!grupo){
        return res.status(201).json({
            msg:'Grupo não existe',
        })
        }

       

     if(grupo.status == "I"){
         if(grupo.tipo_jogo == 'Smashup-Double'){
          pm2.connect(function(err) {
             if (err) {
              console.error(err)
              process.exit(2)
             }
            
            pm2.start({
                script    : `${process.env.APP_CAMINHOSMASHDOUBLE}`,
                name      : `${grupo.id}`,
                args      : `${grupo.id}`,
                interpreter:'python3.8',
                }, function(err, apps) {
                   console.log(err);
                })
               
             })
             pm2.disconnect();
         }else if(grupo.tipo_jogo == 'Smashup-Crash'){
            pm2.connect(function(err) {
                if (err) {
                 console.error(err)
                 process.exit(2)
                }
               
               pm2.start({
                   script    : `${process.env.APP_CAMINHOSMASHCRASH}`,
                   name      : `${grupo.id}`,
                   args      : `${grupo.id}`,
                   interpreter:'python3.8',
                   }, function(err, apps) {
                      console.log(err);
                   })
                  
                })
                pm2.disconnect();
         }else{
            pm2.connect(function(err) {
                if (err) {
                 console.error(err)
                 process.exit(2)
                }
               
               pm2.start({
                   script    : `${(grupo.tipo_jogo == 'Blaze-Crash') ? process.env.APP_CAMINHOCRASH : process.env.APP_CAMINHODOUBLE}`,
                   name      : `${grupo.id}`,
                   args      : `${grupo.id}`,
                   interpreter:'python3.8',
                   }, function(err, apps) {
                      console.log(err);
                   })
                  
                })
                pm2.disconnect();
         }
            
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

   
    
    

       return res.status(201).send({
         msg:"grupo atualizado",
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},


async reinicarbot(req,res){
    try{
        
            const { id } = req.params;
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const usuarioLogado = await authService.decodeToken(token);
            console.log('entrou no dsfsd')
            console.log(id)
            if(!usuarioLogado){
                return res.status(201).json({
                    msg:'Usuario não existe',
                   
                })
            }
            var grupo = new Grupo();
            if(usuarioLogado.permissoes.length > 0){
             grupo = await Grupo.findOne({where:{ id:id }});
            }else{
                grupo = await Grupo.findOne({
                    where: {
                        [Op.and]: [
                          { usuario_id: usuarioLogado.id },
                          { id:id }
                        ]
                      }
                });

            }
            if(!grupo){
             return res.status(201).json({
                 msg:'Grupo não existe',
             })
             }
 
        pm2.connect(function(err) {
            if (err) {
             console.error(err)
             process.exit(2)
            }
            
            pm2.restart(`${grupo.id}`, function (err, proc) {
                //console.log(err,proc);
                 pm2.disconnect();
              })

            })

            return res.status(201).send({
                msg:'Bot reiniciado',
              })
      

    }catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},



async excluirgrupo(req,res){
         
    try{
        const { id } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const grupoOld = await Grupo.findOne({
            where: {id:id}
    
           });

     
          if(!grupoOld){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }



    const grupo = await Grupo.destroy({where:{id:grupoOld.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Grupo Excluida com sucesso",
        data:grupo

    })
}
catch(err){
    return res.status(200).send({
        resolucao:false,
        error:err.message
    })
}

},


   
}

