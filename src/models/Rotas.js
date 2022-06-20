
const { Model, DataTypes } = require('sequelize');

class Rotas extends Model {
  static init(sequelize) {
    super.init({
      usuario_id:DataTypes.INTEGER,
      rota:DataTypes.STRING,
      controller:DataTypes.STRING,
      permissao:DataTypes.STRING,
      dashboard:DataTypes.STRING,
      descricao:DataTypes.STRING,
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.Usuarios,{ foreignKey: 'usuario_id', as:'usuario' })
  
    }
 

}

module.exports = Rotas;



