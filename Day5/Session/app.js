const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Đặt thành true nếu sử dụng HTTPS
}));

app.get('/', (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`Bạn đã truy cập trang này ${req.session.views} lần`);
    } else {
        req.session.views = 1;
        res.send('Chào mừng bạn đến với trang web của chúng tôi lần đầu tiên!');
    }
});

app.listen(8000, () => {
    console.log('Server đang chạy trên cổng 3000');
});
