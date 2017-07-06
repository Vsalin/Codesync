var express = require('express')
var app = express()
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
const testFolder = './';
const fs = require('fs');
 
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
 
   fs.readFile(fileName, 'binary', function (err,data) {
      if (err) {
      return console.log(err);
    }
        res.json({
          data:data
        })
      });
})
var body="";
  io.sockets.on('connection', function(socket){
    console.log('a user connected');
    
    socket.emit('refrest',{body:body})

    socket.on('refrest',function(body_){
      body=body_
    })

    socket.on('disconnect', function(){
    console.log('user disconnected');
    });

  socket.on('change', function (op) {
      console.log(op);
      if(op.action == 'insert' || op.action == 'remove'){
         socket.broadcast.emit('change', op);
      }
    })
  })
http.listen(3003, function(){
  console.log('listening on *:3003');
});