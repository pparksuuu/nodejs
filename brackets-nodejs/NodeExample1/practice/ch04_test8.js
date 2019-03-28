var fs = require('fs');

// 파일에 데이터를 쓴다.
// 파일이 열리면 fd 객체를 전달받는다.
fs.open('./output.txt', 'w', function(err, fd) {
    if (err) throw err;
    
    var buf = new Buffer('안녕!\n');
    
    fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
        if(err) throw err;
        
        console.log(err, written, buffer);
        
        fs.close(fd, function() {
            console.log('파일 열고 데이터 쓰고 파일 닫기 완료');
        });
    });
});