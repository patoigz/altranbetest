var express = require('express');
var router = express.Router();

const apiClient = require('./api.client.controller');
router.use('/client', apiClient);

const apiPolicy = require('./api.policy.controller');
router.use('/policy', apiPolicy);

module.exports = router;
