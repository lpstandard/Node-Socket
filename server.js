var http = require('http'); 
var url = require('url');
var fs = require('fs');
var io = require('socket.io')(server);

var server = http.createServer(function(req, res){
  console.log('connect to localhost://8001');
  var path = url.parse(req.url).pathname;

  switch(path){

    case'/': 
    res.writeHead(200, {'Content-type': "text/html"});
    res.write("Hello world");
    res.end();
    break; 

    case'/socket.html':
    fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(404);
        res.write('This page cannot be found.');
      }else{
        res.writeHead(200, {'Content-type': "text/html"});
        res.write(data);
      }
      res.end();
    }); 
    break;

    default:
    res.writeHead(404);
    res.write("This doesn't exist.");
    res.end();
    break;
  }

}); 

server.listen(8001);

var serv_io = io.listen(server);


serv_io.on('connection', function(socket){
  // setInterval(function(){
  //   socket.emit('message', {date: new Date()});
  // }, 1000);
  socket.on('client.data', function(data){
    process.stdout.write(data.letter);
  })
});





