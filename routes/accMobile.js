const fetch = require("node-fetch")
global.Headers = fetch.Headers

module.exports = function (io) {

    // ACC mobile
    // Comments feed
    const comments = io
        .of('/accMobile/comments')
        .on('connection', function (socket) {

            console.log(socket.handshake.query['foo'])
            console.log('client connected')

            // send client comments class
            socket.on('subscribe', () => {
                console.log('client subscribed')
                fetch("https://365proxy.azurewebsites.us/accMobile/comments?incidentID=" + socket.handshake.query['incidentID'], {
                        method: 'get',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + process.env.REACT_APP_365_API
                        })
                    })
                    .then(res => res.json())
                    .then(data => socket.emit('data', data))
            })

            // called from client when new data is posted to comments class, 365
            socket.on('update', () => {
                console.log('client updating')
                // broadcast new data to all clients
                fetch("https://365proxy.azurewebsites.us/accMobile/comments?incidentID=" + socket.handshake.query['incidentID'], {
                        method: 'get',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + process.env.REACT_APP_365_API
                        })
                    })
                    .then(res => res.json())
                    .then(data => comments.emit('data', data))
            })
        })
}