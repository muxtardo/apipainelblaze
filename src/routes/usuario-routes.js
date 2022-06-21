'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/usuario-controller');

router.get('/decoude/',authService.authorize,controller.decoude);
router.post('/',controller.store);
router.put('/:id',authService.isAdmin,controller.update);
router.post('/authenticate/',controller.autenticar);
router.post('/autenticaradmin/',controller.autenticaradmin);
router.get('/show/:id',authService.isAdmin,controller.show);
router.get('/usuariocompermissao/:id',authService.isAdmin,controller.showPermissao);
router.get('/',authService.isAdmin,controller.index);
router.put('/mudastatus/:id',authService.isAdmin,controller.mudastatus);
router.post('/updatesenha',authService.authorize,controller.updatesenha);

module.exports =router;

