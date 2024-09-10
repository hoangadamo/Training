function log(level, time, msg) {
  console.log(level + "-" + time + ":" + msg);
}

function logAccessToday(msg) {
  log("Access", "Today", msg);
}

logAccessToday("Server Access");

var logAccessToday = log.bind("Access", "Today", msg);
