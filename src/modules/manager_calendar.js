const moment = require('moment')

const manager_calendar = {
  calendarData: (req) => {
    const data = {
      businessDays: manager_calendar.businessDays(req.to, req.from),
      totalDays: moment(req.to).diff(req.from, 'days'),
      fromDate: req.from,
      toDate: req.to
    }
    return data
  },
  businessDays: (fromDate, toDate) => {
    let amountHoliday = manager_calendar.amountHolidays()
    let initialDate = moment(fromDate, 'YYYY/MM/DD').format('MM/DD/YYYY')
    let finishDate = moment(toDate, 'YYYY/MM/DD').format('MM/DD/YYYY')
    let amountWeekends = manager_calendar.amountWeekends(`${finishDate}`, `${initialDate}`)
    let calcBusinessDays = moment(fromDate).diff(toDate, 'days') - (amountWeekends + amountHoliday)

    if(calcBusinessDays === null || calcBusinessDays < 0) {
      return 0
    } else {
      return calcBusinessDays
    }
    
  },
  amountWeekends: (fromDate,toDate ) => {
    let initialDate = new Date(fromDate)
    let finishDate = new Date(toDate)

    let ndays = 1 + Math.round((finishDate.getTime()-initialDate.getTime())/(24*3600*1000))
    let nsaturdays = Math.floor((initialDate.getDay() + ndays) / 7)

    const weekends = 2 * nsaturdays + (initialDate.getDay()==0) - (finishDate.getDay()==6)

    return weekends
  },
  amountHolidays: () => {
    return 6
  }
}

module.exports = manager_calendar