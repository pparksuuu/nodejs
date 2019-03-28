var users = [{name : '수현', age : 20}, {name : 'SUHYEON', age : 22}, {name : 'Hola', age : 21}];

// C 스타일 for문 : 요즘 별로 권장하지 않는다. (성능 좋지 않아)
for (var i = 0; i < users.length; i++) {
    console.log('배열 원소 #' + i + ' : ' + users[i].name);
}

console.log('--------------------------');

// forEach로 처리, callBack 함수
users.forEach(function(elem, index) { // elem이지만 무엇으로 명시하든 상관 없음.
    console.log('배열 원소 #' + index + ' : ' + elem.name);
});

