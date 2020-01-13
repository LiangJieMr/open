var list = require('./winners.js');
var showErrorTip = require('./errorTip.js');
var changeStatus = require('./changeStatus.js');
var comEorror = require('./warmTip.js');
var winBox = require('./winPlayBox.js');
require('./open.js')
var wx = require('weixin-js-sdk');
var api = {
	time: '/api/activity/acTime',
	winners: '/api/activity/winnerList',
	address1: '/api/activity/addPrizeBase',
	myprize: '/api/activity/myPrize',
	delever: '/api/activity/deliver',
	giftlist: '/api/activity/giftList',
	commonprize: '/api/activity/commonprize',
	wx: window.location.protocol + '//www.open.com.cn/wx/token'
}
var curTime = '';
var endTime = '';
var startTime = '';
var forTimeSet = '';
var acTimeSet = '';
var step = '';
var anma = '';
var flag = true;
var adres = '';
var err2p = '';
/*获取我的奖品开始*/
function getMyPrize() {
	var myPrizeData = {
		user_sign: $.getStorage('infor')['user_sign'] || '',
		ac_id: 22
	}
	$.sendReq(api.myprize, 'POST', myPrizeData, function (res) {
		let { code, data, msg } = res;
		if (code == 0) {
			$('.myprize_name').html('');
			$('.myprize_con').html('');
			$('.myprize_img').attr({ 'class': 'myprize_img', 'src': '' });
			$('.myname').html('');
			$('.myphone').html('');
			$('.myprize_add').html('');
			if (data.length == 0) {
				$('.myprize').hide();
				$('.activity_rollpo').html('GO');
			} else {
				$('.myprize').show();
				if (data[0]['prize_degree'] == 1) {
					$('.activity_rollprize').find('img').css({ 'transform': 'rotate(0deg)' });
					$('.myprize_name').html('特等奖：');
					$('.myprize_con').html(`${data[0]['prize_name']}<br>（价值999元）`);
					$('.myprize_img').attr({ 'class': 'myprize_img topgrade', 'src': './assets191212/img/topgrade.png' })
					//抽奖按钮内容修改
					$('.activity_rollpointer').unbind("click").attr('href', '#myprize'); //移除click
					$('.activity_rollpo').html('<p>查看</p><p>奖品</p>');
				} else if (data[0]['prize_degree'] == 2) {
					$('.activity_rollprize').find('img').css({ 'transform': 'rotate(240deg)' });
					$('.myprize_name').html('一等奖：');
					$('.myprize_con').html(`${data[0]['prize_name']}<br>（价值699元）`);
					$('.myprize_img').attr({ 'class': 'myprize_img prize1', 'src': './assets191212/img/prize1.png' })
					//抽奖按钮内容修改
					$('.activity_rollpointer').unbind("click").attr('href', '#myprize'); //移除click
					$('.activity_rollpo').html('<p>查看</p><p>奖品</p>');
				} else if (data[0]['prize_degree'] == 3) {
					$('.activity_rollprize').find('img').css({ 'transform': 'rotate(280deg)' });
					$('.myprize_name').html('二等奖：');
					$('.myprize_con').html(`${data[0]['prize_name']}<br>（价值299元）`);
					$('.myprize_img').attr({ 'class': 'myprize_img prize2', 'src': './assets191212/img/prize2.png' })
					//抽奖按钮内容修改
					$('.activity_rollpointer').unbind("click").attr('href', '#myprize'); //移除click
					$('.activity_rollpo').html('<p>查看</p><p>奖品</p>');
				} else if (data[0]['prize_degree'] == 4) {
					$('.activity_rollprize').find('img').css({ 'transform': 'rotate(320deg)' });
					$('.myprize_name').html('三等奖：');
					$('.myprize_con').html(`${data[0]['prize_name']}<br>（价值129元）`);
					$('.myprize_img').attr({ 'class': 'myprize_img prize3', 'src': './assets191212/img/prize3.png' })
					//抽奖按钮内容修改
					$('.activity_rollpointer').unbind("click").attr('href', '#myprize'); //移除click
					$('.activity_rollpo').html('<p>查看</p><p>奖品</p>');
				} else {
					$('.activity_rollprize').find('img').css({ 'transform': 'rotate(120deg)' });
					$('.myprize').hide();
					$('.activity_rollpo').html('GO');
				}
				$('.myname').html('姓名：' + data[0]["address_name"]);
				$('.myphone').html('电话：' + data[0]["phone"]);
				$('.myprize_add').html('收货地址：' + data[0]["address"]);
				$('.addressname').val(data[0]["address_name"]);
				$('.form-first-phone').val(data[0]["phone"]);
				$('.textarea').val(data[0]["address"]);
				$.setStorage('scene_id', data[0]["scene_id"]);
				adres = data[0]["scene_id"];
				//获取收货信息
				if (data[0]["deliver_status"] == 1) {
					$('.changeaddress').hide()
				} else {
					$('.changeaddress').show()
				}
				//收货信息按钮内容修改
				if ($('.myprize_add').html() == '收货地址：') {
					$('.changeaddress').html('填写收货信息')
				} else {
					$('.changeaddress').html('修改收货信息')
				}
			}
		} else {
			$('.myprize').hide();
			showErrorTip(msg)
		}
	})
}
/*获取我的奖品结束*/

