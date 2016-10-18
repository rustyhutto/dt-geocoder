require('dotenv').config()
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.send("meaning of life? " + process.env.CATS)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
