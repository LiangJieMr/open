var $loginStatus = $('.login-status');
var $PhoneSpan = $('span.pho');
function changeLogin(flage){
	if(flage){
		var phoneNum = $.getStorage('infor') ? $.getStorage('infor').phoneNum ? $.getStorage('infor').phoneNum : '' : '';
		var reg = /^(\d{3})\d{4}(\d{4})$/;
		phoneNum = phoneNum.replace(reg, "$1****$2");
		$loginStatus.show().find('i').text(phoneNum);
		$loginStatus.next("#loginOpt").hide();
		$PhoneSpan.text(phoneNum);
	}
	else{
		$loginStatus.hide().find('i').text('');
		$loginStatus.next("#loginOpt").show();
		$PhoneSpan.text('');
	}
};
module.exports = changeLogin;