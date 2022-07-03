
const { Model, DataTypes } = require('sequelize');

class dtb_estrategia_bet365 extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      nome_roleta:DataTypes.STRING,
      sequencia_cor:DataTypes.INTEGER,
      sequencia_maior_menor:DataTypes.INTEGER,
      sequencia_par_impar:DataTypes.INTEGER,
      sequencia_duzias:DataTypes.INTEGER,
      sequencia_colunas:DataTypes.INTEGER,
      martingale:DataTypes.INTEGER,
      status:DataTypes.INTEGER,
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.dtb_bots,{ foreignKey: 'bot_id', as:'bots' })
  }
 

}

module.exports = dtb_estrategia_bet365;

