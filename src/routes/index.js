const express = require('express');
const apiRouter = require('./api');
const router = module.exports = express.Router();
router.use('/api/v1', apiRouter);
