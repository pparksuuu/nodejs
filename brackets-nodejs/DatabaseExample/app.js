var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// mongodb 모듈 사용
var MongoClient = require('mongodb').MongoClient;

var database; // 연결 받아올 변수

function connectDB() {
    // localDB 접속을 위한 URL
    var databaseUrl = 'mongodb://localhost:27017/local'
    
    // DB에 연결, 연결 정상일 때 콜백함수 실행
    MongoClient.connect(databaseUrl, function(err, client)  {
        if (err) {
            console.log('데이터베이스 연결 시 에러 발생함.');
            return;
        }
        
        console.log('데이터베이스에 연결됨 : ' + databaseUrl);
        database = client.db('local'); // database 명을 명시
//        database = db; /* 2.0 버전에서 연결하는 법이었음 */
    });
}

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

// POST 방식 요청 파라미터 처리를 위해.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 쿠키를 미들웨어로 등록
app.use(cookieParser());
// 세션을 미들웨어로 등록
app.use(expressSession({ // 세션 : 서버 쪽에 저장.
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

var router = express.Router();

// 요청 패스와 정확히 매칭되는 곳이라면 실행 ! 라우팅 확실하게 이해해야 한다!
router.route('/process/login').post(function(req, res) {
    console.log('/process/login 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    if (database) {
        authUser(database, paramId, paramPassword, function(err, docs) {
            if (err) {
                console.log('에러 발생.');
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

app.use('/', router);

var authUser = function(db, id, password, callback) {
    console.log('authUser 호출됨.' + id + ', ' + password);
    
    var users = db.collection('users');
    
    // 객체 안에 찾고자 하는 정보를 넣어준다!
    users.find({"id":id, "password":password}).toArray(function(err, docs) {
        // 에러 발생
        if (err) {
            callback(err, null);
            return;
        }
        
        // 에러 X
        if (docs.length > 0) { // 문서 객체가 여러개
            console.log('일치하는 사용자를 찾음.');
            callback(null, docs);
        } else {
            console.log('일치하는 사용자를 찾지 못함.');
            callback(null, null);
        }
    });
};


// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404' : './public/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler ); 

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));  
    
    connectDB(); // 일반적으로 웹 서버가 실행된 상태 확인 후 DB 연결, 순서는 상관 없음.
});