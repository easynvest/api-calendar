const csv = require('fast-csv')
const moment = require('moment')
const path = require('path')
const fs = require('fs')

const CalendarRepository = require('../repositories/calendar')

const SHEET_PATH = path.resolve('feriados_nacionais.csv')

function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(SHEET_PATH, (err, data) => {
            try {
                const rows = []
                csv.fromString(data.toString(), {
                    headers: true,
                    delimiter: ';'
                })
                .on('data', row => rows.push(row))
                .on('end', () => resolve(rows))
            } catch (error) {
                reject(err)
            }
        })
    })
}

function parseRows(rows) {
    const today = moment()
    const updatedDates = rows
        .map(row => ({ weekDay: row['Dia da Semana'], date: moment(row.Data, 'DD/MM/YY') }))
        .filter(row => row.date > today)
        .filter(row => ['sábado', 'domingo'].indexOf(row.weekDay) < 0)
        .map(row => ({ weekDay: row.weekDay, date: row.date.format('DD/MM/YYYY') }))

    return updatedDates
}

async function sync(client) {
    const calendarData = await readFile()

    await CalendarRepository.cleanDB()
    const parsedRows = parseRows(calendarData)
    CalendarRepository.bulkInsert(parsedRows)

    return parsedRows
}

module.exports = sync