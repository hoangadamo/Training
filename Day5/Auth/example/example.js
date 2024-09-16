const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();
app.use(bodyParser.json());

const users = [];

// Secret key for JWT
const SECRET_KEY = "12345";

// Register endpoint
app.post("/register", (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ username, password: hashedPassword });
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

// Login endpoint
app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password!" });
    }
    const token = jwt.sign({ id: user.username }, SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({ auth: true, user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

// Protected route
app.get("/me", (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Failed to authenticate token." });
      }
      res.status(200).send(decoded);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
