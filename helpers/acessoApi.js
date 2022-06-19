const Usuario = require('../models/Usuario')
const jwt = require("jsonwebtoken")

module.exports = {
    login: async function (req, res) {
        let { email, senha } = req.body

        let usuario

        if (!email && !senha) {
            return res.status(400).send("Nenhum dado inserido, preencha todos os campos");
        }

        if (!email) {
            return res.status(400).send("Insira um email");
        }

        if (!senha) {
            return res.status(400).send("Insira uma senha");
        }

        if (!!email) {
            usuario = await Usuario.getByLogin(email, senha)
        }

        if (!!email && usuario == null) {
            return res.status(401).json({ auth: false, message: 'Usuário e senha inválidos' })
        }

        const token = jwt.sign({ email: usuario.email }, process.env.SECRET, {
            expiresIn: "40 min"
        });
        res.json({ auth: true, usuario: usuario, token: token })
    },

    validateJwt: function (req, res, next) {
        const token = req.headers['x-jwt-token']
        if (!token)
            return res.status(401).send({ auth: false, message: 'Sem permissão de acesso' })

        jwt.verify(token, process.env.SECRET, async function (err, decoded) {
            if (err) return res.status(401).send({ auth: false, message: "Token inválido!" })
            req.user = await Usuario.getByEmail(decoded.email)
            return next()
        });
    },

    isAdmin: async function (req, res, next) {
        const confirm = await Usuario.confirmAdmin(req.user)
        if (!confirm) {
            return res.status(401).json({ auth: false, message: "Requer permissao de administrador" })
        }
        return next()
    }
}