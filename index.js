#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');
var readline = require('readline');
var optimist = require('optimist');
var MuteStream = require('mute-stream');
var endOfLine = require('os').EOL;

var ms = new MuteStream();
ms.pipe(process.stdout);

var rl = readline.createInterface({
  input: process.stdin,
  output: ms
});

var chars = null;
var count = 0;
var currentLine = '';

// Entry point
var startFaking = function () {
  var filenames = setupOptimist();
  if (hasOptions()) {
    process.exit(0);
  }
  readFiles(filenames);
  rl.input.on('keypress', onKeyPress);
  print('> ');
};

// Read all files, store chars for outputing and reset counting
var readFiles = function (filenames) {
  chars = [];
  filenames.forEach(function (fname) {
    var file = fs.readFileSync(path.join(__dirname, fname));
    chars = chars.concat(file.toString().split(''));
  });
  count = 0;
  currentLine = '';
};

var print = function (str) {
  ms.unmute();
  rl.output.write(str);
  ms.mute();
};

// Test if line is ended and print/execute parsed chars
var breakLine = function (str) {
  if (str === endOfLine) {
    if (currentLine !== '' && currentLine !== endOfLine) {
      try {
        vm.runInThisContext(currentLine);
      } catch(e) {}
      print(endOfLine);
    }
    currentLine = '';
    print('> ');
  }
};

var onKeyPress = function () {
  var char = chars[count++];
  // When out of characters, just quit the program
  if (!char) {
    print(endOfLine);
    rl.close();
    process.exit(0);
  }
  currentLine += char;
  print(char);
  breakLine(char);
};

var setupOptimist = function () {
  var helpMsg = 'Input anything on your keyboard and have the contents ';
  helpMsg += 'of [FILES] printed out on stdout.\n';
  return optimist
    .usage('console-faker [FILES]' + endOfLine + endOfLine + helpMsg)
    .alias('h', 'help').describe('h', 'Display help and usage details.')
    .alias('v', 'version').describe('v', 'Display the current version.')
    .boolean(['help', 'version'])
    .wrap(80)
    .argv._;
};

var hasOptions = function () {
  var argv = optimist.parse(process.argv);
  if (argv.help) {
    optimist.showHelp();
    return true;
  } else if (argv.version) {
    print('console-faker v' + require('./package').version + endOfLine);
    return true;
  }
};

startFaking();
