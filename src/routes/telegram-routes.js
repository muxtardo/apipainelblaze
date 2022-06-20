'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/telegram-controller');

router.post('/',controller.enviarMensagem);

module.exports =router;

