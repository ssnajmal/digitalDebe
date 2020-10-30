const path = require('path');
const  http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'public');
var app = express();
var server = http.createServer(app);
let io = socketIO(server);

app.use(express.static('public'))


io.on('connection',(socket)=>{
  console.log("a new user just connected");
  socket.on('disconnect',(socket)=>{
    console.log("a user just diconnected");
  });
});

server.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
