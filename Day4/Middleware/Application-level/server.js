const express = require("express");
var app = express();

// Một hàm không khai báo đường dẫn cụ thể do đó nó sẽ được thực hiện mỗi lần request.
app.use(function (req, res, next) {
  console.log("Time", Date.now());
  next();
});
// Dùng hàm use đến đường dẫn /user/:id . Hàm này sẽ được thực hiện mỗi khi request đến đường dẫn /user/:id.
// app.use("/user/:id", function (req, res, next) {
//   res.send("USER");
// });

// Khi muốn gọi một loạt các middleware cho một đường dẫn cụ thể ta có thể thực hiện như dưới đây:
app.use(
  "/user/:id",
  function (req, res, next) {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  function (req, res, next) {
    console.log("Request Type:", req.method);
    next();
  }
);

app.get("/user/:id", function (req, res) {
  res.send("USER");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// http://localhost:8000/user/123