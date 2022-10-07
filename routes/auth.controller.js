const express = require('express')
const { register, login } = require('../auth/auth')

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
  const { body } = req

  try {
    const data = JSON.parse(body)
    const { success, message } = await register(data)
    if (!success) throw message

    res.send(message).status(200)
  } catch (e) {
    res.status(500).send(e)
  }
})


authRouter.post('/login', async (req, res) => {
  const { body } = req

  try {
    const data = JSON.parse(body)
    const { success, message } = await login(data)
    if (!success) throw message

    res.send(message).status(200)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = authRouter