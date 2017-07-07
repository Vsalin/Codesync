var express = require('express')
var app = express()
var http = require('http').Server(app);
var bodyParser = require('body-parser');

var chokidar = require('chokidar');

var io = require('socket.io')(http);

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

  app.post('/list',function(req,res){
      var  myfile =  fs.readdirSync(testFolder)
      res.send(myfile)
    })

app.post('/showfile',function(req,res){
   fileName = req.body.a
   console.log('Sent from server  file: '+fileName)
  // var context = fs.readFileSync(fileName, 'utf8')
   

   fs.readFile(fileName, 'binary', function (err,data) {
      if (err) {
      return console.log(err);
    }
        res.json({
          data:data
        })
      })
})
var watcher = chokidar.watch('./**/*.js', {
  ignored: /node_module/, 
  persistent: true });
    watcher.on('change',function(path){
  console.log('changed: ', path)  
})
    // io.sockets.emit('')
http.listen(3000, function(){
  console.log('listening on *:3000');
});




