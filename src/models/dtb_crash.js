
const { Model, DataTypes } = require('sequelize');

class dtb_crash extends Model {
  static init(sequelize) {
    super.init({
      seed:DataTypes.STRING,
      crash_point:DataTypes.FLOAT,
      created:DataTypes.DATE,
    }, {
      sequelize
    });
  };


  
 

}

module.exports = dtb_crash;



