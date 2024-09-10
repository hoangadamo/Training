function ObjId() {
  var id = 1;
  return {
    getId: function () {
      return id;
    },
    setId: function (_id) {
      id = _id;
    },
  };
}
var myobject = ObjId();
console.log(myobject.getId()); // => 1
myobject.setId(10);
console.log(myobject.getId()); // => 10
