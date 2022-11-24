import { useState, useEffect } from "react";

const TodoList = ({ todos, removeTodo, updateTodo }) => {
    
  const initial = {
    title: "",
    completed: false,
  };
  const [editedTodo, setEditedTodo] = useState(initial);
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  useEffect(() => {
    // 如果editedTodo存在则设置焦点
    if (editedTodo.id) {
      inputRef.focus();
    }
  }, [editedTodo]);

  // 控制用户输入过程中表单发生的操作
  // 调用updateTodo更新
  const changeState = (e, currentTodo) => {
    currentTodo.completed = e.target.checked;
    updateTodo(currentTodo);
  };

  const removeOnTodo = (todo) => {
    removeTodo(todo.id);
  };

  
  // 用户双击触发编辑模式
  const editTodo = (todo) => {
    // 克隆一个todo用于编辑
    setEditedTodo({ ...todo });
  };
  // 受控组件要求的事件处理
  const onEditing = (e) => {
    const title = e.target.value;
    if (title) {
      setEditedTodo({ ...editedTodo, title });
    } else {
      // 调用removeTodo执行删除
      removeTodo(editedTodo.id);
    }
  };
  const onEdited = (e) => {
    if (e.code === "Enter") {
      if (editedTodo.title) {
        // 调用updateTodo执行更新
        updateTodo(editedTodo);
      }
      setEditedTodo(initial);
    }
  };
  const cancelEdit = (e) => {
    setEditedTodo(initial);
  };

  let inputRef = null;
  const setEditInputRef = (e, todo) => {
    if (editedTodo.id === todo.id) {
      inputRef = e;
    }
  };

  return (
    <ul className="todo-list">
      {todos.length > 0 &&
        todos.map((todo) => {
          return (
            <li
              className={[
                "todo",
                todo.completed ? "completed" : "",
                editedTodo.title && editedTodo.id === todo.id ? "editing" : "",
              ].join(" ")}
              key={todo.id.toString()}
            >
              
              {/* 双击开启行内编辑：隐藏.view，显示.edit */}
              <div className="view">
                <span onDoubleClick={() => editTodo(todo)}>{todo.title}</span>
                <button className="destroy" onClick={() => removeOnTodo(todo)}>
                  x
                </button>
              </div>
              {/* 声明editedTodo状态, onChange处理状态变化 */}
              {/* onKeyUp处理修改确认，onBlur退出编辑模式 */}
              {/* 设置一个函数到ref，根据上下文中todo的情况动态设置期望的input元素 */}
              <input
                className="edit"
                type="text"
                value={editedTodo.title}
                onChange={onEditing}
                onKeyUp={onEdited}
                onBlur={cancelEdit}
                ref={(e) => setEditInputRef(e, todo)}
              />
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => changeState(e, todo)}
              />
              
            </li>
          );
        })}
    </ul>
  );
};

export default TodoList;
