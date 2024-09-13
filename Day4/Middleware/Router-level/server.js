const express = require("express");
const app = express();
const router = express.Router();

// Middleware cấp router
router.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

// Định nghĩa một route trong router
router.get("/user/:id", (req, res, next) => {
  res.send("User Info");
});

// Sử dụng router trong ứng dụng Express
app.use("/api", router);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// http://localhost:8000/api/user/123
