'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');
var readline = require('readline');
var MuteStream = require('mute-stream');

var ms = new MuteStream();
ms.pipe(process.stdout);

var rl = readline.createInterface({
    input: process.stdin,
    output: ms
});

var file = fs.readFileSync(path.join(__dirname, 'test.js'));
var chars = file.toString().split('');
var count = 0;
var currentLine = '';

var print = function (str) {
    ms.unmute();
    rl.output.write(str);
    ms.mute();
};

var breakLine = function (str) {
    if (str === '\n') {
        if (currentLine !== '' && currentLine !== '\n') {
            vm.runInThisContext(currentLine);
            print('\n');
        }
        currentLine = '';
        print('> ');
    }
};

var onKeyPress = function () {
    var char = chars[count++];
    // When out of characters, just quit the program
    if (!char) {
        rl.close();
        process.exit();
    }
    currentLine += char;
    print(char);
    breakLine(char);
};

rl.input.on('keypress', onKeyPress);

print('> ');
