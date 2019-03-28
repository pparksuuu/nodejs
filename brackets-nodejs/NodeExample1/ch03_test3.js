var add = function add(a, b) {
    return a + b;
};

// 익명 함수
var add2 = function (a, b) {
    return a + b;
};

var result = add(10, 10);
console.log('더하기 결과 ' + result);

var result2 = add2(20, 30);
console.log('더하기 결과 - 익명함수 ' + result2);