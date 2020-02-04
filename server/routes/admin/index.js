const express = require('express')
const classify = require('inflection').classify

const router = express.Router({
  mergeParams: true
})

module.exports = app => {
  router.post('/', async (req, res) => {
    const document = await req.Model.create(req.body)
    res.send(document)
  })
  router.put('/:id', async (req, res) => {
    const document = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(document)
  })
  router.delete('/:id', async (req, res) => {
    const document = await req.Model.findByIdAndRemove(req.params.id)
    res.send(document)
  })
  router.get('/', async (req, res) => {
    const documents = await req.Model.find().setOptions({
      populate: req.Model.modelName === 'Category' ? 'parent' : undefined
    }).limit(10)
    res.send(documents)
  })
  router.get('/:id', async (req, res) => {
    const document = await req.Model.findById(req.params.id)
    res.send(document)
  })
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    req.Model = require(`./../../models/${classify(req.params.resource)}`)
    next()
  }, router)
}