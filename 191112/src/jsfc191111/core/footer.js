var changeLogin = require('./changeLogin');
$.getStorage('infor') ? changeLogin(true) : changeLogin(false);
require('./checkForm');
require('./sliderServer');
var showLogin = require('./login');
var showErrorTip = require('./errorTip');
var getInfor = require('./getInfor.js');
var $searchInput = $('#searchKeywords');

var api = {
	quit: '/api/user/logout',
	overdue:'/api/user/overdue'
};

/*判断user_sign是否超时--开始*/
//if(getInfor() != ''){
//	$.sendReq(api.overdue,'post',{user_sign:getInfor},function(data){
//		if(data.code != 0){
//			$.removeLocalStorage('infor');
//			changeLogin(false);
//			showLogin();
//		}
//	});
//};
/*判断user_sign是否超时--结束*/

/*公共登录注册--开始*/
$('body').on('click', '#loginOpt', function() {
	showLogin();
});
/*公共登录注册-结束*/

/*退出登录--开始*/
$('body').on('click', '.quit-login', function() {
	var data = {
		user_sign: getInfor()
	};
	$.sendReq(api.quit, 'Post', data, function(data) {
		if(data.code == 0) { //退出成功
			$.removeLocalStorage('infor');
			window.location.href = '/';

		} else {
			showErrorTip(data.msg);
		}
	});
});
/*退出登录--结束*/

/*头部搜索--开始*/
function search_data() {
	var data = $searchInput.val();
	if((data == '搜索你想要的院校，专业试一试~') || (data == "")) {
		var num = 1;
		var timer = setInterval(function() {
			num++
			$searchInput.toggleClass('input-toggle');
			if(num == 5) {
				clearInterval(timer);
			}
		}, 150)
	} else {
		window.location.href = "/search/search.html?search=" + data;
	}
};
$searchInput.on('keyup', function(e) {
	if(e.keyCode == 13) {
		search_data();
	}
});
$('body').on('click', '#searchBtn', function() {
	search_data();
});
/*头部搜索--结束*/
var showTip = {
	showErrorTip:showErrorTip,
	showLogin:showLogin,
	changeLogin:changeLogin
}
module.exports = showTip;