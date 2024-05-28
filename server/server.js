const express = require('express')
const connectdb = require('./db')
const bodyParser = require('body-parser');
const {WebSocketServer}= require('ws');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
require('dotenv').config();
connectdb();

app.use('/', require('./routes/taskRoutes'));
app.use('/user', require('./routes/userRoutes'));

const server= app.listen(5000, () => {
  console.log('serving on port 5000....');
});

const wss= new WebSocketServer({server});
wss.on('connection', (ws)=> {
  ws.on('message', (data)=> {
    console.log('this is data from client %s', data);
    ws.send('thanks buddy!!');
  })
})