const express = require('express')
const connectdb = require('./db')
const app=express();
const bodyParser = require('body-parser')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
require('dotenv').config()
connectdb();
app.use('/',require('./routes/taskRoutes'));
app.use('/user',require('./routes/userRoutes'));

app.listen(5000, () => {
    console.log('serving on port 5000....');
  })
  