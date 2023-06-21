import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [allTodos, setAllTodos] = useState([]);
  const navigate = useNavigate();

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setAllTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [allTodos, navigate]);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todo/${id}`, {
        method: "DELETE",
      });
      const { message } = await response.json();
      alert(message);
      setAllTodos(allTodos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>List Todos</h1>
      <table className="table table-hover mt-5 text-center">
        <thead>
          <tr>
            <th>Descriptio</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allTodos.map((todos) => {
            return (
              <tr className="" key={todos.todo_id}>
                <td>{todos.description}</td>
                <td>
                  <EditTodo todo={todos}/>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todos.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
