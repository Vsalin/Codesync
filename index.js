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

// app.post('/showfile',function(req,res){
//    //path
//    fileName = req.body.a
//    console.log('Sent from server  file: '+fileName)
//    room = fileName
//   //  fs.readFile(fileName, 'binary', function (err,data) {
//   //     if (err) {
//   //     return console.log(err);
//   //   }
//   //       res.json({
//   //         data:data
//   //       })
//   //     });

//   io.on('connection', function(socket){
//     socket.join(room);
//   });

//     var watcher = chokidar.watch(fileName, {
//         ignored: /(^|[\/\\])\../,
//         persistent: true
//         });
//     watcher
//       .on('add', path => console.log(`File ${path} has been added`))
//       .on('change', path => {
//     var datafile = fs.readFileSync(fileName,'binary');
//     console.log(datafile);
//     io.to(room).emit('readfile',datafile)
//   });

//})

io.on('connection', function(socket){
  console.log('a user connected');
    var  myfile =  fs.readdirSync(testFolder)
    io.emit('listdir',myfile)




    var datafile = fs.readFileSync('README.md','binary');
    io.emit('readfile',datafile)
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('Callpath',function(pathFile){
    console.log(pathFile);

    

  })



});

 //chokidar start
  var watcher = chokidar.watch('README.md', {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });
  watcher
  .on('change', path => {
    var datafile = fs.readFileSync('README.md','binary');
    console.log(datafile);
    io.emit('readfile',datafile)
  });
    


http.listen(3000, function(){
  console.log('listening on *:3000');
});
