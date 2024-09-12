// Một biến có thể có nhiều kiểu dữ liệu, thay vì chúng ta định nghĩa từng biến cho mỗi kiểu dữ liệu thì typescript có hỗ trợ union types giúp code trở nên ngắn gọn hơn rất nhiều. 
let options: number | string;
options = 1;
options = 'string'
const func = (params: number | string)=>{
    console.log(params);
}
func(1);
func('string');