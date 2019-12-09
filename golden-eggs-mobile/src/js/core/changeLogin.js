var $login = $('.login');
var getuserkey = require('./login.js');
function changeLogin(flage){
	if(flage){
		getuserkey();
		$login.show().find('input').val('').end().find('.login-msg').text('');
		$('.mask').show();
	}
	else{
		$login.hide();
		$('.mask').hide();
	}
};
module.exports = changeLogin;