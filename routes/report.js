const express = require('express');
const router = express.Router();

// Middlewares
const createReport = require('../middlewares/report/createReport')

router.get('/', (req, res) => {
  createReport(req, res)
})

module.exports = router
