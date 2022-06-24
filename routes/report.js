const express = require('express');
const router = express.Router();

// Middlewares
const createReport = require('../middlewares/report/createReport')

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

module.exports = router
