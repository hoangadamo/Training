// Đoạn code sau sẽ cài đặt và sử dụng một middleware có tên là cookie-parser dùng để đọc cookies của request:
var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");

// load the cookie-parsing middleware
app.use(cookieParser());

// Route to set a cookie
app.get('/setcookie', (req, res) => {
  res.cookie('myCookie', 'cookie_value', { maxAge: 3600000 }); // Cookie expires in 1 hour
  res.send('Cookie has been set');
});

// Route to read cookies
app.get('/getcookie', (req, res) => {
  const cookies = req.cookies;
  res.send(`Cookies: ${JSON.stringify(cookies)}`);
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});

// http://localhost:8000/setcookie
// http://localhost:8000/getcookie

// Một số third-party khác như: body-parser, cors, morgan, …