import "../scss/zl191111.scss";
$(function() {
	const Api = {
		wxBoost: '/api/activity/wxBoost', //微信授权助力
		acTime: '/api/activity/acTime', //获取活动时间接口
		boostList: '/api/activity/boostList', //获取助力人列表
		wx:window.location.protocol + '//www.open.com.cn/wx/token'
	}
	require('./core/open.js');
	var wx = require('weixin-js-sdk');
	var globalMsg = require('./core/globalMsg.js');
	const phone = $.getParam('phone');
	if(phone) {
		$.setSession('phone', phone);
	}
	const $dayTime = $('#dayTime');
	const $hourTime = $('#hourTime');
	const $minuteTime = $('#minuteTime');
	/*倒计时-开始*/
	function countTime(nowTime, endTime) {
		let d, h, m, s;
		const residueTime = endTime - nowTime;
		if(residueTime >= 0) {
			d = Math.floor(residueTime / 60 / 60 / 24);
			h = Math.floor(residueTime / 60 / 60 % 24);
			m = Math.floor(residueTime / 60 % 60);
		} else {

		}
		$dayTime.text(d);
		$hourTime.text(h);
		$minuteTime.text(m);
	};
	/*倒计时-结束*/
	let timer1, timer2, timer3, timer4;

	function initAcTime() {
		$.sendReq(
			Api.acTime,
			'get', {
				ac_id: 10
			},
			function(res) {
				const {
					code,
					data,
					msg
				} = res;
				if(code == 0) {
					const {
						now_time,
						end_time
					} = data;
					countTime(now_time, end_time);
				} else {
					globalMsg(msg);
				}
				timer1 = setTimeout(() => {
					initAcTime();
					if(timer2) clearTimeout(timer2);
				}, 1000 * 30);
			},
			function() {
				timer2 = setTimeout(() => {
					initAcTime();
					if(timer1) clearTimeout(timer1);
				}, 1000 * 30);
			}
		)
	};

	initAcTime();

	function getBoostList() {
		$.sendReq(
			Api.boostList,
			'GET', {
				phone: $.getSession('phone')
			},
			function(res) {
				const {
					code,
					data,
					msg
				} = res;
				if(code == 0) {
					const {
						list
					} = data;
					$('#assisNum').text(list.length);
					$("#assistanceList").html('');
				} else {
					globalMsg(msg);
				}
				timer3 = setTimeout(() => {
					getBoostList();
					if(timer4) clearTimeout(timer4);
				}, 1000 * 30);
			},
			function() {

				timer4 = setTimeout(() => {
					getBoostList();
					if(timer3) clearTimeout(timer3);
				}, 1000 * 30);
			}
		)
	}
	getBoostList();

	function judgeState() {
		const code = $.getSession('active1911code');
		if(code) {
			if(code == 400001696) { //太热情了！您已经为该小伙伴助力过啦~
				$('.net-wrong-tip1 dt img').eq(1).show();
				$('.net-wrong-tip1 dd.content').eq(2).show();
				$('.net-wrong-tip1').show();
			} else if(code == 400001649) { //参加抽奖的鹏友太多啦！造成网络繁忙，别慌！幸运已经上路，请重新点击试一下！
				$('.net-wrong-tip1 dt img').eq(0).show();
				$('.net-wrong-tip1 dd.content').eq(3).show();
				$('.net-wrong-tip1').show();
			} else if(code == 400001337) { //不好意思，服务器开小差了，请检查网络后再试哦~
				$('.net-wrong-tip1 dt img').eq(0).show();
				$('.net-wrong-tip1 dd.content').eq(0).show();
				$('.net-wrong-tip1').show();
			} else if(code == 400001113) { //提交超时，请稍后重新尝试
				globalMsg('提交超时，请稍后重新尝试');
				//			$('.net-wrong-tip1 dt img').eq(0).show();
				//			$('.net-wrong-tip1 dd.content').eq(4).show();
				//			$('.net-wrong-tip1').show();
			} else if(code == 400001001) {
				globalMsg($.getSession('active1911msg'));
			} else {
				globalMsg('网络异常！');
			}
			var removeTime = setTimeout(function() {
				$.removeSessionStorage('active1911code');
				$.removeSessionStorage('msg')
				if(removeTime) {
					clearTimeout(removeTime)
				}
			}, 1000)
		}
	};

	judgeState();

	$('.help-box dt').on('click', function() {
		$.sendReq(
			Api.acTime,
			'get', {
				ac_id: 10
			},
			function(res) {
				const {
					code,
					data,
					msg
				} = res;
				if(code == 0) {
					const {
						now_time,
						end_time,
						start_time
					} = data;
					countTime(now_time, end_time);
					const restTime = end_time - now_time;
					const leftTime = now_time - start_time;
					if(leftTime >= 0 && restTime >= 0){ //进行中
						const jumpUrl = window.location.origin == 'http://test.iopen.com.cn' ? window.location.origin : (window.location.protocol + '//' + 'www.open.com.cn');
						window.location.href = `${jumpUrl}/wx?state_url=${window.location.origin}/activity/zlMid191111.html&snsap_type=snsapi_userinfo`
					}else if(leftTime < 0){ //未开始
						globalMsg('助力活动未开启');
					}else{ //结束
						globalMsg('助力活动已结束');
					}
				} else {
					globalMsg(msg);
				}
			}
		)
	});

	$('.net-wrong-tip1 .sure').on('click', function() {
		$.removeSessionStorage('active1911code');
		$.removeSessionStorage('msg')
		$('.net-wrong-tip1').hide();
		$('.net-wrong-tip1 dt img').hide();
		$('.net-wrong-tip1 dd.content').hide();
	});
	function loadShare(data){
		const {appId,nonceStr,signature,timestamp} = data;
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
	
		wx.ready(function() {
			const title = '好友助力赢取助学金';
			const desc = '我正在参与奥鹏教育双十一活动，好友助力即可赢取助学金，快来帮我助力吧!';
			const imgUrl = `${window.location.origin}/activity/assets1911/img/share.png`;
			const link = `${window.location.origin}/activity/zl191111mid.html?phone=${$.getSession('phone')}` ;
			// 分享给好友
			wx.updateAppMessageShareData({
				title: title, // 分享标题
				desc: desc, // 分享描述
				link: link, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function() {
					doShareDone()
				},
				cancel: function() {
					doShareCancel()
				}
			})
			// 分享到朋友圈
			wx.updateTimelineShareData({
				title: title, // 分享标题
				link: link, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function() {
					doShareDone()
				},
				cancel: function() {
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
	
	$.sendReq(Api.wx,'get',{
		url:window.location.href
	},function(res) {
		const {
			code,
			data,
			msg
		} = res;
		if(code == 200){
			loadShare(data);
		}else{
			globalMsg(msg);
		}
	}
	)
})