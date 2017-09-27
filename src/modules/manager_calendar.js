const moment = require('moment')
moment.locale('pt-BR')

const manager_calendar = {
  calendarData: (req) => {
    const data = {
      businessDays: manager_calendar.businessDays(req.to, req.from),
      totalDays: moment(req.from).diff(req.to, 'days'),
      fromDate: req.from,
      toDate: req.to
    }
    return data
  },
  businessDays: (toDate, fromDate) => {
    let totalDays = moment(fromDate).diff(toDate, 'days')
    return totalDays - manager_calendar.amountWeekends() - manager_calendar.amountHolidays()
  },
  amountHolidays: () => {
    return 1
  },
  amountWeekends: () => {
    return 2
  }
}

module.exports = manager_calendar