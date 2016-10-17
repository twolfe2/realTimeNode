function handleHTTP(req, res) {
  if(req.method === "GET") {
    var content = '';
    if(req.url === "/") {
      res.writeHead(200, { "Content-type": "text/plain"});
      var hello = new Promise((resolve) =>{
          setTimeout(function() {
            content += 'Hello World';
            resolve('2');
          }, 1000)
      });
      var random = new Promise((resolve) => {
        setTimeout(function() {
            content += Math.random();
            resolve('1');
          }, 500)
      });

      Promise.all([hello, random]).then(values => {
        console.log('resolved', values);
        res.end(content);
      })


      // res.write("Hello World:");
      // res.end(Math.random().toString());
    } else {
      res.writeHead(403);
      res.end('Nope!');
    }

  } else {
    res.writeHead(403);
    res.end('Only accepting GETs');
  }

}




var host = "localhost";
var port = 8006;

var http = require('http');
var http_serv = http.createServer(handleHTTP).listen(port, host);


