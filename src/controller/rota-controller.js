'use strict';

var fs = require('fs');
var path = require('path');
const Grupo = require('../models/dtb_bots');
 const MsgDouble = require('../models/dtb_mensagem_double');
 const MsgCrash = require('../models/dtb_mensagem_crash');
 const MsgRoleta = require('../models/dtb_mensagem_bet365');

module.exports = {
 
async index(req,res){
    try{
       var jsonData = fs.readFileSync(path.join(__dirname, '../arquivojson/mensagemcrash.json'), "utf8");
        var jsonformatado = JSON.parse(jsonData);
        Object.keys(jsonformatado).forEach( async function(item){
            console.log(item + " - " + jsonformatado[item].bot_id);

            // const msgdouble = await MsgDouble.create({
            //     bot_id: jsonformatado[item].bot_id,
            //     atencao:jsonformatado[item].atencao,
            //     red:jsonformatado[item].red,
            //     black:jsonformatado[item].black,
            //     win:jsonformatado[item].win,
            //     loss:jsonformatado[item].loss,
            //     martingale:jsonformatado[item].martingale,
            //     branco:jsonformatado[item].branco,
            //     parcial:jsonformatado[item].parcial,
            //     final:jsonformatado[item].final,
            //     statusmensagem:jsonformatado[item].statusmensagem,
            //     statusmartingale:jsonformatado[item].statusmartingale,
            //     statusparcialfinal:jsonformatado[item].statusparcialfinal,
            //     statuscoberturabranco:jsonformatado[item].statuscoberturabranco
    
            // });


            // const msgCrash = await MsgCrash.create({
            //     bot_id: jsonformatado[item].bot_id,
            //     atencao: jsonformatado[item].atencao,
            //     confirmacao: jsonformatado[item].confirmacao,
            //     win: jsonformatado[item].win,
            //     loss: jsonformatado[item].loss,
            //     martingale: jsonformatado[item].martingale,
            //     parcial: jsonformatado[item].parcial,
            //     final: jsonformatado[item].final,
            //     statusmartingale: jsonformatado[item].statusmartingale,
            //     statusparcialfinal: jsonformatado[item].statusparcialfinal,
            // }); 




            
           });

        return  res.status(200).send({
            rota:JSON.parse(jsonData)
        });
    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},




 


   
}