/*获取奖品列表开始*/
function getGiftList() {
	$.sendReq(api.giftlist, 'GET', { ac_id: 22 }, function (res) {
		let { code, data, msg } = res;
		if (code == 0) {
			$('.special').html('');
			$('.prize1li').html('');
			$('.prize2li').html('');
			$('.prize3li').html('');
			for (let key in data) {
				if (data[key]['prize_degree'] == 1) {
					var str = `<span>${data[0]['prize_quota']}名</span><b>特等奖：${data[0]['prize_name']}（价值999元）</b>`;
					$('.special_img').attr('src', './assets191212/img/topgrade.png');
					$('.special').append(str);
				} else if (data[key]['prize_degree'] == 2) {
					var str1 = `<div class="prize1">
									<img class="prize1li_img" src alt="">
								</div>
								<div class="prizeset_top_int">
									<span>${data[1]['prize_quota']}名</span><b>一等奖：</b>
								</div>
								<p>${data[1]['prize_name']}</p>
								<p>（价值699元）</p>`;
					$('.prize1li').append(str1);
					$('.prize1li_img').attr('src', './assets191212/img/prize1.png');
				} else if (data[key]['prize_degree'] == 3) {
					var str2 = `<div class="prize2">
									<img class="prize2li_img" src alt="">
								</div>
								<div class="prizeset_top_int">
									<span>${data[2]['prize_quota']}名</span><b>二等奖：</b>
								</div>
								<p>${data[2]['prize_name']}</p>
								<p>（价值299元）</p>`;
					$('.prize2li').append(str2);
					$('.prize2li_img').attr('src', './assets191212/img/prize2.png');
				} else if (data[key]['prize_degree'] == 4) {
					var str3 = `<div class="prize1">
									<img class="prize3li_img" src alt="">
								</div>
								<div class="prizeset_top_int">
									<span>${data[3]['prize_quota']}名</span><b>三等奖：</b>
								</div>
								<p>${data[3]['prize_name']}</p>
								<p>（价值129元）</p>`;
					$('.prize3li').append(str3);
					$('.prize3li_img').attr('src', './assets191212/img/prize3.png');
				}
			}
		} else {
			showErrorTip(msg)
		}
	})
}
/*获取奖品列表结束*/


/*填写收货地址开始*/
$('.register').on('click', function () {
	getMyPrize();
	$('.playbox').hide();
	$('.form-first').show();
})
$('.placls').on('click', function () {
	$('.mask').hide();
	$('.playbox').hide();
	actime()
})
/*填写收货地址结束*/

/*收货地址开始*/
$('.changeaddress').on('click', function () {
	$('.form-first').show();
	$('.mask').show();
})
$('.addre').on('click', function () {
	$('.form-first').hide();
	$('.mask').hide();
	actime();
})
$('.addsuccbtn').on('click', function () {
	$('.addsucc').hide();
	$('.mask').hide();
	actime();
})
$('.submit').on('click', function () {
	var regName = /^[\u4e00-\u9fa5]{2,4}$/; //判断姓名
	if (!regName.test($('.addressname').val())) {
		showErrorTip('请输入正确的姓名');
		return false;
	}
	if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test($('.form-first-phone').val()))) {
		showErrorTip('请输入正确的手机号码');
		return false;
	}
	if ($('.textarea').val() == '') {
		showErrorTip('请输入正确的收货地址');
		return false;
	}
	var adddata = {
		user_sign: $.getStorage('infor')['user_sign'] || '',
		name: $('.addressname').val(),
		phone: $('.form-first-phone').val(),
		address: $('.textarea').val(),
		scene_id: $.getStorage('scene_id') || adres
	}
	$.sendReq(api.address1, 'POST', adddata, function (res) {
		let { code, data, msg } = res;
		if (code == 0) {
			$('.addsucc').show();
			$('.mask').show();
		} else {
			showErrorTip(msg)
		}
	})
	$('.form-first').hide();
	$('.mask').hide();
})
/*收货地址结束*/

