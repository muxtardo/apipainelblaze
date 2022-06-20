require('dotenv').config();
const axios =require('axios');

const api = axios.create({
    baseURL: 'http://62.171.154.53:3005/get/'
});


module.exports ={
  async getDados(){
      try{
           
          const response = await api.get()
          return {error:false, data:response.data};
        }
      catch(err){
          return {error:true,message:err.message}
      }

    },
}