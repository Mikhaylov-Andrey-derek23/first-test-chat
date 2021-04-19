const ws = require('ws');

const wsServer = new ws.Server({
    port : 5000
}, ()=> console.log('Server is running in port 5000'));

wsServer.on('connection', function connection(ws){
    ws.on('message', function(message){
        message = JSON.parse(message);
        switch(message.event){
            case "conection":
                broadcastMessage(message)
            break;
            case "message":
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessage(message) {
    wsServer.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}





