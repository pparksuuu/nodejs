var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
   console.log('첫번째 미들웨어 호출됨.');
    
    // 사용 예) 로그인 안했을 때 로그인 페이지로 이동.
    res.redirect('http://google.co.kr');
});

var server = http.createServer(app).listen(app.get('port'), function() {
   console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port')); 
});