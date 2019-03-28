process.on('exit', function() { // process는 evenEmitter를 상속하고 있는 것
    console.log('exit 이벤트 발생함.');
}); // 출력되는 결과를 볼 수 없다. exit 이라는 이벤트가 발생해야 실행

setTimeout(function() {
    console.log('2초 후에 실행되었음.');

    process.exit();
}, 2000); // 2초 후에 앞에 있는 함수 실행.

console.log('2초 후에 실행될 것임.');