var express = require('express')
var app = express()
var http = require('http').Server(app);
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

const testFolder = './';
const fs = require('fs');

if (!fs.exists)
    fs.exists = path.exists;  

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html')
});

app.post('/show',function(req,res){

      fs.readdirSync(testFolder).forEach(file => {
      console.log(file);
    })
      var  myfile =  fs.readdirSync(testFolder)
      console.log(myfile);
      res.send(myfile)
      myfile.push("..",".")
      var html = myfile.map()

    })
app.post('/showFile',function(req,res){
  filename=req.body.b
 fs.readFile(filename,"utf8",function(err,data){
    if (err) {
      res.write(err + "\n");
      res.end();
      return;
    } 
     
// console.log(data)  
  res.json({
    data: data
  })
})

    })
http.listen(3000, function(){
  console.log('listening on *:3000');
});