// exports : 전역객체, 어디서나 사용할 수 있다.
// => 모듈 파일에서 설정(속성으로 추가)하고, 메인 파일에서 모듈을 읽어들인 후,
//    그 속성으로 추가한 것을 사용할 수 있다!

// 다음 코드는 getUser 함수가 exports의 속성으로 들어가는 것
exports.getUser = function() { // 익명함수 할당
    return {id:'test01', name:'SUHYEON'};
};

// 함수가 아니라 객체를 할당해보자 !
exports.group = {id:'group01', name:'친구'};

