// Object
var Person = {
    name: "truong",
    age: 22,
    gender: "Male",
};
// Optional Properties
var Person1 = {
    name: "truong",
    age: 22,
};
// ReadOnly Properties
var Person2 = {
    name: "Truong",
    age: 18
};
Person2.age = 22;
// Person2.name = "Long"; // => error wanring
console.log('person: ', Person);
console.log('person1:', Person1);
console.log('person2:', Person2);
