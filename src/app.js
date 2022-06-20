'use strict'
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

require('./database');///importante erro de lenght
const app = express();
var cors = require('cors')
const router = express.Router();



//Carrega rota
const indexRoute = require('./routes/index-route');


const usuarioRoute = require('./routes/usuario-routes');
const permissaoRoute = require('./routes/permissao-routes');
const rotaRoute =require('./routes/rota-routes');
const telegramRoute =require('./routes/telegram-routes');
const grupoRoute =require('./routes/grupo-routes');
const mensagemRoute =require('./routes/mensagem-routes');
const estrategiaRoute =require('./routes/estrategia-routes');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(cors());


app.use('/', indexRoute);
app.use('/usuario', usuarioRoute);
app.use('/permissao', permissaoRoute);
app.use('/rota',rotaRoute);
app.use('/telegram',telegramRoute);
app.use('/grupo',grupoRoute);
app.use('/mensagem',mensagemRoute);
app.use('/estrategia',estrategiaRoute);

module.exports = app;

