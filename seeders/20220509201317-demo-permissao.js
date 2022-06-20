'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
    return queryInterface.bulkInsert('permissoes', [{
      nome:"ADM",
    

    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permissoes', null, {});
  }
};
