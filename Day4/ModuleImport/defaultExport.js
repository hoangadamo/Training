"use strict";
// Default Export trong Javascript ES6 chỉ cho phép xuất một mặc định cho mỗi file. 
// Default Export có thể cho một function, class hoặc một object. 
// Default cho phép bạn đặt lại tên cho module. 
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = add;
exports.minus = minus;
exports.mul = mul;
exports.default = div;
function add(a, b) {
    return a + b;
}
function minus(a, b) {
    return a - b;
}
function mul(a, b) {
    return a * b;
}
function div(a, b) {
    return a / b;
}
