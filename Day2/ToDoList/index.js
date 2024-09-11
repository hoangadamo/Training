const express = require("express");
const app = express();

let todos = [];

app.use(express.json());

// Create
app.post("/create", (req, res) => {
  const { title } = req.body;
  const newTodo = { id: todos.length + 1, title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Read
app.get("/read", (req, res) => {
  res.json(todos);
  // app.use(express.json());
});

// Update
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (todo) {
    todo.title = title;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Delete
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  res.status(200).json({ message: "Delete sucessfully" });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
