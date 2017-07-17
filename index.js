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
    socket.emit('listdir',myfile)

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('Callpath',function(pathFile){
    console.log('join path file: '+ pathFile);
     var datafile = fs.readFileSync(pathFile,'binary');
    //join in to room path name
    socket.join(pathFile);
    //sent data file to room path
    io.sockets.in(pathFile).emit('readfile', datafile);
    //io.emit('readfile',datafile);
    
    var watcher = chokidar.watch(pathFile, {
        ignored: /node_modules/,
        persistent: true
   });
  
    watcher.on('change', path => {
      var datafile = fs.readFileSync(pathFile,'binary');
      //sent data file to room path
      io.sockets.in(pathFile).emit('readfile', datafile);
      //io.emit('readfile',datafile)
      console.log('change path : '+path)
    });

  })
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});