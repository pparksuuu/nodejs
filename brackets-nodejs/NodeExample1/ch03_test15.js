// callback 함수
// 워낙 광범위하게 사용되기 때문에 정확하게 이해해야 한다.
function add(a, b, callback) {
    var result = a + b;
    callback(result); 
};

add(10, 10, function(result) {
    console.log('더하기 결과(콜백함수 안에서) : ' + result);
});

// 함수를 파라미터로 전달할 수 있는 이유는, 함수가 일급 객체이기 때문!
// 일급 객체 => 함수를 변수로 전달할 수 있다.
