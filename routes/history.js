const express = require('express');
const router = express.Router();

// Middlewares
const newEntry = require('../middlewares/history/newEntry');

router.post('/new', (req, res) => {
  newEntry(req, res)
})

module.exports = router
