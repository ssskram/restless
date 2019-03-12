var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const bodyParser = require('body-parser')
const cors = require('cors')

// import env variables
require('dotenv').config()

// body parser
app.use(bodyParser.json())

// enable cors on all requests
app.use(cors())

// logging
app.use(require('morgan')('combined'))

// endpoints
require('./routes/pghWorks')(io)

// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

var port = process.env.PORT || 3000
server.listen(port, () => {
  console.log('Server listening at port %d', port)
})