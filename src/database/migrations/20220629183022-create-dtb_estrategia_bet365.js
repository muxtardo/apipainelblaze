'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dtb_estrategia_bet365', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      bot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'dtb_bots', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nome_roleta: {
          type: Sequelize.STRING(200),
          allowNull: false,
      },
      sequencia_cor: {
        type: Sequelize.INTEGER,
        allowNull: false,
     },
     sequencia_maior_menor: {
          type: Sequelize.INTEGER,
          allowNull: false,
     },
      sequencia_par_impar: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      sequencia_duzias: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      sequencia_colunas: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      martingale: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0,
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
    await queryInterface.dropTable('dtb_estrategia_bet365');
  }
};
