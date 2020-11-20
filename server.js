const express = require("express");
const app = express();
const host = "127.0.0.1";
const port = 3000;

app.listen(port, host);
app.use("/", express.static(__dirname + "/"));
app.use("/", function(req, res) {
  res.status(404).sendFile(__dirname + "/404.html");
});

