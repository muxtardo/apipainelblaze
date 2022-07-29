'use strict';
 const Usuario = require('../models/usuarios');
 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 const md5 = require('md5');

module.exports = {
async updatesenha(req,res){
         
        try{
                
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
             const usuarioLogado = await authService.decodeToken(token);
             
             if(!usuarioLogado){
                 return res.status(201).json({
                     msg:'Usuario não existe',
                    
                 })
             }

      
            const {senha} = req.body;
       
       
        let contract = new ValidationContract();


      
        contract.isRequired(senha, 'senha', 'A Senha é obrigatorio');
      
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
       
        const usuarioold = await Usuario.findByPk(usuarioLogado.id);
        if(!usuarioold){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const senhaNova =  md5(senha + process.env.APP_SECRET_KEY);
       
        const usuario = await usuarioold.update({
            senha:senhaNova,
          
        }); 

        return res.status(201).json({
            msg:"Senha Atualizado com sucesso",
            data:usuario

        })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async store(req,res){
         
            try{
            const {nome,senha,email,telefone,datavencimento} = req.body;
            const usuarioExist = await Usuario.findOne({where:{email:email}});
            let contract = new ValidationContract();
            contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
            contract.isRequired(senha, 'senha', 'A senha é obrigatorio');
            contract.isRequired(email, 'email', 'O email é obrigatorio');
            contract.isEmail(email, 'email', 'O email é Invalido');
            contract.isValue(usuarioExist, 'email', 'O email é já existe');
            // Se os dados forem inválidos
            if (!contract.isValid()) {
                return res.status(200).send({
                error:contract.errors()
                })
            };
            const senhaNova =  md5(req.body.senha + process.env.APP_SECRET_KEY);
            const usuario = await Usuario.create({
                nome,
                senha:senhaNova,
                email,
                telefone,
                datavencimento  
            }); 

            return res.status(201).json({
                resolucao:true,
                msg:"Usuario cadastrado com sucesso",
                data:usuario

            })
        }
        catch(err){
            return res.status(200).send({
                resolucao:false,
                error:err.message
            })
        }

},

async update(req,res){
         
        try{
            const {id} = req.params;
        const {nome,email,telefone,datavencimento} = req.body;
       
       
        let contract = new ValidationContract();


      
        const usuarioExist  = await Usuario.findOne({where:{email:email}});
        const usuarioExist2  = await Usuario.findOne({where:{id:id}});
        contract.isRequired(nome, 'nome', 'O nome é obrigatorio');
        contract.isRequired(email, 'email', 'O email é obrigatorio');
        contract.isEmailUpdade(usuarioExist,usuarioExist2, 'email', 'O email  já existe');
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
       
        const usuarioold = await Usuario.findByPk(id);
        if(!usuarioold){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

       
        const usuario = await usuarioold.update({
            nome,
            email,
            telefone,
            datavencimento,
            
        }); 

        return res.status(201).json({
            msg:"Usuario Atualizado com sucesso",
            data:usuario

        })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async index(req,res){
    try{
        const usuarios = await Usuario.findAll();
        return res.status(201).send({
            usuarios:usuarios
        })
    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},

async listclientes(req,res){
    try{
        const usuarios = await Usuario.findAll();
        return res.status(201).send({
            usuarios:usuarios
        })
    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},

 async show(req,res){
        try{
           const { id } = req.params;
          
           const usuario = await Usuario.findByPk(id);
           return res.status(201).send({
               usuario:usuario
           })
        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }
   
 },
 
async autenticar(req,res){
        try{
            if(!req.body.email || !req.body.senha){
              
                    res.status(200).send({
                        situacao:false,
                        error:'Email e Senha Obrigatorio'
                    });
                    return;
             }
            
            const user = await Usuario.findOne({
                where:{
                    email:req.body.email,
                    senha:md5(req.body.senha + process.env.APP_SECRET_KEY)
                },
                include:{association:"permissoes"},
            
            });
   
              if(!user){
                res.status(200).send({
                    situacao:false,
                    error:'Email ou senha errada'
                });
                return;
               }

                 
               if(user.status != 'A'){
                res.status(200).send({
                    situacao:false,
                    error:'Usuario Bloqueado'
                });
                return;
               }
             
           
          
          

           
          
           const token = await authService.generateToken({
            id: user.id,
            email: user.email,
            nome: user.nome,
            permissoes:user.permissoes
        });

        res.status(201).send({
            situacao:true,
            access_token: token,
                data: {
                    id:user.id,
                    email: user.email,
                    nome: user.nome,
                    permissoes:user.permissoes
                 },
                
           });

        }
        catch(err){
            return res.status(200).send({
                situacao:false,
                error:err.message
            })
        }
},

async autenticaradmin(req,res){
    try{
        if(!req.body.email || !req.body.senha){
          
                res.status(200).send({
                    situacao:false,
                    error:'Email e Senha Obrigatorio'
                });
                return;
         }
        console.log('antes')
        const user = await Usuario.findOne({
            where:{
                email:req.body.email,
                senha:md5(req.body.senha + process.env.APP_SECRET_KEY)
            },
            include:{association:"permissoes"},
        
        });
        console.log('depois')

          if(!user){
            res.status(200).send({
                situacao:false,
                error:'Email ou senha errada'
            });
            return;
           }

               
           if(user.status != 'A'){
            res.status(200).send({
                situacao:false,
                error:'Usuario Bloqueado'
            });
            return;
           }

          const existepermissao = user.permissoes.findIndex((obj) => obj.nome === 'ADM');

          if(existepermissao != 0){
            res.status(200).send({
                situacao:false,
                error:'Acesso Administrativo'
            });
            return;
           }
          
       
        
     
      
      
       const token = await authService.generateToken({
        id: user.id,
        email: user.email,
        nome: user.nome,
        permissoes:user.permissoes
      });

    res.status(201).send({
        situacao:true,
        access_token: token,
            data: {
                id:user.id,
                email: user.email,
                nome: user.nome,
                permissoes:user.permissoes
             },
            
       });

    }
    catch(err){
        return res.status(200).send({
            situacao:false,
            error:err.message
        })
    }
},

async decoude(req,res){
       
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        
        res.status(200).send({
            usuario: data,
                
        });
},

async mudastatus(req,res){
        try{
            const {id} = req.params;
            const usuario = await Usuario.findByPk(id);
            if(!usuario){
                return res.status(200).send({
                    msg:'Usuario não existe'
                });
            }
            if(usuario.status == "A"){
                const usuarioAtualizado = usuario.update({
                    status:"I"
                })
                return res.status(201).send({
                    msg:"Usuairo Inativo",
                    
                })
            }
            else{
                const usuarioAtualizado = usuario.update({
                    status:"A"
                })
                return res.status(201).send({
                    msg:"Usuairo Ativo",
                    
                })
            }
           

           
        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }
},

async showPermissao(req,res){
        try{
           const { id } = req.params;
          
           const usuario = await Usuario.findByPk(id,{include:{association:"permissoes"}});
           return res.status(201).send({
               usuario:usuario
           })
        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }
   
},




   
}

