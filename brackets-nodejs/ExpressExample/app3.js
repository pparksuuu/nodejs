var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨.');
    
    req.user = 'SUHYEON'; // 사용자 이름 정보를 속성으로 추가
    
    next(); // 파라미터로 받은 것을 함수로 실행. 이 미들웨어를 떠나게 된다. 다음 미들웨어로
});

app.use(function(req, res, next) {
    console.log('두번째 미들웨어 호출됨');
    
    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.end('<h1>서버에서 응답한 결과입니다. : ' + req.user + '</h1>');
});


var server = http.createServer(app).listen(app.get('port'), function(){
        console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});