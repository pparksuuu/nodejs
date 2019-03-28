var fs = require('fs');

fs.readFile('./package.json', 'utf8', function(err, data) {
    console.log(data);
}); // readFile() -> 비동기 방식
// 함수를 호출할 때 함수를 넣어주면, 콜백함수! 모두 끝났을 때 결과를 던져준다.
 