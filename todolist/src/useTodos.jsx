import { useState } from "react";
// 接收初始数据，将其声明为状态，同时提供状态操作方法给外界使用
export default function useTodos(data) {
  const [todos, setTodos] = useState(data);
  const addTodo = (title) => {
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        title,
        completed: false,
      },
    ]);
  };
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const updateTodo = (editedTodo) => {
    const todo = todos.find((todo) => todo.id === editedTodo.id);
    Object.assign(todo, editedTodo);
    setTodos([...todos]);
  };
  return { todos, addTodo, removeTodo, updateTodo };
}
