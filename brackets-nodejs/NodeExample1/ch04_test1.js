// url이라는 모듈 불러오기
var url = require('url');

var urlStr = 'https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query=popcorn';

var curUrl = url.parse(urlStr); // 현재 url 객체
console.dir(curUrl);

console.log('query -> ' + curUrl.query);

var curStr = url.format(curUrl);
console.log('url -> ' + curStr);

var querystring = require('querystring');
var params = querystring.parse(curUrl.query);
console.log('검색어 : ' + params.query);