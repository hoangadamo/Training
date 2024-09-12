// Khi sử dụng Type Assertions, trình biên dịch sẽ coi một giá trị là một kiểu được chỉ định cụ thể. Nó sử dụng từ khóa as để sử dụng
interface Person0 {
    name:string;
    age:number;
    gender:string;
}

const person = {
    name:'truong',
    age:18,
    gender:'male'
} as Person0