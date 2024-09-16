var express = require("express");
var session = require("express-session");

var app = express();
// app.use(session());
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Đặt thành true nếu sử dụng HTTPS
}));

// Set session:
app.get("/set_session", (req, res) => {
  // set a object to session
  req.session.User = {
    id: 1,
    name: "truong",
  };
  return res.status(200).json({ status: "success" });
  // return res.status(200).json(req.session);
});

// Get session:
app.get('/get_session',(req, res)=>{
    // check session
    if (req.session.User){
        return res.status(200).json({status:'success', session: req.session.User});
    }
    return res.status(200).json({status:'error', session: 'No session'});
})

// Destroy session:
app.get('/destroy_session', (req, res)=>{
    // destroy session:
    req.session.destroy(function(err){
        return res.status(200).json({status:'success', session: 'cannot access session here'});
    })
})

app.listen(8000, ()=>{
  console.log('Server is running on port 8000');
})