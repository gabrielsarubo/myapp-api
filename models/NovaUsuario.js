const firebase = require('../config/firebase');
const bd = firebase.default.firestore();

module.exports = {
    notExistEmail: async function(email) {
        let datas = [];
        await bd.collection('users').where('email', '==', email )
        .get()
        .then((docs) => {
            docs.forEach((doc) => { datas.push({data: doc.data()}) })
        }).catch((error) => {
            console.log(error);
        })

        if( datas.length == 0 ) {
            return true;
        }
        return false;
    },

    register: async function(admin, nome, email, senha) {
        console.log("dados : ",admin, nome, email, senha)
        bd.collection("users").add({
            admin: admin,
            nome: nome,
            email: email,
            senha: senha
        })
        .then(() => {
            return true
        })
        .catch((error) => {
            console.log(error)
            return false
        });
    }
}