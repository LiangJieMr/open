$(function(){
	/*两端切换*/
$("img.lazy").lazyload({
		placeholder: "../assets181212/img/logoBd2.svg",
		effect: "fadeIn",
		threshold: 200,
});
var locObj = window.location;
var search = locObj.search;
var origin = locObj.origin;
var hostname = locObj.hostname;
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
	switch(hostname){
		case '10.100.136.243':
		window.location.href = "http://test.iopen.com.cn/activity/181212.html";
		break;
		case 'www.open.com.cn':
		window.location.href = "http://m.open.com.cn/activity/181212.html";
		break;
	}
}
	var evn = require('./config');
	var envType = evn['NODE_ENV'];
	var $wxMasker = $('#wxMasker');
	var regExpNum=/\D/g;
	$('body').on('keyup', '#user_number', function(){
		var value = $(this).val();
		$(this).val(value.replace(regExpNum, ""));
		$(this).val($(this).val().substr(0,11));
	})
	$('body').on('keyup', '#name', function(){
		var value = $(this).val();
		$(this).val(value.replace(regExpNum, ""));
		$(this).val($(this).val().substr(0,11));
	})
	
	$("body").on("click", "#weibo", function() {
		shareToWb()
	}),
	$("body").on("mouseenter", "#weixin", function() {
		$wxMasker.fadeIn()
	}),
	$("body").on("mouseleave", "#weixin", function() {
		$wxMasker.fadeOut()
	}),
	$("body").on("click", "#Qq", function() {
		shareToQQ()
	})
	function shareToWb(){
		var protocol = window.location.protocol;
		var host = window.location.host;
		var title = '双十二学历教育盛典，报名有惊喜，奥鹏送好礼，中奖率100%，来奥鹏教育，圆你大学梦想！';
		var url = protocol + '//' + host + '/activity/' + ((envType== 'production') ? '181212.html' : '181212.html');
		
		var picurl = protocol + '//' + host + '/activity/assets181212/img/top_01.jpg';
		var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+(encodeURI(title))+'&url='+(encodeURI(url))+'&sourceUrl='+(encodeURI(url))+'&content=utf-8&sourceUrl='+url+'&pic='+(encodeURI(picurl));
		
		window.open(sharesinastring);
	};
	
	function shareToQQ(){
		var desc = '双十二学历教育盛典，报名有惊喜，奥鹏送好礼，中奖率100%，来奥鹏教育，圆你大学梦想！';
		var title = '来奥鹏教育，圆你大学梦想！';
		var summary = '奥鹏教育';
		var protocol = window.location.protocol;
		var host = window.location.host;
		
		var url =  protocol + '//' + host + '/activity/' + ((envType== 'production') ? '181212.html' : '181212.html');
		var picurl = protocol + '//' + host + '/activity/assets181212/img/top_01.jpg';
		var shareqqzonestring='https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?desc='+(encodeURI(desc))+'&title='+(encodeURI(title))+'&summary='+(encodeURI(summary))+'&url='+(encodeURI(url))+'&pics='+(encodeURI(picurl));
		window.open(shareqqzonestring);
	};
	require('./open.js');
	require('./core/footer');
	var changeLogin = require('./core/changeLogin');
	$.getStorage('infor') ? changeLogin(true) : changeLogin(false);
	var showLogin = require('./core/pclogin');
	var showErrorTip = require('./core/errorTip');
	/*登录注册按钮--开始*/
	$("body").on("click","#loginBtn",function(){
		showLogin(showErrorTip);
	});
	/*登录注册按钮--结束*/
	var Store = {
	setStorage: function(key, value) {
        localStorage[key] = encodeURIComponent(JSON.stringify(value));
    },
    getStorage: function(key) {
        var data = localStorage[key];
       	var items = null;
        if (!data || data === "null") {
            return null;
        }
        try {
				items = decodeURIComponent(decodeURIComponent(data));
			} catch(e) {
				try {
					items = decodeURIComponent(data);
				} catch(e) {
					items = data;
				}
			}
        return JSON.parse(items);
    },
    removeLocalStorage: function(key){
        localStorage.removeItem(key);
    }
}
var api = {
	winners: '/api/activity/winners',
	address: '/api/activity/address',
	myprize: '/api/activity/myprize',
	phone: '/api/activity/phone',
	grade: '/api/activity/grade',
	init: '/api/activity/init',
	send: '/api/activity/send',
	deliver: '/api/activity/deliver'
}
/*页面初始化*/
var cd;
/*变量声明*/
var activitybegin;
var activityend;
var currenttime;
var stime;
var copywritingData;
init()
function init() {
	$.ajax({
	type: "post",
	url: api.init,
	async:true,
	dataType: 'json',
	success: function(res){
		if (res.code == 0) {
			/*倒计时*/
			var countDownTime;
			currenttime = new Date(res.data.now_time).getTime();
			activitybegin = new Date(res.data.start_time).getTime();
			activityend = new Date(res.data.end_time).getTime();
			var list = res.data.list;
			var $name = $('.name');
			var $p = $('.baner-desc');
			var $span = $('.tit');
			var swiperWrapper='';
			copywritingData = {
				1: {
					title: list[0].prize_grade,
					name: list[0].prize_name,
					src: './assets181212/img/present-one.png',
					content: '恭喜您获得'+list[0].prize_grade+'，速速填写联系方式，工作人员给您派奖！'
				},
				2: {
					title: list[1].prize_grade,
					name: list[1].prize_name,
					src: './assets181212/img/present-two.png',
					content: '恭喜您获得'+list[1].prize_grade+'，速速填写联系方式，工作人员给您派奖！'
				},
				3: {
					title: list[2].prize_grade,
					name: list[2].prize_name,
					src: './assets181212/img/present-three.png',
					content: '恭喜您获得'+list[2].prize_grade+'，速速填写联系方式，工作人员给您派奖！'
				},
				4: {
					title: list[3].prize_grade,
					name: list[3].prize_name,
					src: './assets181212/img/present-four.png',
					content: '恭喜您获得'+list[3].prize_grade+'，速速填写联系方式，工作人员给您派奖！'
				}
			}
			swiperWrapper ='<div class="swiper-slide"><img src="./assets181212/img/present-banner-one.png" alt="" /><strong><span>'+
				list[0].prize_grade+'</span>（1名）</strong><p class="baner-desc">'+list[0].prize_name+'</p></div>'+
				'<div class="swiper-slide"><img src="./assets181212/img/present-banner-two.png" alt="" />'+
				'<strong><span>'+list[1].prize_grade+'</span>（2名）</strong><p class="baner-desc">'+list[1].prize_name+'</p></div>'+
				'<div class="swiper-slide"><img src="./assets181212/img/present-banner-three.png" alt="" /><strong><span>'+list[2].prize_grade+'</span>（不限量）</strong><p class="baner-desc">'+list[2].prize_name+'</p></div>'+
				'<div class="swiper-slide"><img src="./assets181212/img/present-banner-four.png" alt="" />' +
				'<strong><span>'+list[3].prize_grade+'</span>（不限量）</strong><p class="baner-desc">'+list[3].prize_name+'</p></div>'
			$('.swiper-wrapper').append(swiperWrapper)
			var swiper = new Swiper('.swiper-container', {
			   	pagination: '.pagination',
			    loop:true,
			    grabCursor: true,
			    paginationClickable: true,
			    autoplay: 3000,
			    autoplayDisableOnInteraction : false
		    });
		    $('.swiper-button-prev').on('click', function(e){
			    e.preventDefault()
			    swiper.swipePrev()
			})
			$('.swiper-button-next').on('click', function(e){
			    e.preventDefault()
			    swiper.swipeNext()
			})
			for (var i=0; i<list.length; i++) {
				$p.eq(i%3).text(list[i].prize_name);
				$span.eq(i).text(list[i].prize_grade);
				switch(i){
					case 0: $name.eq(0).text(list[i].prize_grade); break;
					case 1: $name.eq(3).text(list[i].prize_grade);$name.eq(7).text(list[i].prize_grade); break;
					case 2: $name.eq(2).text(list[i].prize_grade);$name.eq(5).text(list[i].prize_grade); break;
					case 3: $name.eq(1).text(list[i].prize_grade);$name.eq(4).text(list[i].prize_grade); $name.eq(6).text(list[i].prize_grade);break;
				}
			}
			if (activitybegin>currenttime) {
				stime = activitybegin - currenttime;
				countDown(stime)
				cd= setInterval(function(){
					countDownTime = countDown(stime)
					renderTime([{e:$('.d'), type:'d'}, {e:$('.h'), type:'h'}, {e:$('.m'), type:'m'}, {e:$('.s'), type:'s'}],countDownTime, 'e', 'type')
				}, 1000)
			} else if (activityend > currenttime) {
				stime = activityend - currenttime
				$('.count-down-t').text('距活动结束还剩 ')
				countDown(stime)
				cd= setInterval(function(){
					countDownTime=countDown(stime)
					renderTime([{e:$('.d'), type:'d'}, {e:$('.h'), type:'h'}, {e:$('.m'), type:'m'}, {e:$('.s'), type:'s'}],countDownTime, 'e', 'type')
				}, 1000)
			} else {
				$('.time').html('活动已结束')
			}
		} else if (res.code == 400001306 || res.code==40000123000) {
				initCbtnGift()
			}
	},
	error: function (err) {
		
	}
});
}
/*获取奖品列表*/

function getmyprize(u) {
	$.ajax({
		type:"get",
		url: api.myprize,
		async:true,
		dataType: 'json',
		data: {
			user_sign: u
		},
		success: function(res) {
			if (res.code == 0) {
				var data= res.data
				$('.my-gift').show();
				var index;
				var $span= $('.my-content').find('span');
				$span.eq(0).text(data.prize_grade);
				$span.eq(2).text(data.address_name);
				$span.eq(1).text(data.prize_name);
				$span.eq(3).text(data.phone);
				$span.eq(4).text(data.address ? data.address: '未填写');
				if(!data.address) {
					$span.eq(4).css('color', '#6d3df5')
				} else {
					$span.eq(4).css('color', '#000')
				}
				var srcData = {
					1: './assets181212/img/present-banner-one.png',
					2: './assets181212/img/present-banner-two.png',
					3: './assets181212/img/present-banner-three.png',
					4: './assets181212/img/present-banner-four.png'
				}
				$('.my-gift').find('img').attr('src',srcData[+res.data.gift_id])
				switch(+res.data.gift_id) {
					case 1: index= 0;break;
					case 2: index = [4,7][mathRandomTwo];break;
					case 3: index = [2,6][mathRandomTwo];break;
					case 4: index = [1,3,5][mathRandomThree];break;
				}
				lottery.index = $.getStorage('giftGrade') || index ;
				$('.draw-btn').attr({'href': '#my', 'isGift': true}).find('span').text('查看奖品');
				$('.slider-outer a[href="#my"]').parent().show()
			} else if (res.code == 400001306 || res.code==40000123000) {
				initCbtnGift()
			}
		},
		error: function(err) {
			
		}
	});
}
module.exports = getmyprize;
//
/*获取获奖名单*/
var getGContentLength = 0;
getwinners();
var str ='';
function getwinners() {
	$.ajax({
		type: "get",
		url: api.winners,
		dataType: 'json',
		async:true,
		success: function(res) {
			if (res.code == 0) {
				$('.list-content').css('display','none');
				$('.no-person').css('display','none');
				var $list;
				if (res.data instanceof Array) {
					$list=[]
				} else {
					$list = res.data.list
				}
				if ($list.length) {
					$('.get-g-content').html('')
					for(var i=0; i<res.data.list.length; i++) {
						str+= "<li><span>"+res.data.list[i].phone+"</span>&nbsp;&nbsp;<span class='j'>"+res.data.list[i].prize_grade+"</span></li>"
					}
					currenttime = new Date(res.data.time).getTime();
					$('.list').append(str);
					$('.get-count').text('已有'+res.data.count+'人参与抽奖');
					$('.list-content').css('display','block');
				} else {
					$('.no-person').css('display','block');
				}
			} else if (res.code == 400001306 || res.code==40000123000) {
				initCbtnGift()
			}
		},
		error: function(err) {
			
		}
	});
}
/*获奖名单滚动*/
function autoScroll(obj) {
    $(obj).find(".list").animate({
        marginTop: "-32px"
    }, 500, function() {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    })
}

setInterval(function(){
	autoScroll('.list-content')
}, 2000);


setInterval(function(){
	getwinners();
	
}, 30000)
setInterval(function(){
	if (currenttime>activitybegin) {
		$.ajax({
		type: "get",
		url: api.winners,
		dataType: 'json',
		async:true,
		success: function(res) {
			if (res.code == 0) {
				var $list;
				if (res.data instanceof Array) {
					$list=[]
				} else {
					$list = res.data.list
				}
				if ($list.length) {
					$('.get-count').text('已有'+res.data.count+'人参与抽奖');
					$('.list-content').css('display','block');
				} else {
					$('.no-person').css('display','block');
				}
			} else if (res.code == 400001306 || res.code==40000123000) {
				initCbtnGift()
			}
		},
		error: function(err) {
			
		}
	});
	}
	
},1000)
/*奖品等级*/
var giftGrade;
var lottery = {
	index: -1,    //当前转动到哪个位置，起点位置
	count: 0,     //总共有多少个位置
	timer: 0,     //setTimeout的ID，用clearTimeout清除
	speed: 20,    //初始转动速度
	times: 0,     //转动次数
	cycle: 50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize: -1,    //中奖位置
	init: function(id) {
		if ($('#' + id).find('.lottery-unit').length > 0) {
			$lottery = $('#' + id);
			$units = $lottery.find('.lottery-unit');
			this.obj = $lottery;
			this.count = $units.length;
			$lottery.find('.lottery-unit.lottery-unit-' + this.index).addClass('active');
		};
	},
	roll: function() {
		var index = this.index;
		var count = this.count;
		var lottery = this.obj;
		$(lottery).find('.lottery-unit.lottery-unit-' + index).removeClass('active');
		index += 1;
		if (index > count - 1) {
			index = 0;
		};
		$(lottery).find('.lottery-unit.lottery-unit-' + index).addClass('active');
		this.index = index;
		return false;
	},
	stop: function(index) {
		this.prize = index;
		return false;
	}
};

function roll() {
	lottery.times += 1;
	lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
	
	if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
		clearTimeout(lottery.timer);
		lottery.prize = -1;
		lottery.times = 0;
		click = false;
		resultGift (giftGrade);
		$.ajax({
			type: "post",
			url: api.send,
			async:true,
			dataType: 'json',
			data: {
				user_sign: $.getStorage('infor')['userSign'],
				phone: $.getStorage('infor')['phoneNum'],
				gift_id: giftGrade
			},
			success: function(res){
				console.log(res.msg)
			},
			error: function(err){
				console.log(err)
			}
		});
		$('.draw-btn').attr({'href': '#my', 'isGift': true}).find('span').text('查看奖品')
	} else {
		if (lottery.times < lottery.cycle) {
			lottery.speed -= 10;
		} else if (lottery.times == lottery.cycle) {
//			getgrade();
		} else {
			if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
				lottery.speed += 110;
			} else {
				lottery.speed += 20;
			}
		}
		if (lottery.speed < 40) {
			lottery.speed = 40;
		};
		lottery.timer = setTimeout(roll, lottery.speed); //循环调用
	}
	return false;
}
/*获取奖品*/
if ($.getStorage('infor')) {
	getmyprize($.getStorage('infor')['userSign'])
}

