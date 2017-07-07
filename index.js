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


  var watcher = chokidar.watch('./**/*.js', {
  ignored: /node_module/, 
  persistent: true });
    watcher.on('change',function(path){
  console.log('changed: ', path)  
})
  
http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection', function(socket){
  console.log('a user connected');
    var  myfile =  fs.readdirSync(testFolder)
    io.emit('listdir',myfile)

    var datafile = fs.readFileSync('README.md','binary');
    console.log(datafile);
    io.emit('readfile',datafile)


  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
