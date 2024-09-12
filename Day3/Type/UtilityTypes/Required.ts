// Required: Set tất cả thuộc tính của Type thành required 
interface Person1 {
    name?:string;
    age?:number;
    gender?:string; 
}
function updatePerson1(person:Person1, fieldsUpdate:Partial<Person1>){
    return {...person,...fieldsUpdate}
}
const person1: Person1 = {name:'truong'}
const person2: Required<Person1> = {name:'truong'} // báo lỗi
const person3: Required<Person1> = {name:'truong',age:12,gender:'male'} // ok