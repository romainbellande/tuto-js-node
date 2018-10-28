const db = require('./db');

const Todo = db.model('Todo', { name: String });

module.exports = Todo;
