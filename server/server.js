const path = require('path');
const  http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require  ('./utils/message')
const publicPath = path.join(__dirname,'public');
var app = express();
var server = http.createServer(app);
let io = socketIO(server);

app.use(express.static('public'))


io.on('connection',(socket) => {

    console.log("a new user just connected");
    socket.emit('newMessage', generateMessage('Admin','Welcome to Digital Debe'));
    socket.broadcast.emit('newMessage', generateMessage('Admin',"New user Joined"));

    socket.on('createMessage',(message, callback) => {
    console.log("created message", message)
    io.emit('newMessage',generateMessage(message.from, message.text))
    callback('MESSAGE CREATED');
  });
  socket.on('disconnect',function(socket){

    console.log("a user just disconnected");

  });

});

server.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});
