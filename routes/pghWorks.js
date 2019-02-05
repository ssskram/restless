const fetch = require("node-fetch")
global.Headers = fetch.Headers

module.exports = function (io) {

    // PGH Works
    // activity feed
    const activity = io
        .of('/pghWorks/activity')
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
}