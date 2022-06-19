const firebase = require('../config/firebase');
const bd = firebase.default.firestore();

module.exports = {
    notExistEmail: async function (email) {
        let datas = [];
        await bd.collection('users').where('email', '==', email)
            .get()
            .then((docs) => {
                docs.forEach((doc) => { datas.push({ data: doc.data() }) })
            }).catch((error) => {
                console.log(error);
            })

        if (datas.length == 0) {
            return true;
        }
        return false;
    },

    register: async function (admin, nome, email, senha) {
        console.log("dados : ", admin, nome, email, senha)
        let sucesso;
        await bd.collection("users").add({
            admin: admin,
            nome: nome,
            email: email,
            senha: senha
        })
            .then(() => {
                console.log("sucesso do cadastro no banco de dados")
                sucesso = true
            })
            .catch((error) => {
                console.log(error)
            });

        if (sucesso == true) {
            return true
        }

        return false
    },
    updateUser: async function (id, nome, senha) {
        var documento = bd.collection('users').doc(id);

        if (nome && senha) {
            return documento.update({
                nome: nome,
                senha: senha
            }).then(() => {
                return true
            }).catch((err) => {
                console.error(err)
                return false
            })
        }
        if (nome) {
            console.log('passei aqui')
            return documento.update({
                nome: nome,
            }).then(() => {
                return true
            }).catch((err) => {
                console.error(err)
                return false
            })
        }
        if (senha) {
            return documento.update({
                senha: senha
            }).then(() => {
                return true
            }).catch((err) => {
                console.error(err)
                return false
            })
        }

    }
}