
const { Model, DataTypes } = require('sequelize');

class usuarios extends Model {
  static init(sequelize) {
    super.init({
      nome:DataTypes.STRING,
      email:DataTypes.STRING,
      senha:DataTypes.STRING,
      telefone:DataTypes.STRING,
      status:DataTypes.STRING,
      datavencimento:DataTypes.DATE,
      win:DataTypes.INTEGER,
      loss:DataTypes.INTEGER,
    }, {
      sequelize
    });
  };


  static associate(models){
     this.belongsToMany(models.permissoes, { foreignKey: 'usuario_id', through: 'usuarios_permissoes', as: 'permissoes' })
     this.hasMany(models.Rotas,{ foreignKey: 'usuario_id', as:'rotas' });
     this.hasMany(models.dtb_bots,{ foreignKey: 'usuario_id', as:'boots' });
    }
 

}

module.exports = usuarios;