/*获奖弹出层显示*/
function resultGift (i) {
	var index = i;
	var data = copywritingData[index];
	$('.mask').show()
	$('.result-gift').find('h4').text(data.title).end().find('p').eq(0).text(data.name).end().end().find('p').eq(1)
	.text(data.content).end().end().find('img').attr('src', data.src).end().show()
}
var click = false;

window.onload = function(){
	lottery.init('lottery');
	$('.draw-btn').click(function() {
		var infor = $.getStorage('infor')
		if (!infor) {
			$('.enter').val('')
			$('.login-msg').text('')
			showLogin(showErrorTip);
			return;
		}
		if (!!$('.draw-btn').attr('isGift')) {
			return;
		}
	
		if (click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
			return false;
		} else {
			getgrade()
		}
	});
};

/*随机数*/
var mathRandomTwo= Math.floor(Math.random()*2);
var mathRandomThree = Math.floor(Math.random()*3)
/*抽奖*/
function getgrade () {
	$.ajax({
		type: 'post',
		url: api.grade,
		dataType: 'json',
		data: {
			user_sign: $.getStorage('infor')['userSign'],
			activity_id: 1,
			platform: 1
		},
		success: function(res) {
			if (res.code== 0){
				switch(+res.data.gift_id) {
					case 1: lottery.prize = 0;break;
					case 2: lottery.prize = [4,7][mathRandomTwo];break;
					case 3: lottery.prize = [2,6][mathRandomTwo];break;
					case 4: lottery.prize = [1,3,5][mathRandomThree];break;
				}
				var userInfo = {
					userName: res.data.user_name,
					phone: res.data.phone
				}
				$.setStorage('userInfo', userInfo)
				giftGrade = +res.data.gift_id;
				$.setStorage('giftGrade', lottery.prize)
				lottery.speed = 100;
				roll(); //转圈过程不响应click事件，会将click置为false
				click = true; //一次抽奖完成后，设置click为true，可继续抽奖
				return false;
			} else {
				var $phone = $.getStorage('infor')['phoneNum']
				if (res.code== 400001639) {
					$('.form-two .res-msg').text('活动暂未开始，请留下您的联系方式，稍后会有学业顾问老师与您联系！')
					$('.form-two-msg').text('')
					$('.form-two-phone').text($phone)
					$('input[type=radio]:checked').attr('checked', false)
					showDialog(['mask', 'form-two'])
				} else if (res.code== 400001638 || res.code== 400001643) {
					showDialog(['mask', 'old-open'])
				} else if (res.code== 400001640) {
					$('input[type=radio]:checked').attr('checked', false)
					$('.form-two-msg').text('')
					$('.form-two-phone').text($phone)
					$('.form-two .res-msg').text('对不起，您还未获得抽奖资格。留下您的联系方式，稍后会有学业顾问与您联系！')
					showDialog(['mask', 'form-two'])
				} else if (res.code == 400001306 || res.code==40000123000) {
					initCbtnGift()
					showDialog(['mask', 'login'])
				} else  if (res.code == 400001637) {
					$('.res-message').find('p').text(res.msg)
					showDialog(['mask', 'res-message'])
				} else {
					showErrorTip(res.msg)
				}
			}
		},
		error: function (err) {
			
		}
	})
}
 //锚点跳转滑动效果  
