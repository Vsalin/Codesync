var express = require('express')
var app = express()
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
var chokidar = require('chokidar');
var mime = require('mime');

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
          files.push("..",".")
          var file = [];
<<<<<<< HEAD
       //  console.log(loopfile)
       wonderfile = readDirRecursive(__dirname);
       console.log(wonderfile)
       socket.emit('listdir',wonderfile)

=======
       
       wonderfile = walkSync(__dirname,file);
      // console.log(wonderfile)
       socket.emit('listdir',wonderfile)
       
>>>>>>> 8e1ab96cd6dd6e2f42e547d002295595321e2dc3
      })

  socket.on('Callpath',(pathFile)=>{
    socket.join(pathFile);
    console.log('User subscribe: '+ pathFile)
<<<<<<< HEAD
  
    fs.readFile(pathFile, "utf8", (err, data)=> {
    io.sockets.in(pathFile).emit('readfile', data);
    });
    

=======
      
      fs.readFile(pathFile, "utf8", (err, data)=> {
      io.sockets.in(pathFile).emit('readfile', data);
    });
  
>>>>>>> 8e1ab96cd6dd6e2f42e547d002295595321e2dc3
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

<<<<<<< HEAD

// const walkSync = (dir, filelist = []) => {
//   fs.readdirSync(dir).forEach(file => {
//     // const fileMeta = fs.statSync(path.join(dir, file))
//     // console.log(fileMeta)
//     // filelist.push(file)
//     if(file !='node_modules' && file!='.git'){
//       if(fs.statSync(path.join(dir, file)).isDirectory()){ // ./ja
//         filelist.push()

//         filelist.push(
//         filelist[file]=
//         {
//             name: file,
//             path: path.join(dir, file),
//             isdirectory: true
//            // children: walkSync(path.join(dir, file), filelist)   // ./ja/ja3,file
//         })
//         walkSync(path.join(dir, file), filelist);
//       }else{
//         filelist.push(
//         filelist[file]=
//         {
//             name: file,
//             path: path.join(dir, file),
//             size: fs.statSync(path.join(dir, file)).size,
//             type: mime.lookup(file),
//             isdirectory: false
//         });
//       }
//     }
//   });
//   return filelist;
// }

function readDirRecursive (dir) {
  files = fs.readdirSync(dir)
  
  return files.map((file) => {
    const filePath = path.join(dir, file)

    const result = {
      name: file,
      filePath,
      isDirectory: false,
      children: []
    }
if(file !='node_modules' && file!='.git'){
    if (fs.statSync(filePath).isDirectory()) {
      result.isDirectory = true
      result.children = readDirRecursive(filePath)
    }
    return result
    }else{ 
  }
  })
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});
=======
const walkSync = (dir, filelist = []) => {
  
  fs.readdirSync(dir).forEach(file => {
    if(file!='node_modules' && file !='.git' && file !='lib'){
    if(fs.statSync(path.join(dir, file)).isDirectory()){
      
      walkSync(path.join(dir, file), filelist)
      filelist.push(
      filelist[file]=
      {
          name: file,
          path: path.join(dir, file),
          directory: true,
            children:[
              {
                name:'ee.js'
              }
            ]
      })
            
    }else{
      filelist.push(
       filelist[file]=
      {
          name: file,
          path: path.join(dir, file),
          size: fs.statSync(path.join(dir, file)).size,
          type: mime.lookup(file),
          directory: false,
      });
    }  
    }
  })

  return filelist;
  }


// node_modules
// .git

http.listen(3000, function(){
  console.log('listening on *:3000');
});
>>>>>>> 8e1ab96cd6dd6e2f42e547d002295595321e2dc3
