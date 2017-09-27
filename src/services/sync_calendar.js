const moment = require('moment')
const axios = require('axios')
const xlsx = require('xlsx')

const CalendarRepository = require('../repositories/calendar')

const SHEET_URL = 'http://www.anbima.com.br/feriados/arqs/feriados_nacionais.xls'

async function downloadFile() {
    const response = await axios(SHEET_URL, { responseType: 'arraybuffer' })
    const data = new Uint8Array(response.data)
    const wb = xlsx.read(data, { type: 'array' })
    const sheet = wb.Sheets.Plan1

    xlsx.SSF.parse_date_code()
    return xlsx.utils.sheet_to_json(sheet)
}

function parseRows(rows) {
    const today = moment()

    const filterValidRows = row => row['Dia da Semana'] && row.Data
    const filterFutureHolidays = row => row.date > today
    const filterWeekendDays = row => ['sábado', 'domingo'].indexOf(row.weekDay) < 0
    
    const parseFMT14DateToMoment = FMT14Date => {
        const splittedDate = FMT14Date.split('/')
        splittedDate[2] = `20${splittedDate[2]}`
        return moment(new Date(splittedDate.join('/')))
    }

    const parseRow = row => ({ weekDay: row['Dia da Semana'], date: parseFMT14DateToMoment(row.Data) })
    const flatRow = row => ({ weekDay: row.weekDay, date: row.date.format('DD/MM/YYYY') })

    return rows
        .filter(filterValidRows)
        .map(parseRow)
        .filter(row => filterFutureHolidays(row) && filterWeekendDays(row))
        .map(flatRow)
}

async function sync(client) {
    console.log('Starting....')
    const calendarData = await downloadFile()
    
    console.log('Cleaning DB....')
    await CalendarRepository.cleanDB()

    console.log('Parsing rows....')
    const parsedRows = parseRows(calendarData)

    console.log('Inserting rows....')
    await CalendarRepository.bulkInsert(parsedRows)

    console.log('Finished....')
    return parsedRows
}

module.exports = sync