const firebase = require('../../config/firebase')
const bd = firebase.default.firestore();

const newWord = function (req, res, next) {
    if (!req.body.colecao && !req.body.dificuldade && !req.body.palavra && !req.body.resposta) {
        return res.status(400).send("Nenhuma das informações foram inseridas, insira coleção, dificuldade, palavra e resposta");
    }

    if (!req.body.colecao) {
        return res.status(400).send("Insira uma colecao");
    }
    if (!!req.body.colecao && (req.body.colecao !== "ptEn" && req.body.colecao !== "classeGramatical" && req.body.colecao !== "enPt")) {
        return res.status(400).send("Essa coleção não existe. Insira na coleção 'ptEn', 'enPt' ou 'classeGramatical'")
    }

    if (!req.body.dificuldade) {
        return res.status(400).send("Insira a dificuldade");
    }
    if (!!req.body.dificuldade && (req.body.dificuldade !== "facil" && req.body.dificuldade !== "dificil")) {
        return res.status(400).send("Essa dificuldade não existe. Insira dificuldade 'facil' ou 'dificil' (sem acento).")
    }

    if (!req.body.palavra) {
        return res.status(400).send("Insira uma palavra");
    }
    if (!req.body.resposta) {
        return res.status(400).send("Insira a resposta");
    }
    bd.collection(`${req.body.colecao}`).add({
        dificuldade: req.body.dificuldade,
        palavra: req.body.palavra,
        resposta: req.body.resposta,
    }).then((doc) => {
        res.send('Palavra cadastrada com sucesso!')
    })
        .catch((error) => {
            console.log(error);
            res.status(400).send('Erro no cadastro');
        })
}

module.exports = newWord;
