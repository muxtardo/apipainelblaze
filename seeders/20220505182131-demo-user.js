'use strict';
const md5 = require('md5');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const senhaNova =  md5('Marcio@2023' + process.env.APP_SECRET_KEY);
    return queryInterface.bulkInsert('usuarios', [{
      nome:"Admin",
      senha:senhaNova,
      email:"admin@gmail.com",
      telefone:"(35)986377373",

    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
