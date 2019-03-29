var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
// public 폴더의 path 지정
// __dirname : 이 파일이 있는 dir의 이름
// join() -> 붙여줌
// use() -> 미들웨어 등록 함수
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 라우터 객체 만들기
var router = express.Router();

// 라우터에 메소드 등록
// 라우터 경로 등록 (이 요청 패스로 들어온 것만 받는다. cf.미들웨어는 모두 받는다.)
router.route('/process/login').post(function(req, res) {
    console.log('/process/login 라우팅 함수에서 받음.');
    
    var paramId = req.body.id /*POST*/ || req.query.id /*GET*/;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead(200, {"Content-Type":"text/html;charset=uft8"});
    res.write("<h1>서버에서 로그인 응답</h1>");
    res.write("<div><p>" + paramId + "</p></div>"); // 이렇게 일일이 html을 만드는 것이 번거롭다. -> 후에 view 라는 웹페이지를 만들어 저장. 편하게 !
    res.write("<div><p>" + paramPassword + "</p></div>");
    res.end();
});

// 라우터 등록
app.use('/', router);

// all() -> 모든 요청에 대해 처리하겠다.
app.all('*', function(req, res) {
    res.status(404).send('<h1>요청하신 페이지는 없어요</h1>');
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});