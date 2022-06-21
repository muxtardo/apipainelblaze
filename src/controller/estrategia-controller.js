'use strict';


 const EstrategiaDouble = require('../models/dtb_estrategia_double');
 const EstrategiaCrash = require('../models/dtb_estrategia_crash');
 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 const { Op } = require("sequelize");
module.exports = {
 
async index(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const {id} = req.params;//bot_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const  doubles = await EstrategiaDouble.findAll({where:{bot_id:id}})

        return  res.status(200).send({
            dubles:doubles
        });




    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},


async storedouble(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const { id } = req.params; //bod_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }
        const {nome,sequencia,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isRequired(martingale, 'martingale', 'O martingale é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
          
        const double = await EstrategiaDouble.create({
            bot_id:id,
            nome,
            sequencia,
            apostar_em,
            martingale,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Estrategia cadastrado com sucesso",
            duble:double

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
       const { id,idbot } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }
       var duble = new EstrategiaDouble();
       if(usuarioLogado.permissoes.length > 0){
        duble = await EstrategiaDouble.findOne({where:{ id:id }});
       }else{
        duble = await EstrategiaDouble.findOne({
               where: {
                   [Op.and]: [
                    { bot_id: idbot},
                     { id:id }
                   ]
                 }
           });
       }
   

      
       return res.status(201).send({
           duble:duble
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
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id,idbot } = req.params;
    const {nome,sequencia,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isRequired(martingale, 'martingale', 'O martingale é obrigatorio');
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        var doubleOld = new EstrategiaDouble();
        if(usuarioLogado.permissoes.length > 0){
            doubleOld = await EstrategiaDouble.findOne({where:{ id:id }});
        }else{
            doubleOld = await EstrategiaDouble.findOne({
                where: {
                    [Op.and]: [
                     { bot_id: idbot},
                      { id:id }
                    ]
                  }
            });
        }
 

    if(!doubleOld){
        return res.status(201).json({
            msg:'Estrategia não existe',
           
        })
    }

   
    const duble = await doubleOld.update({
        nome,
        sequencia,
        apostar_em,
        martingale,
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        data:duble

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


async excluirdouble(req,res){
         
    try{
        const { id,idbot } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const estrategiaold = await EstrategiaDouble.findOne({
            where: {
                [Op.and]: [
                  { bot_id: idbot},
                  { id:id }
                ]
              }
    
           });

     
          if(!estrategiaold){
            return res.status(201).json({
                msg:'Estrategia não existe',
               
            })
        }



    const estrategia = await EstrategiaDouble.destroy({where:{id:estrategiaold.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Estrategia Excluida com sucesso",
        data:estrategia

    })
}
catch(err){
    return res.status(200).send({
        resolucao:false,
        error:err.message
    })
}

},




async storecrash(req,res){
    
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const { id } = req.params; //bod_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }
        const {nome,sequencia,  valor_a,valor_b,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(valor_a, 'valor_a', 'A valor a é obrigatorio');
        contract.isRequired(valor_b, 'valor_b', 'A valor b é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isRequired(martingale, 'martingale', 'O martingale é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
          
        const crash = await EstrategiaCrash.create({
            bot_id:id,
            nome,
            sequencia,
            valor_a,
            valor_b,
            apostar_em,
            martingale,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Estrategia cadastrado com sucesso",
            crash:crash

        })
     

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},

async indexcrahs(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const {id} = req.params;//bot_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        
        

        const  crashs = await EstrategiaCrash.findAll({where:{bot_id:id}})

        return  res.status(200).send({
            crashs:crashs
        });




    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},

async showcrash(req,res){
    try{
       const { id,idbot } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }

       

       var crash = new EstrategiaCrash();
       if(usuarioLogado.permissoes.length > 0){
        crash = await EstrategiaCrash.findOne({where:{ id:id }});
       }else{
        crash = await EstrategiaCrash.findOne({
               where: {
                   [Op.and]: [
                    { bot_id: idbot},
                     { id:id }
                   ]
                 }
           });
       }


       return res.status(201).send({
         crash:crash
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
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id,idbot } = req.params;
        const {nome,sequencia,  valor_a,valor_b,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(valor_a, 'valor_a', 'A valor a é obrigatorio');
        contract.isRequired(valor_b, 'valor_b', 'A valor b é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isRequired(martingale, 'martingale', 'O martingale é obrigatorio');
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        var crashOld = new EstrategiaCrash();
        if(usuarioLogado.permissoes.length > 0){
            crashOld = await EstrategiaCrash.findOne({where:{ id:id }});
        }else{
            crashOld = await EstrategiaCrash.findOne({
                where: {
                    [Op.and]: [
                     { bot_id: idbot},
                      { id:id }
                    ]
                  }
            });
        }
       

    if(!crashOld){
        return res.status(201).json({
            msg:'Estrategia não existe',
           
        })
    }

   
    const crash = await crashOld.update({
            nome,
            sequencia,
            valor_a,
            valor_b,
            apostar_em,
            martingale,
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        crash:crash

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},



async excluircrash(req,res){
         
    try{
        const { id,idbot } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const estrategiaold = await EstrategiaCrash.findOne({
            where: {
                [Op.and]: [
                  { bot_id: idbot},
                  { id:id }
                ]
              }
    
           });

     
          if(!estrategiaold){
            return res.status(201).json({
                msg:'Estrategia não existe',
               
            })
        }



    const estrategia = await EstrategiaCrash.destroy({where:{id:estrategiaold.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Estrategia Excluida com sucesso",
        data:estrategia

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

