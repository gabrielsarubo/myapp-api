const firebase = require('../../config/firebase')
const bd = firebase.default.firestore();

const traducao = function (req, res, next) {
    bd.collection(`${req.body.colecao}`).where('dificuldade', '==', `${req.body.dificuldade}`)
        .get()
        .then((docs) => {
            const perguntas = [];
            docs.forEach((doc) => { perguntas.push({data: doc.data(), id: doc.id}) });

            const id = Math.floor(Math.random() * docs.size);
            const pergunta = perguntas[id]

            const alt = perguntas;
            const respostas = alt.filter(item => item.data.resposta.includes(pergunta.data.resposta) !== true);
            const opcoes = gerarNumeros(docs.size-1);
            const final = {
                id: pergunta.id,
                palavra: pergunta.data.palavra,
                resposta: pergunta.data.resposta,
                alternativas: [respostas[opcoes[0]].data.resposta, respostas[opcoes[1]].data.resposta, respostas[opcoes[2]].data.resposta]
            }
            res.json(final);
        }).catch((error) => {
            console.log(error);
            res.status(400).send('Erro na geracao de pergunta');
        })
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
