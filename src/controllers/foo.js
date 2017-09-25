const express = require('express')
const app = express()

app.get('/bar', (req, res) => {
    res.send('fooobar')
})

module.exports = app