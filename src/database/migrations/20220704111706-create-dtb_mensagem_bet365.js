'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dtb_mensagem_bet365', { 
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
      atencao: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      confirmacao: {
        type: Sequelize.TEXT,
        allowNull: false,
     },
     win: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      loss: {
          type: Sequelize.TEXT,
      },
      martingale:{
        type: Sequelize.TEXT,
      },
      parcial:{
        type: Sequelize.TEXT,
      },
      final:{
        type: Sequelize.TEXT,
      },
      statusmartingale:{
        type:Sequelize.INTEGER, // 0- inativo 1-Ativo
        defaultValue: 1,
      },
      statusparcialfinal:{
        type:Sequelize.INTEGER, // 0- inativo 1-Ativo
        defaultValue: 1,
      },
      statuscoberturabranco:{
        type:Sequelize.INTEGER, // 0- inativo 1-Ativo
        defaultValue: 1,
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
    await queryInterface.dropTable('dtb_mensagem_bet365');
  }
};