$('body').on('click','a[href*=#],area[href*=#]' ,function() {  
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {  
        var $target = $(this.hash);  
        $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');  
        if ($target.length) {  
            var targetOffset = $target.offset().top-10;  
            $('html,body').animate({  
                        scrollTop: targetOffset  
                    },  
                    200);  
            return false;  
        }  
    }  
})
/*表单提交*/
$('.submit').click(function(e){
	var $target = $(e.target)
	var $class= $target.parent().attr('class').split(' ')[0];
	var u = $.getStorage('infor')['userSign']
	var phonedata = {
		user_sign: u,
		level: $('input[type=radio]:checked').val(),
		sms_method: 2,
		url: window.location.href,
		phone: $.getStorage('infor')['phoneNum']
	}
	if($class == 'form-two') {
		$.ajax({
			type: 'post',
			url: api.phone,
			dataType: 'json',
			data: phonedata,
			success: function(res) {
				if (res.code == 0) {
					$('.form-two').hide()
					showDialog(['mask', 'new-open'])
				} else if (res.code == 400001306 || res.code==40000123000) {
					initCbtnGift()
				} else {
					$('.form-two-msg').text(res.msg)
				}
			},
			error: function(err) {
				
			}
		})
	} else {
		$.ajax({
			type: "post",
			url: api.address,
			dataType: 'json',
			async:true,
			data: {
				user_sign: u,
				name: $('.addressname').val() ,
				phone:$('.form-first-phone').val(),
				address: $('.textarea').val()
			},
			success: function(res) {
				if (res.code == 0) {
					getmyprize($.getStorage('infor')['userSign'])
					$('.form-first').hide();
					showDialog(['mask','submit-msg'])
				} else if (res.code == 400001306 || res.code==40000123000) {
					initCbtnGift()
				} else {
					$('.form-first-msg').text(res.msg)
				}
			},
			error: function(res) {
				
			}
		});
	}
})
/*关闭弹出层事件*/
$('body').on('click', '.cls', function(e){
	var $class = $(e.target).parent().attr('class').split(' ')[0];
	if ( $class== 'form-first' || $class == 'result-gift') {
		getmyprize($.getStorage('infor')['userSign'])
	}
	initDialog(['mask',$(e.target).parent().attr('class').split(' ')[0]])
})
$('body').on('click', '.close', function(e){
	var $class;
	try{
		$class= $(e.target).parent().attr('class').split(' ')[0]	
	}catch(e){
		//TODO handle the exception
	}
	initDialog(['mask', $class])
})
/*初始化抽奖按钮*/
function initCbtnGift() {
	Store.removeLocalStorage('infor')
	$('.draw-btn').attr({'href': 'javascript:void(0)', 'isGift': false}).find('span').text('立即抽奖');
}
/*初始化dialog*/
function initDialog(arr){
	for(var i=0; i<arr.length; i++) {
		$('.' + arr[i]).hide()
	}
}
/*显示弹出层*/
function showDialog(arr){
	for(var i=0; i<arr.length; i++) {
		$('.' + arr[i]).show()
	}
}
function renderTime (arr,timedata, key1, key2) {
	for (var j=0; j<arr.length; j++) {
		for(var i=0; i<arr[j][key1].length; i++) {
			$(arr[j][key1][i]).text(timedata[arr[j][key2]][i])
		}
	}
	
}
function countDown(t) {
    //定义变量 d,h,m,s保存倒计时的时间  
    var d,h,m,s;
    t-= 1000;
    stime = t;
    if (t >= 0) {  
         d = Math.floor(t/1000/60/60/24);  
         h = Math.floor(t/1000/60/60%24);  
         m = Math.floor(t/1000/60%60);  
         s = Math.floor(t/1000%60);                    
    }  else {
    	clearInterval(cd);
    	$('.count-down-t').text('距活动结束还剩 ')
    	init();
    	getwinners();
    	if (currenttime > activityend) {
    		$('.count-down').html('活动已结束')
    	}
    } 
    d = d<10? '0' + d: d ? String(d) : '00';
    h = h<10? '0' + h: h ? String(h) : '00';
    m = m<10? '0' + m: m ? String(m) : '00';
    s = s<10? '0' + s: s ? String(s) : '00';
    var timeData = {
    	d:d.split(''),
    	h:h.split(''),
    	m:m.split(''),
    	s:s.split('')
    }
    return timeData
}
/*修改收货地址*/
$('.modify').click(function(){
	$.ajax({
		type:"post",
		url: api.deliver,
		dataType: 'json',
		data: {
			user_sign: $.getStorage('infor')['userSign']
		},
		async:true,
		success: function(res){
			if (res.code == 0) {
				$('.address').val('');
				$('.msg').text('');
				var address= $('.my-gift').find('span').eq(4).text();
				$('.addressname').val($('.my-gift').find('span').eq(2).text())
				$('.textarea').val(address == '未填写'? '': address)
				$('.form-first-phone').val($('.my-gift').find('span').eq(3).text())
				showDialog(['mask', 'form-first'])
			} else {
				$('.res-message').find('p').text(res.msg)
				showDialog(['mask', 'res-message'])
			}
		},
		error: function(err){
			console.log(err)
		}
	});
	
})
/*添加收货地址*/
$('.register').click(function(){
	$('.addressname').val($.getStorage('userInfo')['userName'])
	$('.form-first-phone').val($.getStorage('userInfo')['phone'])
	initDialog(['result-gift'])
	showDialog(['form-first'])
})
/*灯光切换*/
var dtime=1000;
var horseRaceLamp;
var horseRaceLampSpeed = [10,30,20,40,50];
led()
function led () {
	var index= Math.floor(Math.random()*horseRaceLampSpeed.length);
	dtime-=horseRaceLampSpeed[index]
	var $span = $('.ul').find('span');
	for (var i=0; i<$span.length; i++){
		if ($span.eq(i).attr('class') == 'd0') {
			$span.eq(i).attr('class', 'd1')
		} else {
			$span.eq(i).attr('class', 'd0')
		}
	}
	if (dtime <=800) {
		dtime+=horseRaceLampSpeed[index]
	} else if (dtime >=1000) {
		dtime-=horseRaceLampSpeed[index]
	}
 	horseRaceLamp = setTimeout(function(){
 		led ()
 	}, dtime)
}
})
