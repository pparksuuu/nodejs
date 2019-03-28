var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public'))); // public 폴더의 path를 지정
// __dirname : 이 파일이 있는 dir의 이름
// join() -> 붙여줌

// use() -> 미들웨어 등록 함수
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// POST 방식으로 넘길 땐 req.query... 이런거로 처리 X.
// header가 아닌 body 영역으로 들어가기 때문에
// 이를 처리할 수 있는 별도의 외장 모듈인 bodyParser를 등록한 것.


app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨.');
    
    var userAgent = req.header('User-Agent');
    // GET인지 POST인지 잘 모르겠으면 아래처럼 써라.
    // 라우팅 함수를 등록할 POST, GET 바뀌는 경우가 있기 때문에
    // 아래처럼 등록하면 편하다.
    var paramName = req.body.name || req.query.name;
    
     res.send('<h3>서버에서 응답. User-Agent -> ' + userAgent + '</h3> <h3>Param Name ->' + paramName + '</h3>');
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});