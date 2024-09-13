// Default Export trong Javascript ES6 chỉ cho phép xuất một mặc định cho mỗi file. 
// Default Export có thể cho một function, class hoặc một object. 
// Default cho phép bạn đặt lại tên cho module. 

export function add(a:number,b:number){
    return a + b;
}
function minus(a:number,b:number){
    return a -b;
}
function mul(a:number,b:number){
    return a * b;
}
export {minus, mul}
export default function div (a:number,b:number){
    return a / b;
}