function add(x:number,y:number):number{
    return x+y;
}
var myAdd = function(x:number, y:number):number {return x+y;};
console.log(myAdd(1,2));

// Optional Parameters
function add1(a:number, b:number, c?:number){
    if(c) {
        return a+ b+ c;
    }
    return a+ b;
}
console.log(add(1,2));
console.log(add1(1,2,3));

// Default parameters
function add2(a:number, b:number, c:number = 10){
    return a + b + c;
}
console.log(add2(1,2));