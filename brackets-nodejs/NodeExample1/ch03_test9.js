// 배열에 함수 넣기
// 함수를 변수에 할당할 수 있으므로, 함수가 배열의 element로 들어갈 수 있다.
var users = [{name : '수현', age : 20}, {name : 'SUHYEON', age : 22}];

var oper = function (a, b) {
    return a + b;
};

users.push(oper);

console.dir(users);
console.log('세번째 배열 요소를 함수로 실행 : ' + users[2](10,10));