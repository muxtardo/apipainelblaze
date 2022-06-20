
const { Model, DataTypes } = require('sequelize');

class dtb_mensagem_crash extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      atencao:DataTypes.TEXT,
      confirmacao:DataTypes.TEXT,
      win:DataTypes.TEXT,
      loss:DataTypes.TEXT,
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.dtb_bots,{ foreignKey: 'bot_id', as:'usuario' })
  
    }
 

}

module.exports = dtb_mensagem_crash;



