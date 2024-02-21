import {create} from 'zustand';
import TodoStore from '../ToDoStore';

const useTodoStore = create(set => ({
  todos: TodoStore.getTodos(),
  setTodos: todos => set({todos}),
}));

export default useTodoStore;
