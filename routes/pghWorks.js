const fetch = require("node-fetch")
global.Headers = fetch.Headers

module.exports = function (io) {

    // PGH Works
    // activity feed
    const activity = io
        .of('/pghWorks/activity')
        .on('connection', function (socket) {

            console.log('client connected')

            // send client activity class
            socket.on('subscribe', () => {
                console.log('client subscribed')
                fetch("https://cartegraphapi.azurewebsites.us/pghWorks/activity", {
                        method: 'get',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
                        })
                    })
                    .then(res => res.json())
                    .then(data => socket.emit('data', data))
            })

            // called from client when new data is posted to activity class, cartegraph
            socket.on('update', () => {
                console.log('client updating')
                // broadcast new data to all clients
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
}