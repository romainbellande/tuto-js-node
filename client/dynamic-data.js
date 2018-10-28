(function() {
  const todoListEl = document.getElementById('dynamic-todo-list');

  const request = (url, method, options) => {
    return new Promise((resolve, reject) => {
      // get new XHR object
      var newXHR = new XMLHttpRequest();

      // bind our event listener to the "load" event.
      // "load" is fired when the response to our request is completed and without error.
      newXHR.addEventListener('load', function() {
        resolve(JSON.parse(this.response));
      });
      const serverUrl = 'http://127.0.0.1:3000';
      newXHR.open(method, serverUrl + url);

      // send it off!
      newXHR.send();
    });
  }

  const get = (url, options) => request(url, 'GET', options);

  const createTodo = todo => { // todo = { id: 1, name: 'whatever' }
    const todoEl = document.createElement('li');
    const text = document.createTextNode(todo.name);
    todoEl.setAttribute('class', 'list-group-item');
    todoEl.appendChild(text);
    todoListEl.appendChild(todoEl);
  }

  let todoList = [];

  get('/todos').then((res) => { // res = [{ id: '1', name: 'whatever' }]  , res =[] valeur par defaut
    if (res.length > 0) {
      todoList = res;
      todoList.map(createTodo);
    }
  });
})()
