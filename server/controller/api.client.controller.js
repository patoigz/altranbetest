var express = require('express');
var router = express.Router();
var apiService = require('../service/api.client.service');

router.get('/all', apiService.all);
router.get('/findByClientId/:_id', apiService.findByClientId);
router.get('/findByClientName/:_name', apiService.findByClientName);

module.exports = router;
