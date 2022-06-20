'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/estrategia-controller');


router.get('/index/:id',authService.authorize,controller.index);
router.post('/store/:id',authService.authorize,controller.storedouble);
router.get('/show/:id/:idbot',authService.authorize,controller.showdouble);
router.put('/update/:id/:idbot',authService.authorize,controller.updatedouble);
router.delete('/delete/:id/:idbot',authService.authorize,controller.excluirdouble);


router.get('/indexcrash/:id',authService.authorize,controller.indexcrahs);
router.post('/storecrash/:id',authService.authorize,controller.storecrash);
router.get('/showcrash/:id/:idbot',authService.authorize,controller.showcrash);
router.put('/updatecrash/:id/:idbot',authService.authorize,controller.updatecrash);
router.delete('/deletecrash/:id/:idbot',authService.authorize,controller.excluircrash);

module.exports =router;