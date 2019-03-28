var fs = require('fs');

var data = fs.readFileSync('./package.json', 'utf8'); // Sync 빼도 동작한다.
console.log(data);