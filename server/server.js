const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname,'public');
var app = express();

app.use(express.static('public'))

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