/*活动时间开始*/
actime()
function actime() {
	$.sendReq(api.time, 'get', { ac_id: 22 }, function (res) {
		let { code, data, msg } = res;
		if (code == 0) {
			$("#emilevent").trigger('click');
			curTime = data['now_time'];
			endTime = data['end_time'];
			startTime = data['start_time'];
			step = judgeStep(curTime, startTime, endTime);
			var g = startTime * 1000; //定义一个时间戳变量
			var d = new Date(g);
			var h = endTime * 1000; //定义一个时间戳变量
			var j = new Date(h);
			$('.activity-time span').html('活动时间：' + formatDate(d) + ' - ' + formatDate(j));
			$('.rules_time').html(formatDate1(d) + ' - ' + formatDate1(j));
			err2p = formatDate1(d) + ' - ' + formatDate1(j);
			$('.count-down').html('');
			if (step == 1) { //进行中
				var bannTime = timePoor(curTime, endTime);
				var strTime = `<p class="count-down-t">距活动结束还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${bannTime[2]}</span>分<span class="time s">${bannTime[3]}</span>秒`;
				$('.count-down').append(strTime)
				forTime(bannTime, step)
			} else if (step == 0) {//未开始
				var bannTime = timePoor(curTime, startTime);
				var strTime = `<p class="count-down-t">距活动开始还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${bannTime[2]}</span>分<span class="time s">${bannTime[3]}</span>秒`;
				$('.count-down').append(strTime)
				forTime(bannTime, step)
			} else {//已结束
				var strTime = '<p class="count_over">活动已结束</p>';
				$('.count-down').append(strTime);
			}

			//用户登录成功之后请求的接口
			if ($.getStorage('infor') && step != 0) {
				getMyPrize(); //获取我的奖品
			} else if (!$.getStorage('infor')) {//更新退出登录后状态
				$.removeLocalStorage('scene_id');
				$('.myprize_name').html('');
				$('.myprize_con').html('');
				$('.myprize_img').attr({ 'class': 'myprize_img', 'src': '' });
				$('.myname').html('');
				$('.myphone').html('');
				$('.myprize_add').html('');
				$('.myprize').hide();
				$('.activity_rollpo').html('GO');
				$('.activity_rollprize').find('img').css({ 'transform': 'rotate(0deg)' });
				$('.activity_rollpointer').on('click', () => {
					if (!$.getStorage('infor')) {
						showErrorTip('暂未登录');
						$('.login-container').show();
						$('#emilevent').off('click');
						$('#emilevent').one('click', function () {
							roll(step)
						})
					} else if ($.getStorage('infor')) {
						roll(step)
					}
				})
			};
			winner(step)
			getGiftList()
		} else {
			showErrorTip(msg)
		}
	});
	if (acTimeSet) {
		clearInterval(acTimeSet)
	}
	acTimeSet = setInterval(function () {
		actime()
	}, 1000 * 60)
}
/*活动时间结束*/

/*活动时间以秒倒计时开始*/
function forTime(bannTime, step) {
	if (forTimeSet) {
		clearInterval(forTimeSet);
	}
	forTimeSet = setInterval(function () {
		bannTime[3]--;
		if (bannTime[3] == -1) {
			bannTime[2]--;
			bannTime[3] = 59
		}
		if (bannTime[2] == -1) {
			bannTime[2] = 59
		}
		if (bannTime[1] == -1) {
			bannTime[1] = 23;
			bannTime[0]--;
		}
		if (step == 1) {
			var strTime = `<p class="count-down-t">距活动结束还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${pad(bannTime[2])}</span>分<span class="time s">${pad(bannTime[3])}</span>秒`;
		} else if (step == 0) {
			var strTime = `<p class="count-down-t">距活动开始还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${pad(bannTime[2])}</span>分<span class="time s">${pad(bannTime[3])}</span>秒`;
		}
		$('.count-down').html(strTime);
	}, 1000)
}
/*活动时间以秒倒计时结束*/

