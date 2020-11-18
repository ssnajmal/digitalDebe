let socket = io();
// connection listener
socket.on('connect', function (){
  console.log("connected to server");
});

//disconnect listener
socket.on('disconnect',function(){
  console.log("disconnected from server");
});

//message function
socket.on('newMessage', function(message){
  console.log("newMessage", message);
  var li = document.createElement("li");
  li.innerText= `${message.from}: ${message.text}`

  document.querySelector('Body').appendChild(li);
});

//submit button
document.querySelector('#submit-btn').addEventListener('click', function (e) {
  e.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text:  document.querySelector('input[name="message"]').value
  }, function(){
  })
});
//mailer button
document.querySelector('#submit-btn').addEventListener('click', function (e) {
  e.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text:  document.querySelector('input[name="message"]').value
  }, function(){
  })
});
//button for geolocation
document.querySelector('#send-location').addEventListener('click', function (e) {

  if(!navigator.geolocation){
    return alert('geolocation isnt supported on this browser err cd 1');
  }

  navigator.geolocation.getCurrentPosition(function (position){
    console.log(position);
  socket.emit('createLocationMessage',{
   latitude : position.coords.latitude,
   longitude : position.coords.longitude
  })
  }, function (){
    alert('unable to acquire location');
  })
});

document.querySelector('#clearbtn').addEventListener('click', function (e) {

     document.querySelector('input[name="message"]').value = "";
});
