var express = require('express')
var app = express()
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
const testFolder = './';
const fs = require('fs');
  // var path = require("path")
  // , url = require("url")
  // , port = process.env.PORT || 8888
  // , ip = process.env.IP || "0.0.0.0";

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
  });

  app.post('/show',function(req,res){
      var  myfile =  fs.readdirSync(testFolder)
      res.send(myfile)
    })

app.post('/showFile',function(req,res){
   fileName = req.body.b
   console.log('Sent from server  file: '+fileName)
  // var context = fs.readFileSync(fileName, 'utf8')
   
   fs.readFile(fileName, 'binary', function (err,data) {
      if (err) {
      return console.log(err);
    }
        res.json({
          data:data
        })
      });
})

io.on('connection', function(socket){
    console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  // socket.on('document-update',function)
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});