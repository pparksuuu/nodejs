// 객체를 만들면서 속성을 집어넣자
var person = {
    name : '수현',
    age : 20,
    add : function(a, b) {
        return a + b;
    }
};

console.log('더하기 : ' + person.add(40 , 40));