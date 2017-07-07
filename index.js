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

//   app.post('/list',function(req,res){
//       var  myfile =  fs.readdirSync(testFolder)
//       res.send(myfile)
//     })

// app.post('/showfile',function(req,res){
//    //path
//    fileName = req.body.a
//    console.log('Sent from server  file: '+fileName)
//   // var context = fs.readFileSync(fileName, 'utf8')
   
<<<<<<< HEAD

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




=======
//    fs.readFile(fileName, 'binary', function (err,data) {
//       if (err) {
//       return console.log(err);
//     }
//         res.json({
//           data:data
//         })
//       });
// })

io.on('connection', function(socket){
  console.log('a user connected');
    var  myfile =  fs.readdirSync(testFolder)
    io.emit('listdir',myfile)

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

 //chokidar start
//   var watcher = chokidar.watch('README.md', {
//     ignored: /(^|[\/\\])\../,
//     persistent: true
//   });
//   watcher
//   .on('add', path => console.log(`File ${path} has been added`))
//   .on('change', path => console.log(`File ${path} has been changed`));


http.listen(3000, function(){
  console.log('listening on *:3000');
});
>>>>>>> 76e5fa6afdd282e04a9c46c1706d58e0b2c6f972
