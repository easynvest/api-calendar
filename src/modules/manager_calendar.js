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
    let holiday = 1
    let initialDate = moment(fromDate, 'YYYY/MM/DD').format('MM/DD/YYYY')
    let finishDate = moment(toDate, 'YYYY/MM/DD').format('MM/DD/YYYY')
    let amountWeekends = manager_calendar.amountWeekends(`${finishDate}`, `${initialDate}`)

    return moment(fromDate).diff(toDate, 'days') - (amountWeekends + holiday)
  },
  amountWeekends: (fromDate,toDate ) => {
    var d0 = new Date(fromDate)
    var d1 = new Date(toDate)

    var ndays = 1 + Math.round((d1.getTime()-d0.getTime())/(24*3600*1000))
    var nsaturdays = Math.floor((d0.getDay() + ndays) / 7)
    return 2 * nsaturdays + (d0.getDay()==0) - (d1.getDay()==6)
  }
}

module.exports = manager_calendar