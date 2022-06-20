'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rotas', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rota: {
          type: Sequelize.STRING(200),
          allowNull: true,
      },
      controller: {
          type: Sequelize.STRING(300),
          allowNull: true,
      },
      request: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      permissao: {
          type: Sequelize.STRING(200),
          allowNull: true,
      },
      dashboard: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      descricao: {
        type: Sequelize.STRING(200),
        allowNull: true,
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
    await queryInterface.dropTable('rotas');
  }
};
