const express = require('express')
const router = express.Router()

const CadastroUser = require('../helpers/cadastroUser')

/* GET users listing. */
router.get("/", (req, res) => {
  res.json({sucess:true, role:"registration"})
})

router.post("/user", CadastroUser.cadastro)

module.exports = router;
