const _number: number = 1;
const _string: string = "string";
const _boolean: boolean = true;

// any là một kiểu mà bạn có thể gán bất kỳ kiểu nào cho nó
let _any: any =1;
_any ='string';
_any=true;

// Array: có hai kiểu khai báo tương đương với nhau trong TypeScript
const _arrays:number[] = [1,2];
const _arrays2: Array<number> = [1,2];

enum Color {Red, Green, Blue};
const _enum: Color = Color.Blue;
// const _enum: Color = Color.Green;

// void được sử dụng khi hàm không trả lại bất kỳ giá trị nào
function _void(): void{
    console.log("This is my warning message");
}
_void();
console.log(_enum);

// Inferred type: Typescript thông minh detect được kiểu dữ liệu tương ứng ngay cả khi mình không khai báo cụ thể kiểu dữ liệu. 
let x = 100;