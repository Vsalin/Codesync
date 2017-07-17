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
    fs.readdir(testFolder, (err, files) => {
          socket.emit('listdir',files)
    })

  socket.on('Callpath',(pathFile)=>{
    socket.join(pathFile);
    console.log('User subscribe: '+ pathFile)

    fs.readFile(pathFile, "utf8", (err, data)=> {
       io.sockets.in(pathFile).emit('readfile', data);
    });

    
    var watcher = chokidar.watch(pathFile, {
        ignored: /node_modules/,
        persistent: true
   });

    watcher.on('change', path => {
      console.log('change path : '+ path)
      fs.readFile(path, "utf8", (err, data)=>{
       io.sockets.in(path).emit('readfile', data);
          console.log('emit to readfile')
      });
    });

  })

   socket.on('Unsubscribe',(data)=>{
      socket.leave(data);
      console.log('Leave from :'+ data);
    })

  socket.on('disconnect', ()=>{
    console.log('user disconnected');
  });

});
http.listen(3000, function(){
  console.log('listening on *:3000');
});

