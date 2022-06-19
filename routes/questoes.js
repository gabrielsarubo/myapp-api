var express = require('express');
const router = express.Router();

const classeGramatical = require('../geradorDeQuestoes/classeGramatical');
const traducao = require('../geradorDeQuestoes/traducao');

router.get('/classeGramatical', function(req, res, next) {
  classeGramatical(req, res, next);
});

router.get('/traducao', function(req, res, next) {
  traducao(req, res, next);
});

module.exports = router;
