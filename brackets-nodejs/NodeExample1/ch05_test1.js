// http 모듈 불러오기
var http = require('http');

// http - 웹 서버 기능 담당
// 서버를 객체로 만들 수 있게 

// 웹서버 객체 받아오기
// 서버 : 클라이언트 요청 대기/응답
var server = http.createServer();

// IP를 많이 할당한다.
var host = '192.168.2.215'; // 192.168.2.215

var port = 3000;
// 50000 : 백로그, 동시에 접속할 수 있는 클라이언트의 수.
server.listen(port, host, 50000, function() { // 포트번호, 콜백함수
    console.log('웹서버가 실행되었습니다 -> ' + host + ':' + port);
}); // 대기


