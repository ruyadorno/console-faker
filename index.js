'use strict';

var fs = require('fs');
var path = require('path');
var readline = require('readline');
var _eval = require('eval');
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
var self = this;

var print = function (str) {
    ms.unmute();
    rl.output.write(str);
    ms.mute();
};

var startLine = function () {
    print('> ');
};

var onKeyPress = function () {
    var char = chars[count++];
    currentLine += char;
    if (char === '\n') {
        _eval(currentLine, 'parse-line', self, true);
    }
    print(char);
};

rl.input.on('keypress', onKeyPress);

ms.mute();
