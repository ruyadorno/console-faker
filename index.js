var readline = require('readline');
var MuteStream = require('mute-stream');

var ms = new MuteStream();
ms.pipe(process.stdout);

var rl = readline.createInterface({
    input: process.stdin,
    output: ms
});

ms.mute();
