var express = require('express');
var http = require('http');

// app : express 서버 객체.
var app = express();

// 포트 설정
app.set('port', process.env.PORT || 3000); // 앞(환경변수에 들어간 포트 정보)이 없으면 뒤를 해라.

// express를 이용해서 웹서버를 만들게 된다.
var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});