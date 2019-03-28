/*jslint devel: true */
/* eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/


var os = require('os');

console.log('hostname : ' + os.hostname());
console.log('memory : ' + os.freemem());