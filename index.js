var express = require('express')
var app = express()
var http = require('http').Server(app);


const testFolder = './';
const fs = require('fs');


app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html')

  
});

app.post('/show',function(req,res){
    console.log('Yo')

      fs.readdirSync(testFolder).forEach(file => {
      console.log(file);
    })
      console.log('------------------------------------------------')
      var  myfile =  fs.readdirSync(testFolder)
      console.log(myfile);
      res.send(myfile)

    })



http.listen(3000, function(){
  console.log('listening on *:3000');
});

