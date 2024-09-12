// Object
const Person: {name: string, age: number, gender: string} = {
    name:"truong",
    age: 22,
    gender: "Male",
}

// Optional Properties
const Person1: {name: string, age: number,gender?:string} ={
    name: "truong",
    age: 22,
}

// ReadOnly Properties
const Person2: {readonly name:string, age:number }= {
    name:"Truong",
    age:18
}
Person2.age = 22;
// Person2.name = "Long"; // => error wanring

console.log('person: ', Person)
console.log('person1:',Person1)
console.log('person2:',Person2)