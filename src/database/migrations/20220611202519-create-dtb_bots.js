'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dtb_bots', { 
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
      nome: {
          type: Sequelize.STRING(200),
          allowNull: false,
      },
      tipo_jogo: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
      bot_token: {
          type: Sequelize.STRING(200),
          allowNull: false,
      },
      chat_id: {
          type: Sequelize.STRING(200),
      },
      status: {
        type: Sequelize.STRING(200),
        defaultValue: "A", //A - ativo // I- inativo
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
    await queryInterface.dropTable('dtb_bots');
  }
};
