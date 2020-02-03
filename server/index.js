const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}))
app.use(express.json())

require('./plugins/db')(app)
require('./routes/admin')(app)

const server = app.listen(3000, () => {
  console.log(server.address())
})

