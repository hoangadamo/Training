// call - apply
var obj = {
  firstName: "Ahihi",
  lastName: "Ihaha",
  mMethod: function (firstName, lastName) {
    var firstName = firstName || this.firstName;
    var lastName = lastName || this.lastName;
    console.log("Hello " + firstName + " " + lastName);
  },
};

var obj1 = {
  firstName: "xxx",
  lastName: "yyy",
};

obj.mMethod(); //Hello Ahihi Ihaha
obj.mMethod.call(obj1); //Hello xxx yyy
obj.mMethod.apply(obj1); //Hello xxx yyy
obj.mMethod.call(obj1, "xxx", "yyy"); //Hello xxx yyy
obj.mMethod.apply(obj1, ["xxx", "yyy"]); //Hello xxx yyy

// Sử dụng call, apply để set this cho hàm callback
function print() {
  console.log(this.mVal);
}
var obj = {
  mVal: "lalala",
  mMethod: function (callback) {
    //truyen doi tuong hien tai cho ham phan hoi callback
    callback.call(this);
  },
};
obj.mMethod(print); //=> lalala

// Sử dụng để mượn hàm (borrowing function)
function test(firstParam, secondParam, thirdParam) {
  var args = Array.apply(null, arguments);
  console.log(args);
}
test(1, 2, 3);
