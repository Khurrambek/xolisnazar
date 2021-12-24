import React, { useContext, useState } from "react";
import adminhttp from "../../../../config/adminConfig";
import Context from "../Context";

const CreateTodo = () => {
  //Token
  const token = JSON.parse(localStorage.getItem("token"));

  //States
  const { setclickState, clickState, refresh, setRefresh } = useContext(Context);
  const [inputValue, setInputValue] = useState("");

  //get Input text value
  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };

  //submit new todo
  const submitHandler = (event) => {
    event.preventDefault();
      setclickState(!clickState);
      setRefresh(!refresh)
    setInputValue("");
  };

  //Post new todo to db
  const postTodo = async () => {
    return await adminhttp.post(
      "/postTodo",
      { title: inputValue },
      { headers: { "x-access-token": token } }
    );
  };

  return (
    <form
      className="todo-form d-flex align-items-center"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        name=""
        id=""
        className="form-control"
        value={inputValue}
        onChange={handleInputValue}
        placeholder="Type your task here ..."
      />
      <button onClick={postTodo} type="submit" className="btn btn-success ms-1">
        Create
      </button>
    </form>
  );
};

export default CreateTodo;
