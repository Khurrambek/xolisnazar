import React, { useEffect, useState } from "react";
import adminhttp from "../../../config/adminConfig";
import "./todoList.css";
import TodoListItems from "./TodoListItem/TodoListItems";
import Context from "./Context";
import CreateTodo from "./CreateTodo/CreateTodo";
import { AiOutlinePlusCircle } from "react-icons/ai";

const TodoList = () => {
  //token
  let token = JSON.parse(localStorage.getItem("token"));
  const [refresh, setRefresh] = useState(false);
  const [todoData, setTodoData] = useState([]);
  const [clickState, setclickState] = useState(true);
  const [todoDeleteId, setTodoDeleteId] = useState("");

  useEffect(() => {
    adminhttp
      .get("/getAllTodos", { headers: { "x-access-token": token } })
      .then((res) => setTodoData(res.data.todos));
    return () => {
      setTodoData([]);
    };
  }, [refresh]);

  const toggleTodoData = async (id, done) => {
    await adminhttp.put(
      `/updateTodo/${id}`,
      { done: !done },
      { headers: { "x-access-token": token } }
    );
  };

  const plusClickHandler = () => {
    setclickState(!clickState);
  };
  return (
    <Context.Provider
      value={{
        setclickState,
        clickState,
        setRefresh,
        refresh,
        setTodoDeleteId,
        todoDeleteId,
      }}
    >
      <div className="todo-list-wrapper">
        <header className="header">
          <h5>Qilinadigan ishlar ro'yhati.</h5>
          {clickState ? (
            <h3 className="plus-style" onClick={plusClickHandler}>
              <AiOutlinePlusCircle />{" "}
            </h3>
          ) : (
            <CreateTodo />
          )}
        </header>
        {todoData.length ? (
          <TodoListItems todoData={todoData} onDataChange={toggleTodoData} />
        ) : (
          <p className="px-3">Hamma ishlarni yakunlab bo'lgansiz!</p>
        )}
      </div>
    </Context.Provider>
  );
};

export default TodoList;
