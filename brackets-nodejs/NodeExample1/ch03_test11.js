var users = [{name : '수현', age : 20}, {name : 'SUHYEON', age : 22}];

console.log('배열 원소의 개수 : ' + users.length);

users.push({name : 'Hola', age : 21});
console.log('배열 원소의 개수(push 후) : ' + users.length);

var elem = users.pop();
console.log('배열 원소의 개수(pop 후) : ' + users.length);

console.log('pop으로 꺼낸 세번째 원소 ');
console.dir(elem);