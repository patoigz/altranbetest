const express = require('express');
const router = express.Router();
const verifyTokenUser = require('../auth/verify.token.auth')(['user', 'admin']);
const verifyTokenAdmin = require('../auth/verify.token.auth')(['admin']);

const apiClient = require('./api.client.controller');
router.use('/client', verifyTokenUser.verify, apiClient);

const apiPolicy = require('./api.policy.controller');
router.use('/policy', verifyTokenAdmin.verify, apiPolicy);

module.exports = router;
