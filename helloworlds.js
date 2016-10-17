function readFile(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, function(err, contents) {
      if(err) reject(err);
      else resolve(contents);
    })
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