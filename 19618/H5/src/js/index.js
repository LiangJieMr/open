$(function(){
	module.exports = {
		redlottery: redlottery,
		rainCountDown: rainCountDown,
		getServer: getServer
	};
	/*接口*/
	var api = {
		shareItem: '/api/info/shareItem', //获取分享文案信息接口
		timeStep: '/api/activity/timeStep', //活动时间阶段
		redlottery: '/api/activity/redlottery', //活动抽奖
		getCenter: '/api/activity/getCenter', //获取指定学习中心列表
		judgeAcTime: '/api/activity/judgeAcTime', //判断集赞时间和红包雨时间
		getTdk: '/api/activity/getTdk', //获取TDK配置信息
		judgeLottery: '/api/activity/judgeLottery', //判断用户抽奖资格
	}
	/*接口*/
	
	var changeLogin = require('./core/changeLogin');
	var showLogin = require('./core/login');
	var fastClick = require('./core/fastclick');
	fastClick.attach(document.body)
	var body = document.body || body;
	$.setStorage('190618type', '');
	/*图片懒加载*/
	$.lazyImg('lazy');
	/*图片懒加载*/
	
	/*两端切换*/
	var locObj = window.location;
	var search = locObj.search;
	var origin = locObj.origin;
	var hostname = locObj.hostname;
	if(!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		switch(hostname){
			case 'test.iopen.com.cn':
			window.location.href = "http://10.100.136.243:8000/activity/190828.html";
			break;
			case 'm.open.com.cn':
			window.location.href = "http://www.open.com.cn/activity/190828.html";
			break;
			case 'm.iopen.com.cn':
			window.location.href = "http://www.open.com.cn/activity/190828.html";
			break;
		}
	}
	/*环境变量*/
	var evn = require('./config');
	var envType = evn['NODE_ENV'];
	/*环境变量*/
	/*两端切换*/

	/*登录注册按钮--开始*/
	$("body").on("click","#loginBtn",function(){
		changeLogin(true);
	});
	/*登录注册按钮--结束*/
	
	/*专题分享*/
	$.sendReq(api.shareItem, 'get', {ac_id: 8}, function(res){
		if (res.code == 0) {
			var $wxMasker = $('#wxMasker');
			$("body").on("click", "#weibo", function() {
				shareToWb(res.data)
			}),
			$("body").on("mouseenter", "#weixin", function() {
				$wxMasker.fadeIn()
			}),
			$("body").on("mouseleave", "#weixin", function() {
				$wxMasker.fadeOut()
			}),
			$("body").on("click", "#Qq", function() {
				shareToQQ(res.data)
			})
			function shareToWb(data){
				var protocol = window.location.protocol;
				var host = window.location.host;
				var title = data.share_words;
				var url = protocol + '//' + host + '/activity/' + ((envType== 'production') ? '190828.html' : '190828.html');
				
				var picurl = protocol + '//' + host + data.img_url;
				var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+(encodeURI(title))+'&url='+(encodeURI(url))+'&sourceUrl='+(encodeURI(url))+'&content=utf-8&sourceUrl='+url+'&pic='+(encodeURI(picurl));
				
				window.open(sharesinastring);
			};
			
			function shareToQQ(data){
				var desc = data.share_words;
				var title = '来奥鹏教育，圆你大学梦想！';
				var summary = '奥鹏教育';
				var protocol = window.location.protocol;
				var host = window.location.host;
				var url =  protocol + '//' + host + '/activity/' + ((envType== 'production') ? '190828.html' : '190828.html');
				var picurl = protocol + '//' + host + data.img_url;
				var shareqqzonestring='https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?desc='+(encodeURI(desc))+'&title='+(encodeURI(title))+'&summary='+(encodeURI(summary))+'&url='+(encodeURI(url))+'&pics='+(encodeURI(picurl));
				window.open(shareqqzonestring);
			};
		}
	})
	
	/*专题分享*/
	
	/*初始化接口--开始*/
	$.sendReq(api.judgeAcTime, 'get', {ac_id: 8}, function(res){
		if (res.code == 0) {
			var time_note = res.data
			if (time_note.laud_note == 1)  {
				$('.nav-item-1').show();
			} else if (time_note.laud_note == 2) {
				$('.nav-item-2').show();
				$('.active-end ').show();
			}
			if (time_note.red_note == 1)  {
				$('.nav-item-3').show();
				var $item1 = $('.active-item-1').clone();
				$('.active-item-2').after($item1);
				$('.active-item-1').eq(0).remove();
				$(".money").hide();
			} else if (time_note.red_note == 2) {
				$('.nav-item-4').show();
			}
		}
	})
	$.sendReq(api.getTdk, 'get', {ac_id: 8}, function(res){
		if (res.code == 0) {
			$("title").html(res.data.tdk_title); 
			$('[name="keywords"]').attr('content', res.data.tdk_keyword);
			$('[name="description"]').attr('content', res.data.tdk_description);
		}
	})
	$.sendReq(api.getCenter, 'get', {ac_id: 8}, function(res){
		if (res.code == 0) {
			for (var i =0; i< res.data.length; i++) {
				$('.list').append('<li><p>'+res.data[i]+'</p></li>')
			}
			/*图片懒加载*/
			$.lazyImg('lazy');
			/*图片懒加载*/
		}
	})
	/*学习中心滚动名单--开始*/
//	setInterval(function(){
//		autoScroll('.list-content')
//	}, 2000);
//	function autoScroll(obj) {
//  $(obj).find(".list").animate({
//      marginTop: "-0.2rem"
//  }, 500, function() {
//		$(this).css({
//        marginTop: "0"
//    }).find("li:first").appendTo(this);
//  })
//	}
	/*学习中心滚动名单--结束*/
	/*初始化接口--结束*/
	
	/*关闭弹出框--开始*/
	$(body).on('click', '.cls', function(){
		initDialog();
		var res = timeStep();
	})
	$(body).on('click', '.clss', function(){
		initDialog();
		$.setStorage('190618type', '');
		$('.gift').hide();
		$('.gift-mask').hide();
	})
	$(body).on('click', '.sure', function(){
		$.setStorage('190618type', '');
		window.location.href="/dist/studentSubsidies"
	})
	$(body).on('click', '.make', function(){
		initDialog();
	})
	/*关闭弹出框--结束*/
	
	/*初始化弹出框--开始*/
	function initDialog () {
		$('.msg').find('h4').hide().end().find('p').hide();
		$('.dialong-temp').hide();
		$('.mask').hide();
		$('.gift-mask').hide();
	}
	function showDialog (el) {
		$('.'+el).show();
		$('.mask').show();
	}
	/*初始化弹出框--结束*/
	
	/*我的助学金--开始*/
	$(body).on('click', '.my-coupon', function(){
		if ($.getStorage('infor')) {
			window.location.href="/dist/studentSubsidies"
		} else {
			$.setStorage('190618', 'coupon');
			changeLogin(true);
		}
	})
	/*我的助学金--结束*/
	
	/*倒计时弹出层--开始*/
	var countDownNum = 5;
	var timer
	function rainCountDown() {
		var res = timeStep();
		if (res.step_status == 5) {
			countDown = res.time_long - 5;
			$span.text(countDown);
			if (countDown <= 6) {
				initDialog();
				showDialog('msg');
				$(".msg h4").show().text('本场次活动已结束');
				return;
			}
		}

		initDialog();
		showDialog('count-down');
		timer = setInterval(function(){
			countDownNum--;
			$('.count-down span').text(countDownNum);
			if (countDownNum <= 0) {
				initDialog();
				clearInterval(timer);
				showDialog('rain');
				countDownInterval();
				renderRed();
			}
		}, 1000)
	}
	
	/*倒计时弹出层--结束*/
	
	/*进入红包雨--开始*/
	$(body).on('click', '.begin', function (){
		var res = timeStep();
		if (res.step_status == 0) {
			initDialog();
			showDialog('msg');
			$(".msg h4").show().text('本场次活动已结束');
			return;
		}
		if (res.step_status == 5) {
			countDown = res.time_long - 5;
			$span.text(countDown);
		} else {
			countDown = 30;
			$span.text(countDown);
		}
		countDownNum = 5;
		$('.count-down span').text(5)
		initDialog();
		showDialog('count-down');
		rainCountDown();
	})
	/*进入红包雨--结束*/
	
	/*红包雨开始*/
	var countDown = 30;
	var countDownTime = null;
	var $span = $('.progress-bar').find('span');
	var $currentProgress = $('.current-progress');
	var ProgressSize = 0;
	/*封装活动时间阶段--开始*/
	function timeStep () {
		var obj = {}
		$.ajax({
			url: api.timeStep,
			type: 'get',
			async:false,
			dataType: 'json',
			data: {ac_id: 8},
			success: function(res) {
				if(res.code == 0) {
					for(var key in res.data) {
						obj[key] = res.data[key];
					}
				}
			},
			error: function (err) {
				console.log(err)
			}
		});
		return obj;
	}
	/*封装活动时间阶段--结束*/
	
	/*活动开启弹窗--开始*/
	function activityBegin() {
		var res = timeStep();
		if (res.step_status == 2 || res.step_status == 5) {
			initDialog();
			if ($.getStorage('infor')) {
				$.sendReq(api.judgeLottery, 'get', {ac_id: 8, user_sign:$.getStorage('infor')['user_sign']}, function(res){
					if(res.code ==0){
						if (res.data.is_lottery == 1){
							showDialog('count-down');
							rainCountDown();
						} else {
//							showDialog('begin');
						}
					} else if (res.code == 400001306 || res.code == 400001326) {
						$.removeLocalStorage('infor');
						$.removeLocalStorage('190618');
						changeLogin(false);
					  showLogin(res.msg);
					  rainCountDown();
					}
				})
			} else {
				showDialog('count-down');
				rainCountDown();
			}
		}
	}
	/*活动开启弹窗--结束*/
	var num = 0;
	var RedBStatus = true;
	function RedB(){
		if (!RedBStatus) {
			return;
		}
		 var win = (parseInt($(".rain").css("width")));
			num++;
			var hb = parseInt(Math.random() * (3 - 1) + 1);
			var Wh = parseInt(Math.random() * 1 + 0.6);
			var Left = parseInt(Math.random() * (win - 0) + 0);
			var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";
			$('.rain').append("<p class='li" + num + "' ><img src='./assets190828/img/re-m.png' alt='' class='rain-gift get-gift'/></p>");
			$(".li" + num).css({
				"left": Left,
			});
			$(".li" + num + " img").css({
				"width": Wh + 'rem',
//				"transform": "rotate(" + rot + ")",
//				"-webkit-transform": "rotate(" + rot + ")",
//				"-ms-transform": "rotate(" + rot + ")", /* Internet Explorer */
//				"-moz-transform": "rotate(" + rot + ")", /* Firefox */
//				"-webkit-transform": "rotate(" + rot + ")",/* Safari 和 Chrome */
//				"-o-transform": "rotate(" + rot + ")" /* Opera */
			});	
			$(".li" + num).animate({'top':$(window).height()+20},6000,function(){
				//删掉已经显示的红包
				$(this).remove()
			});
			setTimeout(RedB,200);
	}
	/*游戏进度条--开始*/
	function countDownInterval(){
		var res = timeStep();
		if (res.step_status == 5) {
			$currentProgress.css({
				'width': 2.69 - 2.69  * (30 - countDown)/30 + 'rem'
			})
		} else {
			$currentProgress.css({
				'width': '2.69rem'
			})
		}
		countDownTime = setInterval(function(){
		countDown--;
		$span.text(countDown);
		ProgressSize = 30 - countDown;
		$currentProgress.css({
			'width': 2.69 - 2.69 * ProgressSize/30 + 'rem'
		})
			if (countDown <= 0) {
				RedBStatus = false;
				clearInterval(countDownTime);
				$('.rain p').remove();
				$span.text(0);
				initDialog();
				if ($.getStorage('infor')) {
					$.sendReq(api.judgeLottery, 'get', {ac_id: 8, user_sign:$.getStorage('infor')['user_sign']}, function(res){
						if(res.code ==0){
							if (res.data.is_lottery == 1){
								showDialog('begin');
							}else if (res.code == 400001306 || res.code == 400001326) {
								$.removeLocalStorage('infor');
								$.removeLocalStorage('190618');
								changeLogin(false);
							  showLogin(res.msg);
							}
						}
					})
				} else {
					showDialog('begin');
				}
				if ($.getStorage('190618type') == 'gift') {
					$('.gift').removeClass('bounceIn');
					showDialog('gift');
					$('.gift-mask').show();
				}
			}
		}, 1000)
	}
	/*游戏进度条--结束*/
	/*初始化红包雨--开始*/
	function initRain (){
		clearInterval(countDownTime);
		$('.rain-gift').remove();
		countDown = 30;
		$span.text(0);
	}
	/*初始化红包雨--结束*/
	function renderRed() {
		RedBStatus = true;
		RedB();
	}
	/*红包雨结束*/

/*抢红包--开始*/
var resMsg = {
	400001649: ['非常抱歉，因活动太火爆，造成网络繁忙！','程序员小哥哥正在补救中，请稍等片刻......'
	],
	400001653: ['本活动仅限奥鹏教育的新学员参与哟！','更多活动敬请期待！'],
	400001681:['红包雨活动目前暂未开启', '开启时段为9点，13点，17点，21点哦！'],
	400001680: ['本次活动已结束，更多活动敬请关注', '奥鹏教育微信公众号与奥鹏教育官网'],
	400001694: ['非常抱歉！酷夏红包雨活动已结束！','更多精彩活动，请继续关注我们哦！']
}
$(body).on('click', '.get-gift', function(){
	if ($.getStorage('infor')) {
		redlottery();
	} else {
		$.setStorage('190618', 'getGift')
		changeLogin(true);
	}
})
$('.get-gift').click(function(){
	alert(111)
})
function redlottery() {
	$.sendReq(api.redlottery, 'POST', {
		user_sign: $.getStorage('infor')['user_sign'],
		ac_id: 8,
		platform: 2
	}, function(res){
		if(res.code == 0) {
//			initDialog();
//			showDialog('begin');
//			showDialog('mask');
//			initRain();
			$.setStorage('190618type', 'gift');
			$('.gift').removeClass('super-gift').addClass('bounceIn');
			showDialog('gift');
			if (res.data.prize_degree == 1) {
				$('.gift').addClass('super-gift')
			}
			$('.gift-mask').show();
			$('.gift').find('h4').text(res.data.prize_title)
			.end().find('p').text(res.data.prize_content).end()
			.find('.gift-img').attr('src', './assets190828/img/'+res.data.prize_degree+'.png')
		} else if (res.code == 400001693 || res.code == 400001647 || res.code == 400001684 || res.code == 400001646){
			initDialog();
			showDialog('msg');
			$(".msg h4").show().text(res.msg);
			initRain();
		}else if(res.code == 400001680){
			toast(resMsg['400001680'])
		}else if(res.code == 400001681){
			toast(resMsg['400001681'])
		}else if (res.code == 400001653){
			toast(resMsg['400001653'])
		}else if(res.code == 400001694){
			toast(resMsg['400001694'])
		} else if(res.code == 400001649){
			toast(resMsg['400001649'])
		} else if (res.code == 400001306 || res.code == 400001326) {
			$.removeLocalStorage('infor');
			$.removeLocalStorage('190618');
			$.removeLocalStorage('190618type');
		  changeLogin(true);
		} else {
			initDialog();
			showDialog('msg');
			$(".msg h4").show().text(res.msg);
		}
	})
}

function toast(msg){
	initDialog();
	showDialog('msg');
	for (var i= 0; i< msg.length; i++) {
		$(".msg p").eq(i).show().text(msg[i]);
	}
	initRain();
}
/*抢红包--结束*/

/*更新当前状态--开始*/
var currentStateTime = null;
var currentState = null;
currentStateTime = setInterval(function(){
	currentState = timeStep();
	if (currentState.step_status == 2 || currentState.step_status == 5) {
		activityBegin();
		clearInterval(currentStateTime);
	}
	}, 1000)
/*更新当前状态--结束*/
/*场次刷新页面--开始*/
function getServer() {
	var sceneInterval = null;
	sceneInterval = setInterval(function(){
		if ($.getStorage('infor')) {
			$.sendReq(api.judgeLottery, 'get', {ac_id: 8, user_sign:$.getStorage('infor')['userSign']}, function(res){
				if(res.code ==0){
				} else if (res.code == 400001306 || res.code == 400001326) {
					window.location.href=''
				}
			})
		}
	},1000)
}
if ($.getStorage('infor')) {
	getServer()
}
/*场次刷新页面--开始*/
})
