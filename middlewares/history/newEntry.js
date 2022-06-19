const firebase = require('../../config/firebase')
const db = firebase.default.firestore();

/**
 * Creates a new history entry (document)
 * in the collections 'history' in Firestore
 * 
 * Expects the following data from the request body:
 * - categoryId: eg. 'classegramatical', 'traducaoPtEn'
 * - questionId: id that represents the question from that category
 * - userEmail: the email of the user that answered the question
 * - userAnswer: the answer given by the user
 * - isAnswerCorrect: true || false
 */
const newEntry = async (req, res) => {
  const {
    categoryId,
    questionId,
    userEmail,
    userAnswer,
    isAnswerCorrect
  } = req.body

  // Create a new history entry object to be sent to the DB
  const historyEntry = {
    categoryId,
    questionId,
    userEmail,
    userAnswer,
    isAnswerCorrect
  }

  // Make async call to Firestore to add a new document
  try {
    const docRef = await db.collection('history').add(historyEntry)
    // console.log('New history entry written with ID: ', docRef.id)
    res.end()
  } catch (error) {
    // console.error(error)
    res.status(400).send('Failed to create new history entry')
  }
}

module.exports = newEntry
