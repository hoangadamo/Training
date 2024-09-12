var _number = 1;
var _string = "string";
var _boolean = true;
// any là một kiểu mà bạn có thể gán bất kỳ kiểu nào cho nó
var _any = 1;
_any = 'string';
_any = true;
// Array: có hai kiểu khai báo tương đương với nhau trong TypeScript
var _arrays = [1, 2];
var _arrays2 = [1, 2];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
// const _enum: Color = Color.Blue;
var _enum = Color.Green;
// void được sử dụng khi hàm không trả lại bất kỳ giá trị nào
function _void() {
    console.log("This is my warning message");
}
_void();
console.log(_enum);
// Inferred type: Typescript thông minh detect được kiểu dữ liệu tương ứng ngay cả khi mình không khai báo cụ thể kiểu dữ liệu. 
var x = 100;
