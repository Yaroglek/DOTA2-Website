const express = require('express')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcrypt-nodejs')
const jsonwebtoken = require('jsonwebtoken')
const assert = require('http-assert')
const AdminUser = require('./../../models/AdminUser')
const authMiddleware = require('./../../middleware/auth')()
const resourceMiddleware = require('./../../middleware/resource')()

const router = express.Router({
  mergeParams: true
})

const upload = multer({
  dest: path.join(__dirname, '..', '..', 'uploads')
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
    const options = {}
    switch (req.Model.modelName) {
      case 'Category':
        options.populate = 'parent'
        break
      case 'Article':
        options.populate = 'categories'
        break
      default:
        break
    }
    const documents = await req.Model.find().setOptions(options).limit(10)
    res.send(documents)
  })
  router.get('/:id', async (req, res) => {
    const document = await req.Model.findById(req.params.id)
    res.send(document)
  })
  app.use('/admin/api/rest/:resource', authMiddleware, resourceMiddleware, router)

  app.post('/admin/api/upload', authMiddleware, upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const adminUser = await AdminUser.findOne({
      username: req.body.username
    }).select('+password')
    assert(adminUser && bcrypt.compareSync(req.body.password, adminUser.password), 422, '用户名或密码错误')
    const token = jsonwebtoken.sign({
      id: adminUser._id
    }, app.get('SECRET_KEY'))
    res.send({
      adminUser: {
        username: adminUser.username
      },
      token,
      message: '登录成功'
    })
  })
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}