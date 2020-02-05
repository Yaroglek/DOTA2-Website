const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false,
    set(value) {
      return bcrypt.hashSync(value)
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)