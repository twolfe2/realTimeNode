function handleHTTP(req, res) {
  if(req.method === "GET") {
    var content = '';
    if(req.url) {
      req.addListener("end" ,function() {
        req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
        static_files.serve(req, res);
      })
      req.resume();
    
    } else {
      res.writeHead(403);
      res.end('Nope!');
    }

  } else {
    res.writeHead(403);
    res.end('Only accepting GETs');
  }

}


function handleIO(socket) {

  function disconnect() {
    console.log("client disconnected");
    clearInterval(interval);
  }
  console.log('connected');

  socket.on("disconnect", disconnect)

  var interval = setInterval(function() {
    socket.emit("hello", Math.random());
  }, 1000)
}

var host = "localhost";
var port = 8006;

var http = require('http');
var http_serv = http.createServer(handleHTTP).listen(port, host);

var node_static = require("node-static");

var static_files = new node_static.Server(__dirname);

// Will hijack http server and listens for web socket requests
var io = require("socket.io").listen(http_serv);


io.on("connection", handleIO);

