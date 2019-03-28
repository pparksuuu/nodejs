// 파일을 미세하게 다루기 위해서는 write() 이 필요.

var fs = require('fs');

fs.open('./output.txt', 'w', function(err, fd) { // fd : file descriptor
    if (err) {
        console.log('파일 오픈 시 에러 발생');
        console.dir(err);
        return;
    }
    
    var buf = new Buffer('안녕!\n');
    fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
        if (err) {
            console.log('파일 쓰기 시 에러 발생');
            console.dir(err);
            return;
        }
        
        console.log('파일 쓰기 완료함.');
        
        fs.close(fd, function() {
           console.log('파일 닫기 완료함.');
        });
    }); 
}); // 파일을 쓰려면 기본적으로 열어야지!
// w : 쓰기 권한