var express = require('express');
var router = express.Router();
const newWord = require('../middlewares/newWord/newWord')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/novaPalavra', function(req, res, next) {
  newWord(req, res)
});

module.exports = router;
