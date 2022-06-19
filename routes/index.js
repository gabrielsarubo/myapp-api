var express = require('express');
var router = express.Router();
const classeGramatical = require('../geradorDeQuestoes/classeGramatical');
const traducao = require('../geradorDeQuestoes/traducao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teste', function(req, res, next) {
  traducao(req, res, next);
});
module.exports = router;
