var person1 = {name : '수현', age : 27};
var person2 = {name : 'SUHYEON', age : 22};

// 붕어빵 틀을 만들겠다 ! 함수를 붕어빵 틀로 정의
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.walk = function(speed) {
  console.log(speed + 'km 속도로 걸어갑니다.');  
};

// 붕어빵 찍어내기
var person3 = new Person('수우현', 20);
var person4 = new Person('Hola', 27);

// 객체.함수
person3.walk(20);
