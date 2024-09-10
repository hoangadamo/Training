function doHomeWork(subject, callback) {
  console.log(`Bắt đầu làm bài tập ${subject}.`);
  callback();
}

doHomeWork("Toán", function () {
  console.log("Làm bài tập xong!");
});
