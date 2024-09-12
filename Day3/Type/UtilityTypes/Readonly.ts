// Readonly: Set tất cả thuộc tính của Type thành readonly 
interface Person3{
    name?: string;
    age?: number;
    gender?: string;
}

function updatePerson3(person: Person3, fieldsUpdate: Partial<Person3>){
    return {...person, ...fieldsUpdate}
}

const person3: Person3 = { name: 'truong'}
person3.name = 'long'

const person4: Readonly<Person3> = {name: 'truong'}
person4.name = 'long' // => báo lỗi