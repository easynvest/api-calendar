const redis = require('redis')
const client = redis.createClient({
    host: 'redis-10559.c15.us-east-1-4.ec2.cloud.redislabs.com',
    port: 10559
})

client.on('error', function (err) {
    console.log("Error " + err)
})

module.exports = client