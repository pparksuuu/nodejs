// 객체 만들기
var person = {};

// 속성 추가
person.name = '수현';
person['age'] = 20;
person.add = function(a, b) {
    return a + b;
};
// 객체 안에 추가되는 속성은 변수처럼 생각해라

console.log('더하기 : ' + person.add(20, 20));