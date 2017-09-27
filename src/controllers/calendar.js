const express = require('express')
const managercalendar = require('../modules/manager_calendar')

const app = express()

app.get('/', (req, res) => {
  let calendarData = managercalendar.calendarData(req.query)
  res.status(200).json(calendarData)
})

module.exports = app