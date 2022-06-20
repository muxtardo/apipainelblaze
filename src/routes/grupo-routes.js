'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/grupo-controller');


router.get('/',authService.authorize,controller.index);
router.post('/',authService.authorize,controller.store);
router.get('/show/:id',authService.authorize,controller.show);
router.put('/update/:id',authService.authorize,controller.update);
router.put('/mudastatus/:id',authService.authorize,controller.mudastatus);



router.post('/ligabot/:id',authService.authorize,controller.ligarbot);

module.exports =router;