const NovoUsuario = require('../models/NovaUsuario')

module.exports = {
    cadastro: async function(req, res) {
        let {admin, nome, email, senha} = req.body

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