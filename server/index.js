const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

const SECRET_KEY = 'qw9kkm68f4as52f1fcas23v'

app.set('SECRET_KEY', SECRET_KEY)
app.get('SECRET_KEY')

app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}))
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

require('./plugins/db')(app)
require('./routes/admin')(app)

const server = app.listen(3000, () => {
  console.log(server.address())
})

