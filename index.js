var express = require('express')
var app = express()
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
var chokidar = require('chokidar');

const testFolder = './';
const fs = require('fs');

  var path = require("path")
  , url = require("url")
  , port = process.env.PORT || 8888
  , ip = process.env.IP || "0.0.0.0";

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
  });

io.on('connection', function(socket){
  console.log('a user connected');
    var  myfile =  fs.readdirSync(testFolder)
    io.emit('listdir',myfile)

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('Callpath',function(pathFile){
    console.log(pathFile);
<<<<<<< HEAD
    var room = "abc123";
    //join in to room path name
    //socket.join(pathFile);
     socket.join(room);
    var datafile = fs.readFileSync(pathFile,'binary');
    //sent data file to room path
    socket.in(room).emit('readfile', datafile);
    //io.emit('readfile',datafile);
    

  var watcher = chokidar.watch(pathFile, {
=======
    var datafile = fs.readFileSync(pathFile,'binary');
    io.emit('readfile',datafile)

  var watcher = chokidar.watch('index.js', {
>>>>>>> 22df20d6b26495a6d7326ff2add6fcfc1698fcb0
    ignored: /node_modules/,
    persistent: true
   });
  watcher
  .on('change', path => {
    var datafile = fs.readFileSync(pathFile,'binary');
    console.log(path)
<<<<<<< HEAD
      var room = "abc123";
    socket.in(room).emit('readfile', datafile);
     //io.emit('readfile',datafile)
=======
     io.emit('readfile',datafile)
>>>>>>> 22df20d6b26495a6d7326ff2add6fcfc1698fcb0
  });

  })
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});