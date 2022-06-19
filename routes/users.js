const express = require('express')
const router = express.Router()

const Acesso = require('../helpers/acessoApi')

/* GET users listing. */
router.get("/", (req, res) => {
  res.json({auth:true, role:"all"})
})

router.post("/login", Acesso.login)

router.get("/logged", Acesso.validateJwt, (req, res) => {
  res.json({auth:true, role: "logged-user"})
})

router.get("/admin", Acesso.validateJwt, Acesso.isAdmin, (req, res) => {
  res.json({auth:true, role: "logged-admin"})
})

module.exports = router;
