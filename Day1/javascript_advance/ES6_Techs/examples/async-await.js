async function getABC() {
  let A = await getValueA(); // getValueA takes 2 second to finish
  let B = await getValueB(); // getValueB takes 4 second to finish
  let C = await getValueC(); // getValuec takes 3 second to finish
  return A * B * C;
}
async function getABC() {
  //Promise.all()allows us to send all requests at the same time.
  let results = await Promise.all([getValueA, getValueB, getValueC]);
  return results.reduce((total, value) => total * value);
}

// Xử lý lỗi
async function doSomethingAsync() {
  try {
    //This async call may fail.
    let result = await someAsyncCall();
  } catch (error) {
    //If it does we will catch the error here.
  }
}

//Async function without a try/catch block.
async function doSomethingAsync() {
  //This async call may fail.
  let result = await someAsyncCall();
  return result;
}
//We catch the error upon calling the function.
doSomethingAsync().then(successHandler).catch(errorHandler);
