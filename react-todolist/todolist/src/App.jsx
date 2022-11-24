import { useState, useEffect,useMemo } from "react";
import reactLogo from "./assets/react.svg";
import TodoList from "./todoList";
import TodoFilter from "./todoFilter";
import useTodos from "./useTodos";
import "./App.css";

const STORAGE_KEY = "todomvc-react";
const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return todos;
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

function useFilter(todos) {
  const [visibility, setVisibility] = useState("all");
  // 如果todos或者`visibility`变化，我们将重新计算`filteredTodos`
  const filteredTodos = useMemo(() => {
    if (visibility === "all") {
      return todos;
    } else if (visibility === "active") {
      return todos.filter((todo) => todo.completed === false);
    } else {
      return todos.filter((todo) => todo.completed === true);
    }
  }, [todos, visibility]);
  return {visibility, setVisibility, filteredTodos}
}

function App() {
  const { todos, addTodo, removeTodo, updateTodo } = useTodos(
    todoStorage.fetch()
  );
  const {visibility, setVisibility, filteredTodos} = useFilter(todos)
  const [newTodo, setNewTodo] = useState("");
  const changeNewTodo = (e) => {
    setNewTodo(e.target.value);
  };
  useEffect(() => {
    todoStorage.save(todos);
  }, [todos]);

  const onAddTodo = (e) => {
    if (e.code === "Enter" && newTodo) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>我的待办事项</h1>
        <img src={reactLogo} className="logo" alt="logo" />
      </header>
      <main>
        <section className="todo-list">
          <div>
            <input
              className="new-todo"
              autoFocus
              autoComplete="off"
              placeholder="该学啥了?"
              value={newTodo}
              onChange={changeNewTodo}
              onKeyUp={onAddTodo}
            />
          </div>
          <h2>待办项</h2>
          <TodoList {...{ todos: filteredTodos, removeTodo, updateTodo }}></TodoList>
          <TodoFilter visibility={visibility} setVisibility={setVisibility}></TodoFilter>
          {/* <TodoList todos={todos} setTodos={setTodos}></TodoList> */}
        </section>
      </main>
    </div>
  );
}

export default App;
