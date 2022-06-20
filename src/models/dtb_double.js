
const { Model, DataTypes } = require('sequelize');

class dtb_double extends Model {
  static init(sequelize) {
    super.init({
      seed:DataTypes.STRING,
      color:DataTypes.INTEGER,
      roll:DataTypes.INTEGER,
      created:DataTypes.DATE,
    }, {
      sequelize
    });
  };


  
 

}

module.exports = dtb_double;



