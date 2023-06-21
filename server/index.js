const express = require("express");
const cors = require("cors");
const client = require("./db");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a todo
app.post("/addtodo", async (req, res) => {
  const { description } = req.body;
  console.log(description)
  try {
    const newTodo = await client.query(
      `INSERT INTO todolist (description) VALUES($1) RETURNING *`,
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await client.query("SELECT * FROM public.todolist");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo
app.get("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleTodo = await client.query(
      "SELECT * FROM public.todolist WHERE todo_id = $1",
      [id]
    );
    res.json(singleTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//update a todo
app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const todo = await client.query(
      "UPDATE public.todolist SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json({ message: "todo updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

//delete a todo
app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await client.query(
      "DELETE FROM public.todolist WHERE todo_id = $1",
      [id]
    );
    res.json({ message: "todo deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log(`server has started on port 5000`);
});
