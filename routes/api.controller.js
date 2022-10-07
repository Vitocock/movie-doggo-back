const express = require('express')
require('dotenv').config({ path : "./server/.env"})

const apiServices = require('../services/api')

const apiRouter  = express.Router()

apiRouter.get('/getPopular/:mediaType/:timeWindow', async (req, res) => {
  const { mediaType, timeWindow } = req.params
  const resData = await apiServices.getPopular({ mediaType, timeWindow })
  res.json(resData).status(200)
})

module.exports = apiRouter