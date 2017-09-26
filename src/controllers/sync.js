const express = require('express')
const app = express()

const syncCalendar = require('../services/sync_calendar')
const calendarRepository = require('../repositories/calendar')

app.post('/', async (req, res) => {
    const calendarData = await syncCalendar(req.redisClient)
    res.send(calendarData)
})

app.get('/', async (req, res) => {
    res.send(await calendarRepository.list())
})

module.exports = app
