const NovoUsuario = require('../models/NovaUsuario')
const Usuario = require('../models/Usuario')

module.exports = {
    cadastro: async function(req, res) {
        let {admin, nome, email, senha} = req.body
        if (!admin) {
            return res.status(400).send("Insira a flag admin");
        }

        if (!!admin && (admin !== "true" && admin !== "false")) {
            console.log("type : ", typeof admin)
            return res.status(400).send("Flag admin deve ser um booleano")
        }

        if (!nome) {
            return res.status(400).send("Insira o nome");
        }
        if (!email) {
            return res.status(400).send("Insira o email");
        }
        if (!senha) {
            return res.status(400).send("Insira a senha");
        }

        if (!!email && Usuario.isValidEmail(email) === false) {
            return res.status(400).send("Formato de email inválido")
        }

        let confirm = await NovoUsuario.notExistEmail(email);
        let registerSucess = await NovoUsuario.register(admin, nome, email, senha);

        if(!confirm) {
            return res.status(400).send("Email já existente");
        }

        if(!!confirm && !registerSucess){
            return res.status(500).send("Cadastro falhou");
        }
        res.json({sucess:true})
    },
    update: async function(req, res) {
        let {id, nome, senha} = req.body
        if (!nome && !senha) {
            return res.status(400).send("Insira o nome ou a senha");
        }
        let confirm = await NovoUsuario.updateUser(id, nome, senha)

        if(!confirm) {
            return res.status(400).send("Erro na alteracao dos dados");
        }
        res.json({sucess:true})
    }

}