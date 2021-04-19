const ws = require('ws');

const wsServer = new ws.Server({
    port : 5000
}, ()=> console.log('Server is running in port 5000'));

wsServer.on('connection', function connection(ws){
    ws.on('message', function(message){
        message = JSON.parse(message);
        console.log(message);
    })
})





