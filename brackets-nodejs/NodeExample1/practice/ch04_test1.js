// url 모듈 받아오기
var url = require('url');

// URL 객체 만들기 -> .parse()
var curURL = url.parse('https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query=popcorn');

// URL 객체를 주소 문자열로 만들기 -> .format()
var curStr = url.format(curURL);

console.log('주소 문자열 : %s', curStr);
console.dir(curURL);

var querystring = require('querystring');
var param = querystring.parse(curURL.query);

console.log('요청 파라미터 중 query의 값 : %s', param.query);
console.log('원본 요청 파라미터 : %s', querystring.stringify(param));