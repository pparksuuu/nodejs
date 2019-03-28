var util = require('util');

// EventEmitter는 events 모듈 안에 정의되어 있다. 
// require() 메소드를 호출하여 event 모듈을 불러들인 후,
// 그 안에 속성으로 들어 있는 EventEmitter 객체를 참조
var EventEmitter = require('events').EventEmitter;

// Calc : 계산기 객체
// function 키워드를 사용해 프로토타입 객체 (Prototype Object)로 만든다.
// 
var Calc = function() {
    var self = this;

    this.on('stop', function() {
       console.log('Calc에 stop event 전달됨.'); 
    });
};

// Calc 객체가 이벤트 처리를 할 수 있도록 EventEmitter를 상속
// 위에서 불러온 util 객체이다.
util.inherits(Calc, EventEmitter);

// prototype 객체의 속성으로 add 함수를 추가하면, new 연산자를 이용해 Calc 객체의 인스턴스 객체를 만들었을 떄, add() 함수를 사용할 수 있다.
Calc.prototype.add = function(a, b) {
    return a + b;
}

module.exports = Calc;
module.exports.title = 'calculator';