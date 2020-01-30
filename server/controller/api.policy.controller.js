var express = require('express');
var router = express.Router();
var apiService = require('../service/api.policy.service');

router.get('/all', apiService.all);
router.get('/findClientByPolicyId/:_id', apiService.findClientByPolicyId);
router.get('/findByClientId/:_id', apiService.findByClientId);
router.get('/findByClientName/:_name', apiService.findByClientName);

module.exports = router;
