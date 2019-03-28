var winston = require('winston'); // 로그 처리 모듈
var winstonDaily = require('winston-daily-rotate-file'); // 로그 일별 처리 모듈
var moment = require('moment'); //시간 처리 모듈

function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
}

var logger = winston.createLogger ({
   transports: [
       new (winstonDaily) ({
           name: 'info-file',
           filename: './log/server_%DATE%.log',
           datePattern: '_YYYY-MM-DD',
           colorize: false,
           maxsize: 50000000,
           maxFiles: 1000,
           level: 'info',
           showLevel: true,
           json: false,
           timestamp: timeStampFormat
       }),
       new (winston.transports.Console) ({
           name: 'debug-console',
           colorize: true,
           level: 'debug',
           showLevel: true,
           json: false,
           timestamp: timeStampFormat
       })
   ] 
});

logger.debug('디버깅 메시지입니다.');
logger.error('에러 메시지입니다.');