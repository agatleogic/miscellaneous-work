import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListTodos from "./ListTodos";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();


  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/addtodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      setDescription("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex m-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your list item"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          add
        </button>
      </form>
      <ListTodos />
    </div>
  );
};

export default InputTodo;
