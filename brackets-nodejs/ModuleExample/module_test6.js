var require = function(path) {
    var exports = {};
    
    exports.getUser = function() {
            return {id:'test01', name:'SUHYEON'};
        };
    
    exports.group = {id:'group01', name:'FRIEND'};

    return exports;
}

var user = require('...');

function showUser() {
    return user.getUser().name + ', ' + user.group.name;
}

console.log('사용자 정보 : ' + showUser());