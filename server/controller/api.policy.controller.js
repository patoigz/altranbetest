const express = require('express');
const router = express.Router();
const apiService = require('../service/api.policy.service');

router.get('/all', apiService.all);
router.get('/findClientByPolicyId/:_id', apiService.findClientByPolicyId);
router.get('/findByClientId/:_id', apiService.findByClientId);
router.get('/findByClientName/:_name', apiService.findByClientName);

module.exports = router;
