// Express의 기본 모듈 불러오기
var express = require('express'), http = require('http'), path = require('path');

// Express의 미들웨어 불러옥
var bodyParser = require('body-parser'), static = require('serve-static');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// 미들웨어 설정
// body-parser를 사용해 application/x-www-form-urlnencoded 파싱
app.use(bodyParser.urlencoded({extended: false}));

// 미들웨어 설정
// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));

// 미들웨어에서 파라미터 확인
app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
});