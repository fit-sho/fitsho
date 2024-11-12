const express = require("express");
require("./db/mongoose");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
