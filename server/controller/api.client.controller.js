var express = require('express');
var router = express.Router();
var apiService = require('../service/api.client.service');

router.get('/all', apiService.all);

module.exports = router;
