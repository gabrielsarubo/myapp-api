var express = require('express');
const router = express.Router();

const classeGramatical = require('../middlewares/geradorDeQuestoes/classeGramatical');
const traducao = require('../middlewares/geradorDeQuestoes/traducao');

router.get('/classeGramatical', function(req, res, next) {
  classeGramatical(req, res, next);
});

router.get('/traducao', function(req, res, next) {
  traducao(req, res, next);
});

module.exports = router;
