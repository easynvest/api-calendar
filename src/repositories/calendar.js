const client = require('../config/redis')

module.exports = {
    bulkInsert: holidays => {
        holidays.forEach(holiday => client.set(holiday.date, holiday.weekDay))
    },
    cleanDB: () => {
        return new Promise((resolve, reject) => {
            client.flushdb((err) => {
                if(err) reject(err)
                resolve()
            })
        })
    },
    list: () => {
        return new Promise((resolve, reject) => {
            client.keys('*', (err, data) => {
                if(err) reject(err)
                resolve(data)
            })
        })
    }
}