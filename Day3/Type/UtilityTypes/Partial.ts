// Set tất cả thuộc tính của Type thành optional 
interface Person {
    name:string;
    age:number;
    gender:string;
}

function updatePerson(person:Person, fieldsUpdate:Partial<Person>){
    return {...person, ...fieldsUpdate}
}
const person = {
    name: 'truong',
    age: 22,
    gender: 'male'
}
const personUpdate = {
    age:18
}

updatePerson(person, personUpdate)

console.log(updatePerson(person, personUpdate))