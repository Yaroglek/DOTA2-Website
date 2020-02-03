const express = require('express')
const Category = require('./../../models/Category')

const router = express.Router()

module.exports = app => {
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  router.get('/categories', async (req, res) => {
    const lists = await Category.find().limit(10)
    res.send(lists)
  })
  app.use('/admin/api', router)
}