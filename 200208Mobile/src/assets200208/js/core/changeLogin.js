/*
 * @Author: 梁杰
 * @Date: 2019-12-24 16:08:14
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-09 20:02:37
 * @Description: 登陆状态
 */
var $login = $('.login-container');
var getuserkey = require('./login.js');
var changeStatus = require('./changeStatus.js');
/**
 * 登陆状态修改
 * @param {*} flage 
 */
function changeLogin(flage){
	if(flage){
		getuserkey();
		$login.show().find('input').val('').end().find('.login-msg').text('');
	}
	else{
		$login.hide();
	}
};
$('.login-container .close').click(function(){
	$login.hide();
	var el = $('.getcode').eq(0);
	el.text("获取验证码")
	el.attr('disabled', false);
})
$(".header-box .login").on('click',function(){
	changeLogin(true);
});
/*用户名下卡切换-开始*/
$(".header-box dt i").on('click',function(){
	var $logout = $(this).next();
	if($logout.css('display') == 'none'){
		$logout.slideDown(200);
	}else{
		$logout.slideUp(150);
	}
});
/*用户名下卡切换-结束*/
/*退出登陆-开始*/
$(".header-box dt em").on('click',function(){
	$.removeLocalStorage('infor');
	$.removeLocalStorage('scene_id');
	changeStatus();
	$('.login-container').find('input').val('').end().find('.login-msg').text('');
});
$('#logout').on('click', () => {
	location.reload();
})
/*退出登陆-结束*/