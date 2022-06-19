const firebase = require('../config/firebase');
const bd = firebase.default.firestore();

module.exports = {
    getByLogin: async function(email, senha) {
        let datas = [];
            await bd.collection('users').where('email', '==', email )
            .get()
            .then((docs) => {
                docs.forEach((doc) => { datas.push({data: doc.data(), id: doc.id}) })
            }).catch((error) => {
                console.log(error);
            })
            if (!!datas.length != 0 ){
                if (email == datas[0].data.email && senha == datas[0].data.senha) {
                    return { dados: datas[0].id , email: datas[0].data.email, nome: datas[0].data.nome}
                }
            }
        return null;
    },

    getByEmail: async function(email) {
        let datas = [];
        await bd.collection('users').where('email', '==', email )
        .get()
        .then((docs) => {
            docs.forEach((doc) => { datas.push({data: doc.data(), id: doc.id}) })
        }).catch((error) => {
            console.log(error);
        })
        return { dados: datas[0].id , email: datas[0].data.email, nome: datas[0].data.nome }
    },

    confirmAdmin: async function(usuario) {
        let datas = [];
        await bd.collection('users').where('email', '==', usuario.email )
        .get()
        .then((docs) => {
            docs.forEach((doc) => { datas.push({data: doc.data()}) })
        }).catch((error) => {
            console.log(error);
        })

        let admin = datas[0].data.admin
        return admin == true
    }

}