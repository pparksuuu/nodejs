var users = [{name : '수현', age : 20}, {name : 'SUHYEON', age : 22}];

console.log('배열 원소의 개수 : ' + users.length);

//unshift : 배열의 맨 앞쪽에 집어넣는 것
users.unshift({name : 'Hola', age : 21});
console.log('배열 원소의 개수(unshift 후) : ' + users.length);

console.dir(users);

// shift : 
var elem = users.shift();
console.log('배열 원소의 개수(shift 후) : ' + users.length);

console.log('shift로 꺼낸 세번째 원소 ');
console.dir(elem);