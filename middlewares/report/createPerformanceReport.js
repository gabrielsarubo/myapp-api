const createReport = require('./createReport')

/** 
 * @param {String} uid ID do usuario, e.g. email, ID gerado pelo BD, etc
 */
const createPerformanceReport = async (uid) => {
  try {
    const userReport = await createReport(uid)
    const summarizedReport = _generateSummarizedReport(userReport)

    return summarizedReport
  } catch (error) {
    throw new Error('Erro ao criar relatorio de desempenho do usuario: ' + error)
  }
}

const _generateSummarizedReport = (fullReport) => {
  let correctEasy = 0
  let incorrectEasy = 0
  let correctHard = 0
  let incorrectHard = 0

  fullReport.forEach(entry => {
    if (entry.isAnswerCorrect) {
      if (entry.question.level === 'facil') {
        correctEasy++
      } else {
        correctHard++
      }
    } else {
      if (entry.question.level === 'facil') {
        incorrectEasy++
      } else {
        incorrectHard++
      }
    }
  })

  const summary = {
    total: fullReport.length,
    correctEasy,
    incorrectEasy,
    correctHard,
    incorrectHard
  }

  return summary
}

module.exports = createPerformanceReport
