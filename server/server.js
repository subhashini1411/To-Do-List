const express = require('express')
const connectdb = require('./db')
const ws=require("ws");
const app=express();
const bodyParser = require('body-parser')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
require('dotenv').config();
connectdb();

const server=app.listen(5000, () => {
    console.log('serving on port 5000....');
  })

  
const wss=new ws.Server({server});
let todoList=["buymilk"];
wss.on('connection', (ws) => {
  // Send the current to-do list to the newly connected client
  ws.send(JSON.stringify({ todo_list: todoList }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.action === 'add') {
      // Add item to the to-do list
      todoList.push(data.item);
    } else if (data.action === 'remove') {
      // Remove item from the to-do list
      todoList = todoList.filter(item => item !== data.item);
    } else if (data.action === 'update') {
      // Update item in the to-do list
      const index = todoList.findIndex(item => item === data.oldItem);
      if (index !== -1) {
        todoList[index] = data.newItem;
      }
    }

    // Send the updated to-do list to all connected clients
    const response = JSON.stringify({ todo_list: todoList });
    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(response);
      }
    });
  });
});
