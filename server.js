const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
// const path = require ('path');
// path.join
const { join } = require('path');
const Todo = require('./todo.model');
const port = 3000;

// cors pour ecouter deux ports differrents sinon interdiction
app.use(cors());
app.use(bodyParser.json());

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.send(todos)
})

app.post('/todos', async (req, res) => {
  const myTodo = new Todo(req.body);
  const todoSaved = await myTodo.save();
  res.send(todoSaved);
});

app.get('/hello', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.info(`server running on http://localhost:${port}`);

})
