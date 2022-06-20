'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/permissao-controller');


router.get('/',authService.authorize,controller.index);
router.put('/:userid/editpermissao/:id',authService.authorize,controller.linkPermissao);

module.exports =router;