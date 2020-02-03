const express = require('express')
const Category = require('./../../models/Category')

const router = express.Router()

module.exports = app => {
  router.post('/categories', async (req, res) => {
    const document = await Category.create(req.body)
    res.send(document)
  })
  router.put('/categories/:id', async (req, res) => {
    const document = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(document)
  })
  router.get('/categories', async (req, res) => {
    const documents = await Category.find().limit(10)
    res.send(documents)
  })
  router.get('/categories/:id', async (req, res) => {
    const document = await Category.findById(req.params.id)
    res.send(document)
  })
  app.use('/admin/api', router)
}