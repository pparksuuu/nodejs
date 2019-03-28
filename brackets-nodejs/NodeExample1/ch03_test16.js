function add(a, b, callback) {
    var result = a + b;
    callback(result);
    
    // 내부 함수 : 함수 안에서 만들어지는 함수
    var history = function() {
        return a + ' + ' + b + ' = ' + result;
    };
    
    return history; // 함수를 리턴!!!
}

var add_history = add (20, 20, function(result) {
    console.log('더하기 결과 : ' +result);
});

console.log('add_history의 자료형 : ' + typeof(add_history));

console.log('결과값으로 받은 함수 실행(add_history) : ' + add_history());



