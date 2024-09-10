let arr = ["a", "b", "c"];
var iterator = arr[Symbol.iterator]();
console.log(iterator.next()); //a
console.log(iterator.next()); //b
console.log(iterator.next()); //c
console.log(iterator.next()); //undefined
