// require the dependencies we installed
var app = require('express')();
var responseTime = require('response-time')
var axios = require('axios');
var redis = require('redis');

// create a new redis client and connect to our local redis instance
var client = redis.createClient();

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});

app.set('port', (process.env.PORT || 3000));

app.use('/foo', require('./controllers/foo'))

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});