// Setup basic express server
var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const bodyParser = require('body-parser')
const fetch = require("node-fetch")
const cors = require('cors')
global.Headers = fetch.Headers

// import env variables
require('dotenv').config()

// body parser
app.use(bodyParser.json())

// enable cors on all requests
app.use(cors())

// logging
app.use(require('morgan')('combined'))

// PGH Works
// activity feed
var activity = io
  .of('/activity')
  .on('connection', function (socket) {
    // when client connects, send entirety of activity class, cartegraph
    fetch("https://cartegraphapi.azurewebsites.us/pghWorks/activity", {
        method: 'get',
        headers: new Headers({
          'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
        })
      })
      .then(res => res.json())
      .then(data => socket.emit('data', data))

    // called from client when new data is posted to activity class, cartegraph
    socket.on('update', () => {
      // broadcast new data to all users here
      fetch("https://cartegraphapi.azurewebsites.us/pghWorks/activity", {
          method: 'get',
          headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
          })
        })
        .then(res => res.json())
        .then(data => activity.emit('data', data))
    })
  })

// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})