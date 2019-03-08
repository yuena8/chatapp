var app = require('express')();
var http = require('http').Server(app);

//socket.io instantiation
var io = require('socket.io')(http);

//routes
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Listen on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//listen on every connection

io.on('connection', function(socket){
  console.log('a new user has connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
