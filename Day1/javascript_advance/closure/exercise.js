function debug(type) {
  return function (message) {
    console.log(`[${type}] ${message}`);
  };
}

const log = debug("Mouse");
log("This record not found");
