const express = require('express')
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token')
const cors = require('cors')
const http = require("http")
const socketIo = require("socket.io")
const server = http.createServer(app)
const fetch = require("node-fetch")
const checkToken = require('./token')
const io = socketIo(server)
global.Headers = fetch.Headers

// import env variables
require('dotenv').config()

// start express
var app = express()
app.set('port', process.env.PORT || 3000)

// docs
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// bearer token
app.use(bearerToken())

// body parser
app.use(bodyParser.json())

// enable cors on all requests
app.use(cors())

// logging
app.use(require('morgan')('combined'))

// socket
io.on("connection", socket => {
  //TODO: authorization
  () => sendData(socket)
  socket.on("disconnect", () => console.log("Client disconnected"))
})
const sendData = async socket => {
  try {
    // get endpoint here, return data
    socket.emit("fromAPI", res.data)
  } catch (err) {}
}

// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})