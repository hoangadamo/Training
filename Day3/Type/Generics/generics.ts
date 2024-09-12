// Generic type trong TypeScript cho phép bạn viết các function, class và interface có thể tái sử dụng và tổng quát hóa. 
// Generic type cho phép bạn nhận tham số và trả về kiểu dữ liệu tương ứng. 
const getData = <T>(data:T[])=>{
    return data;
}
getData<number>([1,2,3,4])
getData<string>(['cat','dog','tiger'])

interface Person {
    name:string;
    age:number;
    gender:string;
}
interface Car {
    name:string;
    color:string;
    price:number;
}
interface List<T> {
    length:number;
    [index:number]: T;
}
const personList: List<Person> = [
    {
        name:'truong',
        age: 22,
        gender:'male',
    }
]

const carlist: List<Car>=[
    {
        name:'Porche',
        color:'yellow',
        price:5000000000,
    }
]