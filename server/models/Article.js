const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: ''
  },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }]
})

module.exports = mongoose.model('Article', schema)