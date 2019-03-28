// 객체를 불러오고 상속해야 한다.
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Calc = function() {
    this.on('stop', function() {
        console.log('Calc에 stop 이벤트 전달됨.');
    });
};

util.inherits(Calc, EventEmitter); // 상속(자식, 부모)

Calc.prototype.add = function(a, b) {
    return a + b;
};

module.exports = Calc;