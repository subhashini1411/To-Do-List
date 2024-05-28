import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [ws, setWs] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTodoList(data.todo_list);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const addItem = () => {
    if (ws && newItem) {
      ws.send(JSON.stringify({ action: 'add', item: newItem }));
      setNewItem('');
    }
  };

  const removeItem = (item) => {
    if (ws) {
      ws.send(JSON.stringify({ action: 'remove', item: item }));
    }
  };
  const startEditItem = (item) => {
    setEditItem(item);
    setEditValue(item);
  };

  const updateItem = () => {
    if (ws && editItem && editValue) {
      ws.send(JSON.stringify({ action: 'update', oldItem: editItem, newItem: editValue }));
      setEditItem(null);
      setEditValue('');
    }
  };
  return (
    <div className='main-body'>
      <h1>To-Do List</h1>
      <ul>
        {todoList.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => startEditItem(item)}>Edit</button> <button onClick={() => removeItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
      {editItem ? (
        <div>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
          />
          <button onClick={updateItem}>Update</button>
          <button onClick={() => setEditItem(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="New item"
            autoFocus
          />
          <button onClick={addItem}>Add</button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
