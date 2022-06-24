const firebase = require('../../config/firebase')
const bd = firebase.default.firestore();

const traducao = async (req, res, next) => {
    const { colecao, dificuldade } = req.body

    try {
        const colRef = bd.collection(colecao)
        const snapshot = await colRef.where('dificuldade', '==', dificuldade).get()

        const perguntas = [];
        snapshot.forEach(doc => {
            perguntas.push({
                // ...doc.data(),
                data: doc.data(),
                id: doc.id
            })
        })

        console.log(perguntas)

        // ERRO AO EXECUTAR O CODIGO ABAIXO
        // const id = Math.floor(Math.random() * snapshot.size);
        // const pergunta = perguntas[id]

        // // alternativas == copia das perguntas
        // const alt = [...perguntas]

        // const respostas = alt.filter(item => item.data.resposta.includes(pergunta.data.resposta) !== true)
        // const opcoes = gerarNumeros(snapshot.size - 1)
        // const final = {
        //     id: pergunta.id,
        //     palavra: pergunta.data.palavra,
        //     resposta: pergunta.data.resposta,
        //     alternativas: [respostas[opcoes[0]].data.resposta, respostas[opcoes[1]].data.resposta, respostas[opcoes[2]].data.resposta]
        // }

        // res.json(final)
        res.end()
    } catch (error) {
        console.log('Error fetching colletion in Firebase: ', error)
        res.end()
    }
}

const gerarNumeros = function (max) {
    var arr = [];
    while (arr.length < 3) {
        var r = Math.floor(Math.random() * max);
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return (arr);
}

module.exports = traducao;
