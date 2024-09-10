let fruits = ["Apples", "Pear", "Orange"];
// push a new value into the "copy"
let shoppingCart = fruits;
shoppingCart.push("Banana");
// what's in fruits?
alert(fruits.length);
/*
    Đoạn code trên sẽ hiển thị 4, vì thực chất mảng shoppingCart đang trỏ đến vùng nhớ của fruits nên khi thêm 1 phần tử vào 
    shoppingCart thì phần tử đó cũng được thêm vào mảng fruits
*/
