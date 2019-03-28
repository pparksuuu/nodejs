// delete 예제
var users = [{name : '수현', age : 20}, {name : 'SUHYEON', age : 22}, {name : 'Hola', age : 21}];

delete users[1];

console.dir(users);

users.forEach(function (elem, index) {
    console.log('원소 #' + index);
    console.dir(elem);
});

// 없는데 배열은 3개로 인식한다.
console.log(users.length);

// 그러므로 배열에서 원소를 없애려면 delete로 쓰면 안된다!

// splice를 사용한다 !(중간에 있는 것을 삭제할 때 사용 / 중간에 원소를 추가할 때 사용.)
// splice는 파라미터가 중요.
// 첫 번째 파라미터 : 몇 번째 인덱스? 
// 두 번째 파라미터 : 몇 개를 삭제할 것이냐? 0이라면 추가.

// 원소 추가하기
users.splice(1, 0, {name : 'Bien', age : 27}); // (두 번째 원소, 추가, 객체)
console.dir(users);

// 원소 삭제하기
users.splice(2, 1); // 인덱스 2부터 시작해서 1개 삭제
console.dir(users);



