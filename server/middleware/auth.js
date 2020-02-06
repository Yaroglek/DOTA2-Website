const jsonwebtoken = require('jsonwebtoken')
const assert = require('http-assert')
const AdminUser = require('./../models/AdminUser')

module.exports = options => async (req, res, next) => {
  const token = (req.headers.authorization || '').split(' ').pop()
  assert(token && await AdminUser.findById(jsonwebtoken.verify(token, req.app.get('SECRET_KEY')).id), 401, '请先登录')
  next()
}