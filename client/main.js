const buttonSubmit = document.getElementById('submit');
const inputTodo = document.getElementById('input-todo');
const buttonSort = document.getElementById('sort');
const inputSearch = document.getElementById('input-search')
const todoList = [];

const updateTodoValue = (liEl, valueFromToDo) => ({ target: { value } }) => { // initialement -> event, event = { target: { value } }
  if (event.key === 'Enter') {
    const text = document.createTextNode(value);// event.target.value
    const textWrapper = document.createElement('span');
    textWrapper.appendChild(text); // type de l'élément saisie par l'utilisateur
    liEl.removeChild(liEl.children[0]);
    liEl.insertBefore(textWrapper, liEl.children[0]);
    const todoIndex = todoList.indexOf(valueFromToDo);
    todoList[todoIndex] = value;// event.target.value
  }
}

const getValueFromTodo = liEl => {
  return liEl.children[0].textContent;
}

const onEdit = liEl => () => {
  const valueFromToDo = getValueFromTodo(liEl);
  const editInputEl = document.createElement('input');
  editInputEl.setAttribute('type', 'text'); // type de l'élément saisie par l'utilisateur
  editInputEl.setAttribute('value', valueFromToDo);
  liEl.removeChild(liEl.children[0]);
  liEl.insertBefore(editInputEl, liEl.children[0]);
  editInputEl.addEventListener('keyup', updateTodoValue(liEl, valueFromToDo));
}

const createEditButtonTodo = liEl => {
  const editButtonEl = document.createElement('button');
  editButtonEl.setAttribute('type', 'button');
  const editTextEl = document.createTextNode('edit');
  editButtonEl.appendChild(editTextEl);
  editButtonEl.addEventListener('click', onEdit(liEl));
  return editButtonEl;
}

/** list item
 * <li>my todo</li>
 * il y a deux fonctions l'une à la suite de l'autre car cela permet
 * au addEventListener du bouton de suppression d'accéder à un prototype de fonction
 */
const onDelete = liEl => () => {
  const todoIndex = todoList.indexOf(getValueFromTodo(liEl));
  todoList.splice(todoIndex, 1);
  liEl.parentNode.removeChild(liEl);
}

const createTodoDeleteButton = liEl => {
  const deleteButtonEl = document.createElement('button');
  deleteButtonEl.setAttribute('type', 'button');
  const deleteText = document.createTextNode('delete');
  deleteButtonEl.appendChild(deleteText);
  deleteButtonEl.addEventListener('click', onDelete(liEl));

  return deleteButtonEl;
}

const createTodo = val => {
  const todoListEl = document.getElementById('todo-list');
  const todoEl = document.createElement('li');
  const text = document.createTextNode(val);

  const textWrapper = document.createElement('span');
  textWrapper.appendChild(text);

  todoEl.appendChild(textWrapper);
  const deleteButton = createTodoDeleteButton(todoEl);
  const editButton = createEditButtonTodo(todoEl);
  todoEl.appendChild(editButton);
  todoEl.appendChild(deleteButton);
  todoListEl.appendChild(todoEl);
}

//prototype = fonction () {} ou () => {}

const cleanTodolistEl = () => {
  const todoListEl = document.getElementById('todo-list');
  while(todoListEl.firstChild) {
    todoListEl.removeChild(todoListEl.firstChild);
  }
}

const sortedTodo = () => {
  cleanTodolistEl();
  todoList
  .sort((a, b) => a >= b ? 1 : 0) // ? corresponds au si  : sinon
  .map(createTodo); // prend une fonction en argument ; boucle sur la fonction
}

// renvoie true si la chaine de caractère "str" contient "value", sinon false

const search = list => ({ target: { value } }) => {
  cleanTodolistEl();
  list
    .filter(todoValue => todoValue.indexOf(value) !== -1)
    .map(createTodo);
}

const submitTodo = () => {
  if (inputTodo.value.length > 0) {
    todoList.push(inputTodo.value);
    createTodo(inputTodo.value);
    inputTodo.value = '';
  }
};

buttonSubmit.addEventListener('click', submitTodo);
buttonSort.addEventListener('click', sortedTodo)
inputSearch.addEventListener('keyup', search(todoList))
// function toto {
//   this.toto = "toto";

//   const test = function() {
//     console.log('toto', this.toto);
//   }

//   test.bind(this);
// }



// () => {

// }
