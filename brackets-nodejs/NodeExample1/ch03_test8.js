// 배열은 [] 대괄호로 만든다.
// 객체에 접근하는 대괄호와는 다르다! 고 생각해라
var names = ['수현', 'SUHYEON', 'Hola'];

// 객체는 {} 중괄호로 만든다.
var users = [{name : '수현', age : 20}, {name : 'SUHYEON', age : 22}];

// 이미 만들어진 배열 객체에 element 추가하고 싶다?
users.push({name : 'Hola', age:21});

// 배열에 들어간 원소의 개수를 알고 싶다면 .length!
console.log('사용자 수 : ' + users.length);
console.log('첫번째 사용자 이름 : ' + users[0].name);