//获奖名单
function winner(step) {
	$.sendReq(api.winners, 'get', { ac_id: 22 }, function (res) {
		let { code, data, msg } = res;
		if (code == 0) {
			$('#demo1').html('');
			$('#dem1').html('');
			for (let key in data['list']) {
				var phone = data['list'][key]['phone'];
				var price = data['list'][key]['prize_grade'];
				if (step == 0) {
					var str = `<p>暂未揭晓</p>`
					$('.winners_demo').html(str)
				} else if (step != 0) {
					switch (price) {
						case '一等奖':
							price = '特等奖'
							break;
						case '二等奖':
							price = '一等奖'
							break;
						case '三等奖':
							price = '二等奖'
							break;
						case '四等奖':
							price = '三等奖'
							break;
						default:
							price = '三等奖'
					}
					var str = `<li><span class="list_phone">${phone}</span><span class="list_text">获得${price}</span></li>`
					$('#demo1').append(str)
					$('#dem1').prepend(str)
					list();
				}
			}
		} else {
			showErrorTip(msg)
		}
	})
}
/*抽奖*/
$('.activity_rollpointer').on('click', () => {
	if (!$.getStorage('infor')) {
		showErrorTip('暂未登录');
		$('.login-container').show();
		$('#emilevent').off('click');
		$('#emilevent').one('click', function () {
			roll(step)
		})
	} else if ($.getStorage('infor')) {
		roll(step)
	}
})
//随机数
var mathRandomTwo = Math.floor(Math.random() * 2);
var mathRandomThree = Math.floor(Math.random() * 3)
function mathRan(num1, num2) {
	return Math.floor(Math.random() * (num2 - num1) + num1);
}
//抽奖
function roll(step) {
	if (!flag) {
		return false;
	}
	flag = false;
	let comData = {
		user_sign: $.getStorage('infor')['user_sign'] || '',
		ac_id: 22,
		platform: 2
	}
	$.sendReq(api.commonprize, 'POST', comData, function (res) {
		let { code, data, msg } = res;
		var prize;
		if (code == 0) {
			//几等奖
			var prize_degree = data['prize_degree'];
			if (prize_degree == 1 || prize_degree == '1') {
				prize = 1;
			} else if (prize_degree == 2 || prize_degree == '2') {
				prize = [4, 9][mathRandomTwo];
			} else if (prize_degree == 3 || prize_degree == '3') {
				prize = [3, 6][mathRandomTwo];
			} else if (prize_degree == 4 || prize_degree == '4') {
				prize = [2, 5, 8][mathRandomThree];
			} else {
				prize = 7;
			}
			//
			// switch(data['prize_degree']) {
			// 	case 1: prize = 1;break;
			// 	case 2: prize = [4,9][mathRandomTwo];break;
			// 	case 3: prize = [3,6][mathRandomTwo];break;
			// 	case 4: prize = [2,5,8][mathRandomThree];break;
			// 	default: prize = 7;break;
			// }
			$.setStorage('scene_id', data["scene_id"]);
			acRoll(prize, data['prize_title'])
		} else if (code == 400001646) {
			comEorror(1);
			flag = true;
		} else if (code == 400001914) {
			$('.err2_p').html(err2p + '期间');
			comEorror(2);
			flag = true;
		} else if (code == 400001684) {
			comEorror(5);
			flag = true;
		} else if (code == 400001916) {
			comEorror(6, '非常抱歉，您只缴纳了订金，请补全首期学费后再来参与抽奖哦~')
			flag = true;
		} else if (code == 400001917) {
			comEorror(3);
			flag = true;
		} else if (code == 400001306) { //usersign失效的情况
			showErrorTip('登录时效，请重新登录');
			$.removeLocalStorage('infor');
			$.removeLocalStorage('scene_id');
			changeStatus();
			$('.login-container').show();
			flag = true;
			$('#emilevent').off('click');
			$('#emilevent').one('click', function () {
				roll()
			})
		} else {
			comEorror(6, msg);
			flag = true;
		}
	})
}
//抽奖礼包
function acRoll(angle, intr) {
	var prizeAngle = {};
	if (angle == 1) {
		prizeAngle['name'] = '特等奖';
		prizeAngle['intro'] = intr;
		// anma = [mathRan(342,359),mathRan(2,19)];
		// angle = anma[mathRandomTwo];
		anma = 0;
		angle = 0;
	} else if (angle == 4 || angle == 9) {
		prizeAngle['name'] = '一等奖';
		prizeAngle['intro'] = intr;
		// anma = [mathRan(222,259),mathRan(22,59)];
		// angle = anma[mathRandomTwo];
		anma = [240, 40];
		angle = anma[mathRandomTwo];
	} else if (angle == 3 || angle == 6) {
		prizeAngle['name'] = '二等奖';
		prizeAngle['intro'] = intr;
		// anma = [mathRan(262,299),mathRan(142,179)];
		// angle = anma[mathRandomTwo];
		anma = [280, 160];
		angle = anma[mathRandomTwo];
	} else if (angle == 2 || angle == 5 || angle == 8) {
		prizeAngle['name'] = '三等奖';
		prizeAngle['intro'] = intr;
		// anma = [mathRan(302,339),mathRan(182,219),mathRan(62,99)];
		// angle = anma[mathRandomThree];
		anma = [320, 200, 80];
		angle = anma[mathRandomThree];
	} else if (angle == 7) {
		prizeAngle = '';
		angle = 120;
	}
	$(".activity_rollprizeimg").rotate({//旋转
		angle: 90, //角度
		duration: 7000, //持续时间
		animateTo: angle + 1080, //angle是图片上各奖项对应的角度，2160是我要让指针旋转6圈。所以最后的结束的角度就是这样子^^
		callback: function () {
			winBox(prizeAngle)
			flag = true;
		}
	});
}
//判断活动时间
function judgeStep(timeStamp, start_time, end_time) {
	const timeArr = [start_time, end_time];
	return timeArr.filter((item) => item <= timeStamp).length;
};
//转换活动日期
function formatDate(now) {
	var year = now.getFullYear();  //取得4位数的年份
	var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
	var date = now.getDate();      //返回日期月份中的天数（1到31）
	var hour = now.getHours();     //返回日期中的小时数（0到23）
	var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
	var second = now.getSeconds(); //返回日期中的秒数（0到59）
	return year + '.' + month + "." + date;
}
function formatDate1(now) {
	var year = now.getFullYear();  //取得4位数的年份
	var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
	var date = now.getDate();      //返回日期月份中的天数（1到31）
	var hour = now.getHours();     //返回日期中的小时数（0到23）
	var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
	var second = now.getSeconds(); //返回日期中的秒数（0到59）
	return year + '年' + month + "月" + date + "日";
}
// 时间差函数
function timePoor(curTime, endTime) {
	var begin = curTime + '000';
	var end = endTime + '000'
	//时间相差毫秒数
	var span = parseInt(end) - parseInt(begin);
	//计算相差天数
	var result = [];
	var days = Math.floor(span / (24 * 3600 * 1000));
	result[0] = days;
	//相差小时数
	var leave1 = span % (24 * 3600 * 1000);
	var hours = Math.floor(leave1 / (3600 * 1000))
	result[1] = pad(hours);
	//相差分钟
	var leave2 = leave1 % (3600 * 1000)
	var minutes = Math.floor(leave2 / (60 * 1000));
	result[2] = pad(minutes);
	//相差秒
	var level3 = leave2 % (60 * 1000)
	var seconds = Math.round(level3 / 1000);
	result[3] = pad(seconds);
	return result;
}
//补零函数
function pad(num) {
	var long = num.toString().length;
	if (long == 1) {
		num = '0' + num
	} else {
		num = num
	}
	return num;
}

