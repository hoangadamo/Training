const express = require("express");
const app = express();

let todos = [];

app.use(express.json());

// Create
app.post("/create", (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = { id: todos.length + 1, title };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

// Read
// Get all
app.get("/read", (req, res) => {
  try {
    res.json(todos);
  } catch (error) {
    res.status(500).json("Server error");
  }
});
// Get by ID
app.get("/read/:id", (req, res) => {
  try {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (!todo) {
      res.status(400).json("invalid id");
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

// Update
app.put("/update/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (todo) {
      todo.title = title;
      res.json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json("Server error");
  }
});

// Delete
app.delete("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    todos = todos.filter((todo) => todo.id !== parseInt(id));
    res.status(200).json({ message: "Delete sucessfully" });
  } catch (error) {
    res.status(500).json("Server error");
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
