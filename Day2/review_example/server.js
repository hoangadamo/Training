// require express
var express = require("express");
// khoi tao express
var app = express();
// Tao hanh dong cho url
app.get("/", function (req, res) {
  res.send("hello world!");
});
// Router GET method
app.get("/hello", function (req, res) {
  res.send("Example for get method");
});
// Router POST method
app.post("/hello", function (req, res) {
  res.send("Ban vua gui yeu cau bang phuong thuc POST toi dia chi /hello");
});
// Put method
app.put("/say", function (req, res) {
  res.send("Example for put method");
});
// Delete method
app.delete("/say", function (req, res) {
  res.send("Example for delete method");
});
// Nhận tất cả các phương thức
app.all("/any", function (req, res) {
  res.send("Example for any method");
});
// Truyền tham số vào router
app.get("/user/:name", function (req, res) {
  res.send("User name có tên: " + req.params.name);
});
// Set the server port to be 8000
app.listen(8000);
