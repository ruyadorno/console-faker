'use strict';

var fs = require('fs');
var path = require('path');
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

var onKeyPress = function () {
    ms.unmute();
    rl.output.write(chars[count++]);
    ms.mute();
};

rl.input.on('keypress', onKeyPress);

ms.mute();
