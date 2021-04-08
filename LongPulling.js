const express = require('express');
const cors = require('cors');
const events = require('events');

const PORT = 5000;

const emmitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.options('*', cors());

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