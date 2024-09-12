// Generic type trong TypeScript cho phép bạn viết các function, class và interface có thể tái sử dụng và tổng quát hóa. 
// Generic type cho phép bạn nhận tham số và trả về kiểu dữ liệu tương ứng. 
var getData = function (data) {
    return data;
};
getData([1, 2, 3, 4]);
getData(['cat', 'dog', 'tiger']);
var personList = [
    {
        name: 'truong',
        age: 22,
        gender: 'male',
    }
];
var carlist = [
    {
        name: 'Porche',
        color: 'yellow',
        price: 5000000000,
    }
];
