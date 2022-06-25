const express = require('express');
const router = express.Router();

// Middlewares
const createReport = require('../middlewares/report/createReport')
const createPerformanceReport = require('../middlewares/report/createPerformanceReport');

router.get('/:userEmail', async (req, res) => {
  const { userEmail } = req.params

  try {
    const fullUserReport = await createReport(userEmail)

    res.json(fullUserReport)
  } catch (error) {
    // console.error(error)
    res.status(400).send('Error on trying to recover history from user')
  }
})

/**
 * Esta rota espera por dois IDs de usuarios diferentes
 * e gera um relatorio de desempenho dos dois usuarios com base em seus historicos
 * 
 * Responde com um objeto contendo um relatorio com o desempenho de ambos os usuarios
 */
router.get('/:userA/:userB', async (req, res) => {
  const { userA, userB } = req.params
  
  try {
    const userAPerformance = await createPerformanceReport(userA)
    const userBPerformance = await createPerformanceReport(userB)

    const usersPerformances = {
      userAPerformance,
      userBPerformance,
    }
    
    res.json(usersPerformances)
  } catch (error) {
    res.status(400).send('Error when creating the users performance reports: ' + error)
  }
})

module.exports = router
