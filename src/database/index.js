const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Usuarios = require('../models/usuarios');
const Permissoes = require('../models/permissoes');
const Rotas = require('../models/Rotas');
const dtb_bots = require('../models/dtb_bots');
const dtb_estrategia_crash = require('../models/dtb_estrategia_crash');
const dtb_estrategia_double = require('../models/dtb_estrategia_double');
const dtb_mensagem_crash = require('../models/dtb_mensagem_crash');
const dtb_mensagem_double = require('../models/dtb_mensagem_double');
const dtb_crash = require('../models/dtb_crash');

const dtb_estrategia_bet365 = require('../models/dtb_estrategia_bet365');
const dtb_mensagem_bet365 = require('../models/dtb_mensagem_bet365');





const connection = new Sequelize(dbConfig);


Usuarios.init(connection);
Permissoes.init(connection);
Rotas.init(connection);
dtb_bots.init(connection);
dtb_estrategia_crash.init(connection);
dtb_estrategia_double.init(connection);
dtb_mensagem_crash.init(connection);
dtb_mensagem_crash.init(connection);
dtb_mensagem_double.init(connection);
dtb_estrategia_bet365.init(connection);
dtb_mensagem_bet365.init(connection);





//associate


Usuarios.associate(connection.models);
Permissoes.associate(connection.models);
Rotas.associate(connection.models);
dtb_bots.associate(connection.models);
dtb_estrategia_crash.associate(connection.models);
dtb_estrategia_double.associate(connection.models);
dtb_mensagem_crash.associate(connection.models);
dtb_mensagem_double.associate(connection.models);
dtb_estrategia_bet365.associate(connection.models);
dtb_mensagem_bet365.associate(connection.models);