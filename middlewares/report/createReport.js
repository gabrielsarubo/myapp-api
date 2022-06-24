const firebase = require('../../config/firebase')
const db = firebase.default.firestore()

/**
 * Criar um relatorio completo de um usuario
 * 
 * @param {*} userEmail ID do usuario no banco de dados
 * @returns um Array com o relatorio completo do usuario
 */
const createReport = async (userEmail) => {
  try {
    const userHistory = await _getUserHistoryAsync(userEmail)
    const answeredQuestions = await _bundleQuestionsAsync(userHistory)

    // Create user full report
    const fullUserReport = _createFullUserReport(userHistory, answeredQuestions)

    return fullUserReport
  } catch (error) {
    // console.error(error)
    throw new Error('Error when creating user full report')
  }
}

/**
 * Criar um relatorio completo
 * 
 * @param {Array} history histórico do usuario
 * @param {Object} questions uma lista com a copia das questoes respondidas pelo usuario
 * @returns um Array com o relatorio completo do usuario
 */
const _createFullUserReport = (history, questions) => {
  /**
   * @example reportEntry: {
   *  category: 'enPt',
   *  question: { text: 'the horse goes to the bank', level: 'hard' },
   *  userAnswer: 'o cavalo vai ao banco',
   *  isAnswerCorrect: true
   * }
   * @example fullReport: [ {reportEntry}, {...} ]
   */
  const fullReport = []

  // Percorrer o historico do usuario
  history.forEach(entry => {
    const reportEntry = {
      category: entry.categoryId,
      userAnswer: entry.userAnswer,
      isAnswerCorrect: entry.isAnswerCorrect,
      question: {},
    }

    // Recover the original question infos based on the question id
    const originalQuestion = questions[entry.categoryId.toString()][entry.questionId]
    reportEntry.question = {
      text: originalQuestion.palavra,
      level: originalQuestion.dificuldade,
    }

    fullReport.push(reportEntry)
  })

  return fullReport
}

/**
 * Retrieve a copy of all the questions answered by the user from a single Firestore collection
 * 
 * @param {Array} userHistory is an array of containing all the questions answered by a single user
 * @param {String} collectionId represents the id of a Firestore collection
 * @returns the questions the user answered
 */
const _getQuestionsFromCollectionAsync = async (userHistory, collectionId) => {
  // Creates an array of strings, each of which represents
  // the question id (aka doc id in a collection)
  const docsRef = []
  userHistory.forEach(entry => {
    docsRef.push(entry.questionId)
  })

  const snapshot = await db.collection(collectionId).where(firebase.default.firestore.FieldPath.documentId(), 'in', docsRef).get()
  if (snapshot.empty) {
    return null
  }

  const docs = snapshot.docs
  const questions = []
  docs.forEach(doc => {
    questions[doc.id] = { ...doc.data() }
  })

  return questions
}

/**
 * Recover the user history from Firestore async
 * It uses the user id to filter History entries that belongs to that user
 * 
 * @param {String} userEmail the user id
 * @returns an Array that represents the user history
 */
const _getUserHistoryAsync = async (userEmail) => {
  try {
    const historyRef = db.collection('history')
    const snapshot = await historyRef.where('userEmail', '==', userEmail).get()
    if (snapshot.empty) {
      console.log('No history entries for this user')
      return
    }

    const userHistory = []
    snapshot.forEach(doc => {
      userHistory.push({
        id: doc.id,
        ...doc.data()
      })
    })

    return userHistory
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Bundle all the questions answered by the user into a single Array
 * 
 * Make an aysnc call to Firestore to retrieve
 * the list of questions the user answered and save them in an Object property,
 * each of which represents the category of the questions and stores said questions
 */
const _bundleQuestionsAsync = async (userHistory) => {
  const questions = {
    classeGramatical: null,
    enPt: null,
    ptEn: null,
  }

  try {
    questions.enPt = await _getQuestionsFromCollectionAsync(userHistory, 'enPt')
    questions.ptEn = await _getQuestionsFromCollectionAsync(userHistory, 'ptEn')
    questions.classeGramatical = await _getQuestionsFromCollectionAsync(userHistory, 'classeGramatical')

    return questions
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = createReport
