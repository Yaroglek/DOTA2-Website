const mongoose = require('mongoose')

module.exports = app => {
  mongoose.connect('mongodb://localhost:27017/hokw', {
    user: 'root',
    pass: 'TOOR',
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  mongoose.connection.on('open', () => {
    console.log('数据库已连接')
  })
  mongoose.connection.on('error', info => {
    console.error('数据库连接失败', info)
  })
}