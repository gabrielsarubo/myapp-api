const firebase = require('../../config/firebase')
const bd = firebase.default.firestore();

const classeGramatical = function (req, res, next) {
    bd.collection('classeGramatical').where('dificuldade', '==', `${req.body.dificuldade}`)
        .get()
        .then((docs) => {
            const perguntas = [];
            docs.forEach((doc) => { perguntas.push({data: doc.data(), id: doc.id}) });

            const id = Math.floor(Math.random() * docs.size);
            const pergunta = perguntas[id]

            const alt = ['substantivo', 'adjetivo', 'verbo', 'advérbio', 'preposição', 'conjunção', 'pronome', 'interjeição'];
            const respostas = alt.filter(item => item.includes(pergunta.resposta) !== true);
            const opcoes = gerarNumeros();

            const final = {
                id: pergunta.id,
                palavra: pergunta.data.palavra,
                resposta: pergunta.data.resposta,
                alternativas: [respostas[opcoes[0]], respostas[opcoes[1]], respostas[opcoes[2]]]
            }
            res.json(final);
        }).catch((error) => {
            console.log(error);
            res.status(400).send('Erro na geracao de pergunta');
        })
}

const gerarNumeros = function () {
    var arr = [];
    while (arr.length < 3) {
        var r = Math.floor(Math.random() * 6) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return (arr);
}

module.exports = classeGramatical;
