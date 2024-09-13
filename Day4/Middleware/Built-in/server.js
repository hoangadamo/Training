// …Đoạn code dưới đây mô tả việc sử dụng express.static để tạo ra một thư mục có tên public. 
const express = require("express");
var app = express();

var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  },
};

app.use(express.static("public", options));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.json({ message: "Hello, this is your API response!" });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// http://localhost:8000/api

// Express.json: là một phần mềm trung gian nhanh được xây dựng giúp chuyển đổi phần body request thành JSON. 
// Express.urlencoded: là một phương thức được xây dựng sẵn để nhận request đến dưới dạng chuỗi hoặc mảng. 

