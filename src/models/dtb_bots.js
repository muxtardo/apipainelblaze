
const { Model, DataTypes } = require('sequelize');

class dtb_bots extends Model {
  static init(sequelize) {
    super.init({
      usuario_id:DataTypes.INTEGER,
      nome:DataTypes.STRING,
      tipo_jogo:DataTypes.STRING,//Blaze-Crashd | Blaze-Double
      bot_token:DataTypes.STRING,
      chat_id:DataTypes.STRING,
      status:DataTypes.STRING,
      win:DataTypes.INTEGER,
      loss:DataTypes.INTEGER,
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.usuarios,{ foreignKey: 'usuario_id', as:'usuario' })
    this.hasMany(models.dtb_estrategia_crash,{ foreignKey: 'bot_id', as:'estrategiascrash' });
    this.hasMany(models.dtb_estrategia_double,{ foreignKey: 'bot_id', as:'estrategiasdouble' });
    this.hasMany(models.dtb_mensagem_crash,{ foreignKey: 'bot_id', as:'mensagenscrash' });
    this.hasMany(models.dtb_mensagem_double,{ foreignKey: 'bot_id', as:'mensagensdouble' });
    this.hasMany(models.dtb_estrategia_bet365,{ foreignKey: 'bot_id', as:'estrategiasbet' });
    this.hasMany(models.dtb_mensagem_bet365,{ foreignKey: 'bot_id', as:'mensagensroleta' }); 
  }
 

}

module.exports = dtb_bots;