//分享朋友圈
function loadShare(data) {
	const { appId, nonceStr, signature, timestamp } = data;
	wx.config({
		debug: false, // 是否开启调试模式
		appId: appId, //appid
		timestamp: timestamp, // 时间戳
		nonceStr: nonceStr, // 随机字符串
		signature: signature, // 签名
		jsApiList: [
			'updateTimelineShareData',
			'updateAppMessageShareData'
		] // 需要使用的JS接口列表
	});

	wx.ready(function () {
		const title = '奥鹏教育双12,幸运转盘抽好礼';
		const desc = '报名即有机会获得kindle阅读器、扫地机器人等礼品，快来参与吧';
		const imgUrl = `${window.location.origin}/activity/assets191212/img/share.png`;
		const link = `${window.location.origin}/activity/191212mid.html`;
		// 分享给好友
		wx.updateAppMessageShareData({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				doShareDone()
			},
			cancel: function () {
				doShareCancel()
			}
		})
		// 分享到朋友圈
		wx.updateTimelineShareData({
			title: title, // 分享标题
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				doShareDone()
			},
			cancel: function () {
				doShareCancel()

			}
		})
	})
};
// 分享成功回调
function doShareDone() {
	//		globalMsg('分享成功')

};
// 取消分享回调

function doShareCancel() {
	//		globalMsg('取消了分享')

};

$.sendReq(api.wx, 'get', {
	url: window.location.href
}, function (res) {
	const {
		code,
		data,
		msg
	} = res;
	if (code == 200) {
		loadShare(data);
	} else {
		showErrorTip(msg);
	}
}
)

/*关闭异常弹框开始*/
$('.suc').on('click', function () {
	$('.success').hide();
	$('.err1').hide();
	$('.err2').hide();
	$('.err3').hide();
	$('.err4').hide();
	$('.err5').hide();
	$('.err6').hide();
	$('.mask').hide();
	// actime();
})
/*关闭异常弹框结束*/
module.exports = actime;