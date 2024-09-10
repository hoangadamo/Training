try {
  let user;
  user.name;
} catch (error) {
  console.log("Some error has occured\n" + error);
}
//Some error has occured
//TypeError:Cannot read properties of undefined (reading 'name')
