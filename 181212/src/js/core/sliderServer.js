var $body = $('body');
var $lefty = $("#signBox");
var $lineBox = $(".server-lines");
var $wxBox = $(".net-weixin");
var winHeight = $(window).height();
var $goTopBtn = $('#goTop');

/*控制返回顶部按钮隐藏显示--开始*/
$(window).scroll(function() {
	var scrollTop = $(this).scrollTop() - 100;
	if(scrollTop > winHeight) {
		$goTopBtn.fadeIn();
	} else {
		$goTopBtn.fadeOut();
	}
});
/*控制返回顶部按钮隐藏显示--结束*/

/*返回顶部--开始*/
$body.on('click', "#goTop", function() {
	$("html,body").animate({
		scrollTop: 0
	}, 200);
});
/*返回顶部--结束*/

/*报名咨询关闭--开始*/
$body.on("click", "#signClose", function() {
	$lefty.animate({
		left: 1
	});
});
/*报名咨询关闭--结束*/

/*报名咨询鼠标进入--开始*/
$body.on("mouseenter", "#serverNum,.server-lines", function() {
	$lineBox.show()
	$lineBox.animate({
		left: -165
	}, 300);
});

$body.on("mouseenter", "#netWx,.net-weixin", function() {
	$wxBox.show()
	$wxBox.animate({
		left: -165
	}, 300);
});

$body.on("mouseleave", "#serverNum,.server-lines", function() {
	$lineBox.animate({
		left: 1
	}, 300, function() {
		$lineBox.hide();
	});
});

$body.on("mouseleave", "#netWx,.net-weixin", function() {
	$wxBox.animate({
		left: 1
	}, 300, function() {
		$wxBox.hide();
	});
});
/*报名咨询鼠标进入--结束*/

/*聊天窗口--开始*/
$('body').on('click', '.signWechatBtn', function() {
//	clickBtn('bmzx', 'menu_bmzx');
	NTKF.im_openInPageChat('kf_10225_1531102671297');
});
$('body').on('click', '.studyServeBtn', function() {
	window.open('http://webchat.openonline.com.cn/EliteWebChat/clientLogin.do?queue=1&urlFrom=web.learn.open.com.cn&loginName=anonymous&password=letmein');
});
/*聊天窗口--结束*/