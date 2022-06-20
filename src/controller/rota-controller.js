'use strict';

 const getDadosBlaze = require('../services/dadosBlaze');
module.exports = {
 
async index(req,res){
    try{
   

        const dados = await getDadosBlaze.getDados();
        console.log(dados.data);
        return res.status(201).send({
           dados:dados.data
        //    dados:{
        //     "id": "KV16ZjWR1B",
        //     "ultimosResultados": [],
        //     "apostaBranco": 560.01,
        //     "apostaVermelho": 1959.0,
        //     "apostaPreto": 9160.0,
        //     "ultimosResultadosWeb": [
        //         {
        //             "numero": 1,
        //             "cor": "Vermelho"
        //         },
        //         {
        //             "numero": 7,
        //             "cor": "Vermelho"
        //         },
        //         {
        //             "numero": 14,
        //             "cor": "Preto"
        //         },
        //         {
        //             "numero": 12,
        //             "cor": "Preto"
        //         },
        //         {
        //             "numero": 3,
        //             "cor": "Vermelho"
        //         },
        //         {
        //             "numero": 2,
        //             "cor": "Vermelho"
        //         },
        //         {
        //             "numero": 10,
        //             "cor": "Preto"
        //         },
        //         {
        //             "numero": 1,
        //             "cor": "Vermelho"
        //         },
        //         {
        //             "numero": 2,
        //             "cor": "Vermelho"
        //         },
        //         {
        //             "numero": 7,
        //             "cor": "Vermelho"
        //         }
        //     ],
        //     "ultimosResultadosMobile": [
        //         {
        //             "numero": 3,
        //             "cor": "Vermelho"
        //         },
        //         {
        //             "numero": 2,
        //             "cor": "Vermelho"
        //         },
        //         {
        //             "numero": 10,
        //             "cor": "Preto"
        //         },
        //         {
        //             "numero": 1,
        //             "cor": "Vermelho"
        //         },
        //         {
        //             "numero": 2,
        //             "cor": "Vermelho"
        //         },
        //         {
        //             "numero": 7,
        //             "cor": "Vermelho"
        //         }
        //     ],
        //     "probabilidadeBranco": 5.306144901335216,
        //     "probabilidadePreto": 49.33422051150074,
        //     "probabilidadeVermelho": 45.359634587164045
        //   }
        })
    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},




 


   
}

