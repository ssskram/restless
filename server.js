// Setup basic express server
var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var port = process.env.PORT || 3000

var activity = io
  .of('/activity')
  .on('connection', function (socket) {
    // when client connects, send entirety of activity class, Cartegraph
    // GET here
    // return data
    socket.emit('data', 'activity data coming your way')

    // called from client when new data is posted to activity class, cartegraph
    socket.on('update', () => {
      console.log('update')
      // GET here
      // broadcast new data to all users here
      activity.emit('data', 'activity data coming your way')
    })
  })

server.listen(port, () => {
  console.log('Server listening at port %d', port)
})