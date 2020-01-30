var express = require('express');
var router = express.Router();
var apiService = require('../service/api.policy.service');

router.get('/all', apiService.all);

module.exports = router;
