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


    socket.emit('newMessage',{
    from:"admin",
    text:  "welcome to the digital debe",
    createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
      from:"admin",
      text:"New user Joined",
      createdAt: new Date().getTime()
    });

  socket.on('createMessage',(message)=>{
    console.log("created message", message)
    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createdAt: new Date().getTime()
    })
  });
  socket.on('disconnect',(socket)=>{
    console.log("a user just disconnected");
  });

});

server.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
