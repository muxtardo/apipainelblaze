
const { Model, DataTypes } = require('sequelize');

class Permissoes extends Model {
  static init(sequelize) {
    super.init({
      nome:DataTypes.STRING,
    
    }, {
      sequelize
    });
  };


  static associate(models){
 
  this.belongsToMany(models.Usuarios, { foreignKey: 'permissao_id', through: 'usuarios_permissoes', as: 'usuarios' });

  }
 

}

module.exports = Permissoes;



