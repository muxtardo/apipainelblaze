'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/mensagens-controller');


router.get('/',authService.authorize,controller.index);
router.post('/',authService.authorize,controller.store);
router.get('/showdouble/:id',authService.authorize,controller.showdouble);
router.get('/showcrash/:id',authService.authorize,controller.showcrash);
router.put('/updatedouble/:id',authService.authorize,controller.updatedouble);
router.put('/updatecrash/:id',authService.authorize,controller.updatecrash);
router.put('/mudastatus/:id',authService.authorize,controller.mudastatus);

router.put('/updateroleta/:id',authService.authorize,controller.updateroleta);
router.get('/showroleta/:id',authService.authorize,controller.showroleta);

module.exports =router;