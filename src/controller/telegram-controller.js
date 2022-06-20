'user restrict'
const { Telegraf } = require('telegraf')

module.exports = {
  async enviarMensagem(req,res){
    
    const {bottoken,chatid,message,userid} = req.body;
    console.log(bottoken)
    const bot = new Telegraf(bottoken)
   
    //const resposta = await bot.telegram.senContac(chatid);
    //const resposta = await bot.telegram.sendMessage(chatid, message)
    const resposta = await bot.telegram.chatJoin(bottoken, chatid)
     return res.status(200).send({
         error:false,
         message:resposta
     })

  },


  async banUser(req,res){
    
    const {bottoken,chatid,message,userid} = req.body;
    console.log(bottoken)
    const bot = new Telegraf(bottoken)
  
    //const resposta = await bot.telegram.getChatMember(chatid,userid);
    const resposta = await bot.telegram.getChatMembersCount(chatid, message)
     return res.status(200).send({
         error:false,
         message:resposta
     })

  },

}