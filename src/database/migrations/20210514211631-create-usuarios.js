'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
          type: Sequelize.STRING(200),
          allowNull: false,
      },
      email: {
          type: Sequelize.STRING(300),
          allowNull: false,
      },
      senha: {
          type: Sequelize.STRING(200),
      },
      telefone: {
        type: Sequelize.STRING(200),
      },
  
      status: {
        type: Sequelize.STRING(200),
        defaultValue: "A", //A - ativo // I- inativo
      },
      datavencimento: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }, 
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }, 
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }, 
      

   });
   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  }
};
