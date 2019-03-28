var Calc = require('./calc3');

var calc1 = new Calc(); // 프로토타입 객체 만듦.
calc1.emit('stop'); // stop이라는 이벤트 전달!

console.log('Calc에 stop 이벤트 전달함.');