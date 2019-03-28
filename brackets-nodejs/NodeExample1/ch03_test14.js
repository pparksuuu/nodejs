// slice
var users = [{name : '수현', age : 20}, {name : 'SUHYEON', age : 22}, {name : 'Hola', age : 27}];

// 첫 번째 요소 : 복사할 요소의 시작 위치
// 두 번째 요소 : 끝 위치
var users2 = users.slice(1, 2); 

console.log('users 객체');
console.dir(users);

console.log('users2 객체');
console.dir(users2);
