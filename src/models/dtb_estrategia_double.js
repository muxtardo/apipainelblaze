
const { Model, DataTypes } = require('sequelize');

class dtb_estrategia_double extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      nome:DataTypes.STRING,
      sequencia:DataTypes.STRING,
      apostar_em:DataTypes.FLOAT,
      martingale:DataTypes.INTEGER,
    
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.dtb_bots,{ foreignKey: 'bot_id', as:'usuario' })
  
    }
 

}

module.exports = dtb_estrategia_double;
