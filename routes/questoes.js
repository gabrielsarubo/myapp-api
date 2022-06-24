var express = require('express');
const router = express.Router();

const classeGramatical = require('../middlewares/geradorDeQuestoes/classeGramatical');
const traducao = require('../middlewares/geradorDeQuestoes/traducao');

router.post('/classeGramatical', function(req, res, next) {
  classeGramatical(req, res, next);
});

router.post('/traducao', function(req, res, next) {
  traducao(req, res, next);
});

module.exports = router;
