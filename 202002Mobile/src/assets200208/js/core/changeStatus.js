/*
 * @Author: 梁杰
 * @Date: 2020-01-06 11:39:17
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-06 14:22:54
 * @Description: 登陆状态修改
 */

var showErrorTip =require('./errorTip.js');
var $headerLogin = $('.header-box .login');
var $headerLogout = $('.header-box .logout');
/**
 * 登陆状态修改
 */
function changeStatus(){
	var api = {
		overdue:'/api/user/overdue'
	};
	var infor = $.getStorage('infor');
	var userSign = infor ? infor['user_sign'] : '';
	var phoneNum = infor ? infor['phone_num'] : '';
	var reg = /^(\d{3})\d{4}(\d{4})$/;
	if (userSign) {
		$.sendReq(api.overdue,'post',{user_sign:userSign},function(data){
			if(data.code == 0){
				$headerLogin.hide();
				$headerLogout.find('i').text(phoneNum.replace(reg, "$1****$2")+ ',你好！');
				$headerLogout.show();
			}
			else{
				$.removeLocalStorage('infor');
				showErrorTip(data.msg);
				$headerLogin.show();
				$headerLogout.find('span').hide();
				$headerLogout.find('i').text('');
				$headerLogout.hide();
			}
		});
		return false;
	}
	$headerLogin.show();
	$headerLogout.find('span').hide();
	$headerLogout.find('i').text('');
	$headerLogout.hide();
};

module.exports = changeStatus;
