const NovoUsuario = require('../models/NovaUsuario')

module.exports = {
    cadastro: async function(req, res) {
        let {admin, nome, email, senha} = req.body
        if (!admin) {
            return res.status(400).send("Insira a flag admin");
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

}