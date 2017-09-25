const express = require('express')
const app = express()

app.use('/foo', require('./controllers/foo'))

app.listen(3000)