const express = require("express");
const app = express();

app.get("/error", (req, res) => {
  throw new Error("This is a deliberate error.");
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// http://localhost:8000/error