function printHelp() {
  console.log("2.js (c) Thomas Wolfe");
  console.log("");
  console.log("--help     print this help");
  console.log("--file={name}     read the file {NAME} and output");
}

var args = require("minimist")(process.argv.slice(2), { string: "file" });



if(args.help || !args.file) {
  printHelp();
  process.exit(1);
}

var name = args.name; 

var hello = require('./helloworld3.js');

hello.say(args.file)
  .then(contents => console.log(contents.toString()))
  .catch(err => console.error(err))


