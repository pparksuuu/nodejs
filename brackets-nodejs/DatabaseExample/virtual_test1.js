// db에 연결해서 virtual 테스트 할 것이다.
// express 사용 안함
var mongoose = require('mongoose');

var database;
var UserSchema;
var UserModel;

function connectDB() {
    var databaseUrl = "mongodb://localhost:27017/local";
    
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('open', function() {
        console.log('데이터베이스에 연결됨 : ' + databaseUrl);
        
        createUserSchema();
        
        doTest();
    });
    
    database.on('disconnected', function() {
        console.log('데이터베이스 연결 끊어짐'); 
    });
    
    database.on('error', console.error.bind(console, 'mongoose 연결 에러.'));
}

function createUserSchema() {
        // 객체에 정의한다.
        UserSchema = mongoose.Schema({
            id: {type:String, required:true, unique:true},
            // password 삭제!
            name: {type:String, index:'hashed'},
            age: {type:Number, 'default':-1},
            created_at: {type:Date, index:{unique:false}, 'default':Date.now()},
            updated_at: {type:Date, index:{unique:false}, 'default':Date.now()}
        });
    console.log('UserSchema 정의함.');
    
    UserSchema.virtual('info')
        .set(function(info) {  // 사용자가 info라는 컬럼을 설정하면 set()이 호출됨
            var splitted = info.split(' ');
            // 여기서 this는 Schema 객체임
            this.id = splitted[0];
            this.name = splitted[1];
            console.log('virtual info 속성 설정됨 : ' + this.id + ', ' + this.name);
        })
        .get(function() {return this.id + ' ' + this.name}); // 조회
    
    UserModel = mongoose.model("users4", UserSchema);
    console.log('UserModel 정의함');
}

function doTest() {
    var user = new UserModel({"info":"test01 SUHYEON"});
    
    user.save(function(err) {
        if (err) {
            console.log('에러 발생');
            return;
        }
        
        console.log('데이터 추가함.');
    });
}

connectDB();