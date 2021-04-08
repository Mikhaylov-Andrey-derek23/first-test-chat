const express = require('express');
const cors = require('cors');
const events = require('events');

const PORT = 5000;

const emmitter = new events.EventEmitter();

const app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

app.use(express.json());

app.get('/get-messages', (req, res)=>{
    emmitter.once('newMessage', (message)=>{
        res.json(message)
    })
})

app.post('/new-message', (req, res)=>{
    const message = req.body;
    emmitter.emit('newMessage', message)
    res.status(200);

})

app.listen(PORT, () => {
    console.log(`Server running om porter ${PORT}`)
})