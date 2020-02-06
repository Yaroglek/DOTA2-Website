const classify = require('inflection').classify

module.exports = options => async (req, res, next) => {
  req.Model = require(`./../models/${classify(req.params.resource)}`)
  next()
}