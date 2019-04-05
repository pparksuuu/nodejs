var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// 암호화 모듈
var crypto = require('crypto');

// mongoose 모듈 사용
var mongoose = require('mongoose');

var database; // 연결 받아올 변수
var UserSchema;
var UserModel;

function connectDB() {
    // localDB 접속을 위한 URL
    var databaseUrl = 'mongodb://localhost:27017/local'
    
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl, {useNewUrlParser: true}, {useCreateIndex: true});
    database = mongoose.connection;
    
    // connection은 이벤트로 연결 !
    database.on('open', function() {
        console.log('데이터베이스에 연결됨 : ' + databaseUrl);

        
        // 객체에 정의한다.
        UserSchema = mongoose.Schema({
            id: {type:String, required:true, unique:true, 'default':''},
            hashed_password: {type:String, required:true, 'default':''},
            salt: {type:String, required:true}, // 필수속성
            name: {type:String, index:'hashed', 'default':''},
            age: {type:Number, 'default':-1},
            created_at: {type:Date, index:{unique:false}, 'default':Date.now()},
            updated_at: {type:Date, index:{unique:false}, 'default':Date.now()}
        });
        console.log('UserSchema 정의함.');
        
        // virtual 가상 속성 추가
        UserSchema
            .virtual('password')
            .set(function(password) {
                this._password = password;
                this.salt = this.makeSalt();
                this.hashed_password = this.encryptPassword(password);
                console.log('virtual password 저장됨 : ' + this.hashed_password);
            })
            .get(function() {return this._password});
        
        // method 함수를 사용하면 Model Instance에서 사용할 수 있다.
        UserSchema.method('encryptPassword', function(plainText, inSalt) {
            // salt는 pw에 따라 암호화되는 값이 달라지게 하기 위해 만든 것
            if (inSalt) {
                return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
            } else {
                return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
            }
        });
        
        // 매번 새로운 값을 만들어서 return
        UserSchema.method('makeSalt', function() {
            return Math.round((new Data().valueOf() * Math.random())) + ''; // 문자열로 변환해서 return
        });
        
        UserSchema.method('authenticate', function(plainText, inSalt, hashed_password) {
            if (inSalt) {
                console.log('authenticate 호출됨.');
                return this.encryptPassword(plainText, inSalt) === hashed_password;
            } else {
                console.log('authenticate 호출됨.');
                return this.encryptPassword(plainText) === hashed_password;
            }
        });
        
        UserSchema.static('findById', function(id, callback) {
            return this.find({id:id}, callback);
        });
        
        /*
        UserSchema.statics.findById = function(id, callback) {
            return this.find({id:id}, callback);
            // JS에서의 this는 함수를 호출한 객체.
            // this는 모델 객체를 참조중이다.
        }
        */
        
        UserSchema.static('findAll', function(callback) {
            return this.find({}, callback); 
        });
        
        UserModel = mongoose.model('users6', UserSchema);
        console.log('UserModel 정의함');
        
    });
    
    database.on('disconnected', function() {
        console.log('데이터베이스 연결 끊어짐.');
    });
    
    database.on('error', console.error.bind(console, 'mongoose 연결 에러.'));
    
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

router.route('/process/adduser').post(function(req, res) {
    console.log('/process/addUser 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);
    
    if (database) {
        addUser(database, paramId, paramPassword, paramName, function(err, result) {
            console.log("addUser함수호출호출")
            if (err) {
                console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>에러 발생</h1>');
                res.end();
                return;
            }
            
            if (result) {
                        console.log("들어옴2");
                // 정상적인 상황
              res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 추가 성공</h1>');
                res.write('<div><p>사용자 : ' + paramName + '</p></div>');
                res.end();
            } else {
                        console.log("들어옴3");
               console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 추가 안됨.</h1>');
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

router.route('/process/listuser').post(function(req, res) {
    console.log('/process/listuser 라우팅 함수 호출됨.');
    
    if (database) {
        UserModel.findAll(function(err, results) {
                if (err) {
                console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>에러 발생</h1>');
                res.end();
                return;
            }
            
            if (results) {
                console.dir(results);
                
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write("<h3>사용자 리스트</h3>");
                res.write("<div><ul>");
                
                for (var i = 0; i < results.length; i++) {
                    var curId = results[i]._doc.id;
                    var curName = results[i]._doc.name;
                    res.write("    <li>#" + i + " -> " + curId + ", " + curName + "</li>");
                }
                
                res.write("</ul></div>");
                res.end();
            } else {
               console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>조회된 사용자 없음.</h1>');
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
    
    UserModel.findById(id, function(err, results) {
        if (err) {
            callback(err, null);
            return;
        } 
        
        console.log('아이디 %s로 검색됨.', id);
        if (results.length > 0) {
            // virtual 사용 후엔 다음과 같이 코드를 바꾸어줘야 한다.
            // 인스턴스 객체 만들기
            var user = new UserModel({id:id});
            var authenticated = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hashed_password);
            
            if (authenticated){
                console.log('비밀번호 일치함.');
                callback(null, results);
            } else {
                console.log('비밀번호 일치하지 않음.');
                callback(null, null);
            }
        } else {
            console.log('아이디 일치하는 사용자 없음.');
            callback(null, null);
        }
    });
    
    
    // 이전과의 차이점 : collection이 아니라 UserModel에서 find 하겠다!
    UserModel.find({"id":id, "password":password}, function(err, docs) {
        if (err) {
            callback(err, null);
            return;
        }
        
        if (docs.length > 0) { // 문서 객체가 여러개
            console.log('일치하는 사용자를 찾음.');
            callback(null, docs);
        } else {
            console.log('일치하는 사용자를 찾지 못함.');
            callback(null, null);
        }
    });
    
};

// 사용자 추가 함수
var addUser = function(db, id, password, name, callback) {
    console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);
    
    
    // ##########################에러 있다....
    var user = new UserModel({"id":id, "password":password, "name":name});
    
    
    user.save(function(err, addedUser) {
        console.log("user.save 호출");
        if (err) {
            console.log('라인315에러');
            callback(err, null);
            return;
            
        }
        
        console.log('사용자 데이터 추가함');
        callback(null, addedUser);
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