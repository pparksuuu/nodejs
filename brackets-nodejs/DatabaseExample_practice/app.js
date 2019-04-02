// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path'); // express, http 모듈과 함께 패스 문자열을 다룬다.

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser'); // POST 요청 처리
    // 쿠키와 세션을 다루는 cookie-parser, serve-static
var cookieParser = require('cookie-parser');
var static = require('serve-static');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// mongodb 모듈 사용
var MongoClient = require('mongodb').MongoClient;

var database;

function connectDB() {
    // localDB 접속을 위한 URL
    var databaseUrl = 'mongodb://localhost:27017/local'
    
    // DB에 연결, 연결 정상일 때 콜백함수 실행
    MongoClient.connect(databaseUrl, function(err, client) {
       if (err) {
           console.log('데이터베이스 연결 시 에러 발생함.');
           return;
       } 
        
        console.log('데이터베이스에 연결됨')
        database = client.db('local');
//        database = db; // 옛날 버전
    });
}

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
//    서버에서 사용할 포트 정보는 set() 메소드를 이용해서 port라는 이름으로 설정
app.set('port', process.env.PORT || 3000);

// public 폴더를 static으로 오픈
//    특정 패스로 public 폴더를 접근할 수 있도록 static 미들웨어를 사용해 등록
// 1. 요청 패스 지정
// 2. static() 함수로 특정 폴더 지정
app.use('/public', static(path.join(__dirname, 'public')));


// POST 방식 요청 파라미터 처리를 위해
app.use(bodyParser.urlencoded({extended:false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// 쿠키를 미들웨어로 등록
// 쿠키 : 클라이언트 웹 브라우저에 저장되는 정보
app.use(cookieParser());

// 세션을 미들웨어로 등록
// 세션 : 상태 정보를 서버 쪽에 저장
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

// 라우터 : 사용자가 요청한 기능이 무엇인지 패스를 기준으로 구별
// 이제 라우터 미들웨어를 사용하면, 이제부터 사용자가 요청한 패스 정보에 따라 라우팅이 가능.
var router = express.Router();

router.route('/process/login').post(function(req, res) {
   console.log('/process/login 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    if (database) {
        authUser(database, paramId, paramPassword, function(err, docs) {
            if (err) {
                console.log('에러 발생');
                         res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>에러 발생</h1>');
                res.end();
                return;
            }
            
            if (docs) {
                                console.dir(docs);
                
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 로그인 성공</h1>');
                res.write('<div><p>사용자 : ' + docs[0].name + '</p></div>');
                res.write('<br><br><a href="/public/login.html">다시 로그인하기</a>');
                res.end();
            } else {
                               console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 데이터 조회 안됨.</h1>');
                res.end();
            }
        });
    } else {
                 console.log('에러 발생.');
            res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
            res.write('<h1>데이터베이스 연결 안됨.</h1>');
            res.end();
    }
});

// 라우터 객체를 app 객체에 등록
app.use('/', router);

// 사용자를 인증하는 함수
var authUser = function(db, id, password, callback) {
   console.log('authUser 호출됨.' + id + ', ' + password);
    
    // users 컬렉션 참조
    var users = db.collection('users');
    
    users.find({"id":id, "password":password}).toArray(function(err, docs) {
        // 에러 발생
        if (err) {
            callback(err, null);
            return;
        }
        
        // 에러 X
        if(docs.length > 0) { // 사용자 데이터가 조회 됨
            console.log('일치하는 사용자를 찾음');
            callback(null, docs); // callback 함수를 호출하면서 docs 객체를 파라미터로 전달.
        } else {
            console.log('일치하는 사용자를 찾지 못함.');
            callback(null, null);
        }
    });
};

// ==== 404 에러 페이지 처리 ==== //
var errorHandler = expressErrorHandler({
   static: {
       '404' : './public/404.html'
   } 
});


// 오류 처리에 필요한 express-error-handler 모듈
app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

// ==== 서버 시작 ==== //
var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
    
    connectDB(); // 일반적으로 웹 서버가 실행된 상태 확인 후 DB 연결, 순서는 상관 없음.
});