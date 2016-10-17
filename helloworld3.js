function readFile(filename) {
  return new Promise(function(resolve, reject) {
    var stream = fs.createReadStream(filename);
    var contents = "";

    stream.pipe(fs.createWriteStream(filename+".backup"));

    stream.on("data", function(chunk) {
      contents += chunk;
    });

    stream.on("end", function(){
      resolve(contents);
    }); 
  });
}

function delayMsg(contents) {
  return new Promise(function(resolve) {
     setTimeout(function() {
       resolve(contents);
      }, 1000);
  })
 
}

function say(filename) {
  return readFile(filename)
          .then(delayMsg)
}
var fs = require('fs');

module.exports.say = say;