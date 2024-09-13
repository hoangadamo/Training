"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = add;
exports.minus = minus;
exports.mul = mul;
// Sử dụng để export một module ra bên ngoài, nếu không sử dụng export thì module sẽ ở dạng private và không sử dụng được ở bên ngoài.
function add(a, b) {
    return a + b;
}
function minus(a, b) {
    return a - b;
}
function mul(a, b) {
    return a * b;
}
