// Một biến có thể có nhiều kiểu dữ liệu, thay vì chúng ta định nghĩa từng biến cho mỗi kiểu dữ liệu thì typescript có hỗ trợ union types giúp code trở nên ngắn gọn hơn rất nhiều. 
var options;
options = 1;
options = 'string';
var func = function (params) {
    console.log(params);
};
func(1);
func('string');
