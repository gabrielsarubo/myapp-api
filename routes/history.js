const express = require('express');
const router = express.Router();

// Middlewares
const newEntry = require('../middlewares/history/newEntry');
const multipleEntries = require('../middlewares/history/multipleEntries');

router.post('/new', (req, res) => {
  newEntry(req, res)
})

router.post('/multipleEntries', (req, res) => {
  multipleEntries(req, res)
})

module.exports = router
