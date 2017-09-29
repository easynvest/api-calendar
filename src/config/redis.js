const redis = require('redis')
const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})

client.on('error', function (err) {
    console.log("Error " + err)
})

module.exports = client