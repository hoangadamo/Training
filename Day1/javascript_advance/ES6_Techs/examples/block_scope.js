// Block Scoped là phạm vi trong một khối, nghĩa là chỉ hoạt động trong phạm vi được khai báo bời cặp {}. 
let a = 10;

if (a==1){ // block 1
    console.log('False');
    if (a==2) { // block 2
        console.log('False');
        if (a==10) { // block 3
            console.log('True');
        }
    }
}
