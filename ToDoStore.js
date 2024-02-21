import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const saveTodos = todos => {
  storage.set('todos', JSON.stringify(todos));
};
const getTodos = () => {
  const todos = storage.getString('todos');
  return todos ? JSON.parse(todos) : [];
};
const updateTodos = updatedTodo => {
  let todos = getTodos();

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === updatedTodo.id) {
      todos[i].description = updatedTodo.description;
      todos[i].title = updatedTodo.title;
      break; // Stop searching once the entry is updated
    }
  }

  storage.set('todos', JSON.stringify(todos));
};

const TodoStore = {
  saveTodos,
  getTodos,
  updateTodos,
};

export default TodoStore;
