var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
//socket.io instantiation
var io = require('socket.io')(http);

var min=0;
var max=10000;

//to use stylesheet
app.use(require('express').static(path.join(__dirname, '/public')));
//routes
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



//Listen on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});

class User {
	constructor(username) {
		this.username = username;
	}
}

//listen on every connection
io.on('connection', function(socket){

  //var random = Math.floor(Math.random() * (+max - +min)) + +min;
  console.log('a new user has connected');
  //default username
  newConnection(socket);

  //socket.username = "User" + random;
  //newUser = new User(socket.username);

  socket.on('disconnect', function(){   // disconnect event
    console.log('user disconnected');
  });

  io.emit('new user', newUser);

  socket.on('change username', function(nickname){  //change username event
    console.log('change username');
    changeUsername(nickname); //call changeUsername function
  });

  socket.on('chat message', function(msg){  // print chat message event
    msg =  "[ " + getCurrentDate() + " ] " + newUser.username + " : "+ msg;
    io.emit('chat message', msg);
  });
});

//assigns random username with a new connection
function newConnection(socket) {
  var random = Math.floor(Math.random() * (+max - +min)) + +min; //random number generator
  socket.username = "User" + random;
  newUser = new User(socket.username); //assign username
}

// changes username
function changeUsername(nickname) {
  newUser.username = nickname;  //assign new username
  io.emit('updated', nickname);
}

// generates current time
function getCurrentDate() {
    var currentDate = new Date();
    var hour = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours();
    var minute = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    return  hour + ":" + minute + " ";
}
