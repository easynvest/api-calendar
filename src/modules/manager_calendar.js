const moment = require('moment')
moment.locale('pt-BR')

const manager_calendar = {
  calendarData: (req) => {
    const data = {
      businessDays: 200,
      totalDays: moment(req.to).diff(req.from, 'days'),
      fromDate: req.from,
      toDate: req.to
    }
    return data
  },
  businessDays: (toDate, fromDate) => {
    let totalDays = moment(fromDate).diff(toDate, 'days')
    //return totalDays - manager_calendar.amountWeekends(fromDate, toDate) - manager_calendar.amountHolidays(fromDate, toDate)
  }
}

module.exports = manager_calendar