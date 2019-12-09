var playBill = require('./playBill.js');
var globalMsg = require('./globalMsg.js');
var changeLogin =  require('./changeLogin.js');
var api = {
	boostPoster:'/api/activity/boostPoster',
	overdue:'/api/user/overdue',
	boostQrcode:'/api/activity/boostQrcode'
};
function assistance(){
	$(".assistance-popup").find('.ercode img').attr('src','./assets1911/img/logoBd.svg');
	var infor = $.getStorage('infor');
	var userSign = infor ? infor['user_sign'] : '';
	var phoneNum = infor ? infor['phone_num'] : '';
	var linkUrl = `${window.location.origin}/activity/zl191111.html&param=${JSON.stringify({phone:phoneNum})}`;
	var imgUrl  = `${api.boostQrcode}?ac_id=10&user_sign=${userSign}&location_url=${linkUrl}`;
	var copyUrl = `${window.location.origin}/activity/zl191111.html?phone=${phoneNum}`;
	$('.assistance-popup').find("#linkVal").val(copyUrl);
	$.sendReq(api.overdue,'post',{user_sign:userSign},function(data){
		if(data.code == 0){
			$(".assistance-popup").find('.ercode img').attr('src',imgUrl);
			$('.assistance-popup').show();
		}
		else{
			$.removeLocalStorage('infor');
			globalMsg(data.msg);
			changeLogin();
		}
	});
	
	
};

/*点击生成海报-开始*/
$('.assistance-popup .get-plybill button').on('click',function(){
	$(".assistance-popup").hide();
	playBill();
});
/*点击生成海报-结束*/

/*好友助力邀请关闭-开始*/
$('.assistance-popup .close').on('click',function(){
	$(".assistance-popup").hide();
});
/*好友助力邀请关闭-结束*/

/*复制链接-开始*/
$('.assistance-popup #copyLink').on('click',function(){
	$(this).prev().select();
	document.execCommand("Copy");
	globalMsg('复制成功!');
	$('.assistance-popup .close').trigger('click');
	
});
/*复制链接-结束*/

module.exports = assistance;
