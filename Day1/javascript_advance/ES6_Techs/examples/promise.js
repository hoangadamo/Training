// resolve
var promise = new Promise(function (resolve, reject) {
  resolve("Success!");
});
promise.then(function (success) {
  console.log(success);
});

// reject
var promise = new Promise(function (resolve, reject) {
  reject("Error!");
});
promise.then(
  function (success) {
    console.log(success);
  },
  function (error) {
    console.log(error);
  }
);

// Xử lý callback hell
function getPromise(url) {
  //tra ve mot Promise o dday
  //guri mot request lay dur lieu tir mot url (request bat dong bo)
  //sau khi lay ve ket qua,xir ly promise voi dur lieu nhan dugc
}
var promise = getPromise("some url here");
promise
  .then(function (result) {
    //chung ta co du lieu cua url 'some url here'o day
    return getPromise(result); //va tra ve mot promise khac
  })
  .then(function (result) {
    //o day chua ket qua promise vira tra ve o tren va logic de xir ly du lieu cuoi cung
  });
