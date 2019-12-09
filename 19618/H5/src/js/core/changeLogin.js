var $login = $('.login');
var getuserkey = require('./login.js');
function changeLogin(flage){
	if(flage){
		getuserkey();
		$login.show().find('input').val('').end().find('.login-msg').text('');
		$('.login-mask').show();
	}
	else{
		$login.hide();
		$('.login-mask').hide();
	}
};
$('.close').click(function(){
	$login.hide();
	$('.login-mask').hide();
})
module.exports = changeLogin;