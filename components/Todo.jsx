import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { RiDeleteBin6Fill } from "react-icons/ri";

function Todo({ user }) {
  const [todos, setTodos] = useState([]);
  // const [listTodos, setListTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const newTodo = { title, description, completed: false };
    // setTodos([...todos, newTodo]);

    try {
      const ordersCollection = collection(db, "todos");
      const newDoc = await addDoc(ordersCollection, {
        title,
        note: description,
      });
    } catch (e) {
      console.warn("Error adding document: ", e);
    }
    setTitle("");
    setDescription("");
  };

  const getTodos = async () => {
    try {
      let arr = [];
      const querySnapshot = await getDocs(collection(db, "todos"));
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      await setTodos(arr);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [todos]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="max-w-lg mx-auto mt-4">
      <form onSubmit={handleSubmit}>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow mr-2 py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="flex-grow mr-2 py-2 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Note"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Todo
          </button>
        </div>
      </form>
      {todos.map((todo, index) => (
        <div
          className="bg-white rounded-lg shadow flex gap-5 items-center p-4 mb-4"
          key={index}
        >
          <p className="text-gray-600">{index + 1}</p>
          <h2 className="text-lg font-medium mb-2">{todo.title}</h2>
          <p className="text-gray-600">{todo.note}</p>

          <div
            className="rounded text-red-500 text-2xl cursor-pointer px-3 py-1"
            onClick={() => handleDelete(todo.id)}
          >
            <RiDeleteBin6Fill />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;
