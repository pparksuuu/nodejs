var http = require('http');

var server = http.createServer();

var host = '192.168.2.215';
var port = 3000;
server.listen(port, host, 50000, function() {
    console.log('웹서버 실행됨.');
});

server.on('connection', function(socket) {
    console.log('클라이언트가 접속했습니다.');
});

// req : 요청 객체, res : 응답 객체
server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');
//    console.dir(req);
    
    res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"}); // 200 : 정상. 클라이언트 쪽으로 헤더 보낸다.
    res.write('<h1>웹서버로부터 받은 응답</h1>');
    res.end(); // 이 때 전송한다.
});
