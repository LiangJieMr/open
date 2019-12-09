var $loginEle = $('#login');//登陆弹窗遮罩
var $boxEle = $loginEle.find('.box'); //登陆弹窗表单
var $loginErr = $loginEle.find('.login-error'); //错误信息

var showErrorTip = require('./errorTip');
var getUserkey = require('./getUserkey');
var changeLogin = require('./changeLogin');
const getInfor = require('./getInfor');
const myPrice = require('./myPrice.js');
require('./checkForm');

var domEles = null;
var api ={
	login:'/api/user/verifylogin',
	logout:'/api/user/logout'
};

/*显示弹窗--开始*/
function showLogin(showErrorTip,domEle){
	domEles = domEle;
	$boxEle.addClass('bounceIn');
	$loginEle.show();
	getUserkey(formCheck,showErrorTip);
};

/*显示弹窗--结束*/

/*关闭登录弹窗--开始*/
$('body').on('click','.login-container #closeLogin',function(){
	$boxEle.removeClass('bounceIn');
	$loginEle.hide();
	formCheck.initData();
	$loginErr.text('');
	if(domEles){
		$(domEles).removeClass('disabledBtn');
	}
});
/*关闭登录弹窗--结束*/

/*登录处理--开始*/
function submit($eles,vm,userkey){
	var phoneVal = $eles.filter("[data-type='phoneNum']").val();
	var data = {
		phone:phoneVal,
		type:8,
		sms_code:$eles.filter("[data-type='phoneCode']").val(),
		verify_code:$eles.filter("[data-type='imgCode']").val(),
		userkey:userkey
	};
	
	$(vm).prop('disabled',true);
	$(vm).addClass('disabled');
	$.sendReq(api.login,'POST',data,function(data){
		$(vm).prop('disabled',false);
		$(vm).removeClass('disabled');
		if(data.code == 0){
			const $privacyPolicy = $loginEle.find("#privacyPolicy");
			if($privacyPolicy.prop('checked')){
				$.setStorage('infor',{phoneNum:phoneVal,userSign:data.data.user_sign});
				changeLogin(true);
				$loginEle.hide();
				myPrice();
				$("div#hideEvent").trigger("click");
			}else{
				showErrorTip('请先同意隐私协议');
			}
		}
		else{
			$loginErr.text(data.msg);
			$.removeLocalStorage('infor');
		}
	},function(){
		$(vm).prop('disabled',false);
		$(vm).removeClass('disabled');
	})
};
var formCheck = $loginEle.checkForm({submit:submit,type:1,showErrorTip:showErrorTip});
/*登录处理--结束*/

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
	$.sendReq(api.logout, 'Post', data, function(data) {
		if(data.code == 0) { //退出成功
			$.removeLocalStorage('infor');
			changeLogin(false);
			myPrice();
			formCheck.initData();
		} else {
			showErrorTip(data.msg);
		}
	});
});

/*退出登录--结束*/

module.exports = showLogin;