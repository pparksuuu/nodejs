// 객체 만들기
// js 객체는 중괄호 {}로 만들고, 속성을 추가할 수 있다.

var person = {};

// 대괄호 안에는 문자! 속성 추가
person['name'] = '박수현';
person['age'] = 20;

console.log('이름 : ' + person.name);
console.log('나이 : ' + person['age']);