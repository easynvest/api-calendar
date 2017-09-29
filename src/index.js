require('dotenv').config()
const app = require('express')()

app.set('port', (process.env.PORT || 3000))
app.use('/calendar', require('./controllers/calendar'))
app.use('/sync', require('./controllers/sync'))

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'))
})