import React, { useContext, useEffect } from "react";
import adminConfig from "../../../../config/adminConfig";
import indexConfig from "../../../../config/indexConfig";
import Context from "../Context";
import "./todo.css";

const ToDo = (props) => {
  const { todo, onInputChange } = props;
  const { setRefresh, refresh } = useContext(Context);
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    indexConfig.get("/getAllTodo", { headers: { "x-access-token": token } });
  }, [refresh]);
  const deleteTodo = async () => {
    await adminConfig
      .delete(`/deleteTodo/${todo["_id"]}`, {
        headers: { "x-access-token": token },
      })
      .then(() => setRefresh(!refresh));
  };
  return (
    <div className="todo-item-wrapper">
      <ul className="todo-list">
        <li className={`todo-item ${todo.done ? "completed" : ""}`}>
          <label htmlFor="name" className="form-label">
            <input
              className="todo-check-input"
              type="checkbox"
              name="todo-check"
              id=""
              onChange={() => {
                onInputChange(todo["_id"], todo.done);
                deleteTodo();
              }}
              checked={todo.done}
            />
            {todo.title}
          </label>
        </li>
      </ul>
    </div>
  );
};

export default ToDo;
