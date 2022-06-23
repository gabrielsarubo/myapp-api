const firebase = require('../../config/firebase')
const db = firebase.default.firestore();

const multipleEntries = async (req, res) => {
    const respostas = req.body.respostas
    let erro = false
    if (Array.isArray(respostas)) {
        if (respostas.length > 0) {
            respostas.forEach(resp => {
                if (!resp.categoryId || !resp.questionId || !resp.userEmail || !resp.userAnswer || !(typeof resp.isAnswerCorrect === 'boolean')) {
                    res.status(400).send('Erro no cadastro das respostas, verifique se todos os campos estao preenchidos!')
                    erro = true;
                }
            })
        } else {
            res.status(400).send('Erro no cadastro das respostas, o array enviado esta vazio!')
        }
    } else {
        res.status(400).send('Erro no cadastro das respostas, as respostas devem ser enviadas em um array!')
    }
    if (erro == false) {
        respostas.forEach((resp) => {
            db.collection('history').add({
                categoryId: resp.categoryId,
                questionId: resp.questionId,
                userEmail: resp.userEmail,
                userAnswer: resp.userAnswer,
                isAnswerCorrect: resp.isAnswerCorrect
            }).then(() => {
                console.log('Resposta salva!')
            }
            ).catch((err) => {
                console.log(err);
            })
        })
        res.send('Respostas salvas com sucesso!')
    }
}

module.exports = multipleEntries
