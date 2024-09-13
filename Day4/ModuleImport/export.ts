// Sử dụng để export một module ra bên ngoài, nếu không sử dụng export thì module sẽ ở dạng private và không sử dụng được ở bên ngoài.
export function add(a: number, b: number){
    return a + b;
}

function minus(a:number,b:number){
    return a - b;
}
function mul(a:number,b:number){
    return a * b;
}
export {minus, mul}