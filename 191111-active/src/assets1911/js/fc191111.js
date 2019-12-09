import "../scss/fc191111.scss";
$(function(){
	require('./core/jump.js');
	/*同盾安全初始化-开始*/
	window._fmOpt = {
        partner: "aopengjy",
        appName: "aopengNESwz_web",
        token: "aopengjy" + "-" + new Date().getTime() + "-"+ Math.random().toString(16).substr(2),
        fmb: true,
        getinfo: function(){
            return "e3Y6ICIyLjUuMCIsIG9zOiAid2ViIiwgczogMTk5LCBlOiAianMgbm90IGRvd25sb2FkIn0=";
        }                           
    };
    var cimg = new Image(1,1);
    cimg.onload = function() {
        _fmOpt.imgLoaded = true;
    };
    cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=aopengjy&appName=aopengNESwz_web&tokenId=" + _fmOpt.token;
    var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
    fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/v2/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
	/*同盾安全初始化-结束*/
	
	/*定义变量-开始*/
	window.timer = null
		let timer1,timer2,timer3,timer4;
		const $countDown = $('#countDown');
		const $dayTime = $('#dayTime');
		const $hourTime = $('#hourTime');
		const $minTime = $('#minTime');
		const $priceList = $('#priceList');
		var api = {
			acTime:'/api/activity/acTime',
			winnerList:'/api/activity/winnerList',
			boxLottery:'/api/activity/boxLottery',
			overdue:'/api/user/overdue',
			posStatus:'/api/activity/posStatus',
			lotteryCondition:'/api/activity/lotteryCondition',
			wx:window.location.protocol + '//www.open.com.cn/wx/token'
		};
	/*定义变量-结束*/
	
	/*引入自定义插件-开始*/
	require('./core/open.js');
	var changeStatus = require('./core/changeStatus.js');
	var changeLogin = require('./core/changeLogin.js');
	var assistance = require('./core/assistance.js');
	var congratulate = require('./core/congratulate1.js');
	var vacanciesTip = require('./core/vacanciesTip.js');
	var netWrongTip =require('./core/netWrongTip.js');
	var warmTip =require('./core/warmTip.js');
	var awardedPriceTip =require('./core/awardedPriceTip.js');
	var withoutTip =require('./core/withoutTip.js');
	var globalMsg =require('./core/globalMsg.js');
	require('./core/login.js');
	require('./core/header.js');
	var scrollBar =require('./core/scrollBar.js');
	var wx = require('weixin-js-sdk');
	/*引入自定义插件-结束*/

	/*初始化-开始*/
	
	/*初始化-结束*/
	changeStatus();
	
	var infor = $.getStorage('infor');
	var userSign = infor ? infor['user_sign'] : '';
	var phoneNum = infor ? infor['phone_num'] : '';
	var $chestBox = $('.chest-box');
	var drawDisable = false;
	var $mainTitle = $('.main-title');
	var $ruleBox = $('.rule-box');
	var globalFlage = true;
	function posStatus(){
		var infor = $.getStorage('infor');
		var userSign = infor ? infor['user_sign'] : '';
		$.sendReq(api.posStatus,'GET',{
			ac_id:16,
			pos_num:3,
			user_sign:userSign
		},function(res){
			const {code,msg,data} = res;
			if(code == 0){
				const {lottery_num,pos_list,ac_begin_time,now_time,ac_end_time} = data;
				const leftTime =  ac_begin_time - now_time;
				const rightTime = ac_end_time - now_time;
				if(leftTime <= 0 && rightTime >= 0){ //正在开始中
					$('#chanceTotal').html('');
					$('#chanceTotal').html(
						`点击宝箱开启幸运大奖，你还有 <span>${lottery_num}</span>次机会`
					);
				}else if(leftTime > 0){ //未开始
					initStatus();
					return false;
				}else{ //已结束
					$('#chanceTotal').html('');
					$('#chanceTotal').html(
						`点击宝箱开启幸运大奖，你还有 <span>${lottery_num}</span>次机会`
					);
				}
				for(let key in pos_list){
					if(pos_list[key]['status'] == 1){
						$chestBox.find(`div[data-index=${key}]`).html(`
							<img src="./assets1911/img/chestOpen.png"  alt="" />
							<p>
								<span>${parseInt(pos_list[key]['price'])}</span>元助学金
							</p>
							`);
					}else{
						$chestBox.find(`div[data-index=${key}]`).html(`<img src="./assets1911/img/chestClose.png"  alt="" />`);
					}
				}
			}else if(code == 400001306 || code == 400001326){
				return false;
			}
			else{
				globalMsg(msg);
			}
		});
	};
	const $chanceTotal = $('#chanceTotal');
	function initStatus(){
		$chanceTotal.html('');
		[0,1,2].map((item,index)=>{
		$chestBox.find('div')
		.eq(item).find('p').remove();
		
		$chestBox.find('div')
		.eq(item).find('img')
		.attr('src','./assets1911/img/chestClose.png')
		})
	}
	
	if(userSign){
		$.sendReq(api.lotteryCondition,'GET',{user_sign:userSign},function(res){
			const {code,msg,data} = res;
			if(code == 0){
				posStatus();
			}
			else if(code == 400001653){
				initStatus();
			}else if(code == 400001306){
				$("#emitEvent").off('click');
				$("#emitEvent").one('click',function(){
					posStatus();
				})
			}
			else{
				globalMsg(msg);
			}
		});
	}else{
		$("#emitEvent").off('click');
		$("#emitEvent").one('click',function(){
			posStatus();
		})
	}
	
	
	/*登录-开始*/
	$(".header-box .login").on('click',function(){
		changeLogin(true);
		$("#emitEvent").off('click');
		$("#emitEvent").one('click',function(event,param){
			if(param){ //可以抽奖
				 posStatus();
			}else{ //不可以抽奖
				initStatus();
			}
			
			initAcTime(true);
		});
	});
	$(".header-box dt i").on('click',function(){
		var $logout = $(this).next();
		
		if($logout.css('display') == 'none'){
			$logout.slideDown(200);
		}else{
			$logout.slideUp(150);
		}
		
	});
	$(".header-box dt em").on('click',function(){
		$.removeLocalStorage('infor');
		changeStatus();
		initStatus();
		$("#emitEvent").off('click');
		$("#emitEvent").one('click',function(){
			posStatus();
			initAcTime(true);
		});
		initAcTime(true);
	});
	/*登录-结束*/

	/*倒计时-开始*/
	function countTime(startTime,nowTime,endTime,flage){
		let d,h,m,s;
		const leftTime =  startTime - nowTime;
		const rightTime = endTime - nowTime;
		if(leftTime <= 0 && rightTime >= 0){ //正在开始中
			d = Math.floor(rightTime/60/60/24);
	        h = Math.floor(rightTime/60/60%24);
	        m = Math.floor(rightTime/60%60);
	        $countDown.html('距活动结束还剩');
	        $dayTime.text(d);
			$hourTime.text(h);
			$minTime.text(m);
			if(flage){
				getWinnerList();
			}
		}else if(leftTime > 0){ //未开始
			d = Math.floor(leftTime/60/60/24);
	        h = Math.floor(leftTime/60/60%24);
	        m = Math.floor(leftTime/60%60);
	        $countDown.html('距活动开始还剩');
	        $dayTime.text(d);
			$hourTime.text(h);
			$minTime.text(m);
			initStatus();
		}else{ //已结束
			$countDown.html('');
			$('#countTime').html('活动已结束')
			if(flage){
				getWinnerList();
			}
		}
		
		if(globalFlage){
			const startDate = new Date(startTime * 1000);
			const startYear = startDate.getFullYear();
			const startMonth = startDate.getMonth() + 1;
			const startDay = startDate.getDate();
			const startHour = startDate.getHours() < 10 ?  '0' + startDate.getHours() : startDate.getHours();
			const startMinute = startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes();
			const endDate = new Date(endTime * 1000);
			const endYear = endDate.getFullYear();
			const endMonth = endDate.getMonth() + 1;
			const endDay = endDate.getDate();
			const endHour = endDate.getHours() < 10 ? '0' + endDate.getHours() : endDate.getHours();
			const endMinute = endDate.getMinutes() < 10 ? '0' + endDate.getMinutes() : endDate.getMinutes();
			$mainTitle.text(`活动时间:${startYear}年${startMonth}月${startDay}日-${endYear}年${endMonth}月${endDay}日`);
			$ruleBox.find('span').text(`${startYear}年${startMonth}月${startDay}日${startHour}:${startMinute}-${endYear}年${endMonth}月${endDay}日${endHour}:${endMinute}`);
			$ruleBox.find('i').text(`${startYear}年${startMonth}月${startDay}日-${endYear}年${endMonth}月${endDay}日`);
		}
		globalFlage = false;
		
	};
	/*倒计时-结束*/
	
	function initAcTime(flage){
		$.sendReq(
			api.acTime,
			'get',
			{
				ac_id:16
			},
			function(res){
				const {code,data,msg} = res;
				if(code == 0){
					const {start_time,now_time,end_time} = data;
					countTime(start_time,now_time,end_time,flage);
				}else{
					globalMsg(msg);
				}
				if(timer1) clearTimeout(timer1);
				timer1 = setTimeout(()=>{
					initAcTime();
					if(timer1) clearTimeout(timer1);
				},1000*60);
			},
			function(){
				if(timer1) clearTimeout(timer1);
				timer1 = setTimeout(()=>{
					initAcTime();
					if(timer1) clearTimeout(timer1);
				},1000*60);
			}
		)
	};
	
	initAcTime(true);
	
	
	function scroll(ele){
		
		var height = $(ele).children().offsetHeight;
		var num = 0;
		var timer = setInterval(function(){
			ele.style.top = (num--) + 'px';
			if(num <= -height){
				ele.style.top = "0px";
				ele.appendChild(ele.children[0]);
				clearInterval(timer);
				
				setTimeout(function(){
					
					scroll(ele)
					
				},2000)
			}
		},50)
	};
	
	function getWinnerList(){
		$.sendReq(
			api.winnerList,
			'GET',
			{
				ac_id:16
			},
			function(res){
				const {code,data,msg} = res;
				if(code == 0){
					const { list } = data;
					$priceList.html('');
					
//					$("#assistanceList").html('');
					list.forEach(function(item){
						var str = `
							<li class="clearfix">
								<em>${item['phone']}</em>
								<i>获得${parseInt(item['price'])}元助学金</i>
							</li>
						`;
						$priceList.append(str);
					});
					scrollBar(document.getElementById("priceList"));
				}
				else{
					globalMsg(msg);
				}
			}
		)
	}
	
	
	function boxLottery(vm){
		var infor = $.getStorage('infor');
		var userSign = infor ? infor['user_sign'] : '';
		var index = $(vm).data('index');
		
		$.sendReq(
			api.boxLottery,
			'POST',
			{
				ac_id:16,
				platform:2,
				user_sign:userSign,
				click_pos:index
			},
			function(res){
				drawDisable = false;
				const {code,data,msg} = res;
				
				
				if(code == 0){
					const {prize_degree,lottery_num} = data;
					const money = {
						1:'300.00',
						2:'200.00',
						3:'100.00'
					}[prize_degree];
					
					$('#chanceTotal').html(
						`点击宝箱开启幸运大奖，你还有 <span>${lottery_num}</span>次机会`
					);
					
					var time1 = setTimeout(function(){
						$(vm).find('img').attr('src','./assets1911/img/chestOpen1.png');
						$(vm).removeClass('active-shake');
						if(time1) clearTimeout(time1);
						var timer = setTimeout(function(){
							congratulate(money,lottery_num,posStatus);
							if(timer) clearTimeout(timer);
						},500);
					},1000);
					
				}else if(code == 400001649){//参加抽奖的鹏友太多啦！造成网络繁忙，别慌！幸运已经上路，请重新点击试一下！
					netWrongTip();
					$(vm).removeClass('active-shake');
					posStatus();
				}else if(code == 400001646){//你的宝箱开启次数已达上限~下次活动期待你的参与哦！
					vacanciesTip('你的宝箱开启次数已达上限~<br />下次活动期待你的参与');
					$(vm).removeClass('active-shake');
					posStatus();
				}else if(code == 400001653){//温馨提示：本活动仅限未报读的新用户以及奥鹏教育OCES平台显示已毕业的学生参与哦！更多活动敬请期待！
					warmTip();
					$(vm).removeClass('active-shake');
					initStatus();
				}else if(code == 400001684){//很抱歉，助学金已抢光了！下一场次早点来哦！
					withoutTip('非常遗憾，助学金已经被抢完啦！ <br />下次活动敬请期待~');
					$(vm).removeClass('active-shake');
					posStatus();
				}
				else if(code == 400001913){ //已开过该宝箱
					posStatus();
					$(vm).removeClass('active-shake');
				}
				else if(code == 400001326 || code == 400001306){ //登录超时
					$.removeLocalStorage('infor');
					initStatus();
					changeStatus();
					changeLogin(true);
					$("#emitEvent").off('click');
					$("#emitEvent").one('click',function(){
						boxLottery(vm);
					});
					if(code == 400001306){
						globalMsg(msg);
					}
					$(vm).removeClass('active-shake');
					posStatus();
				}
				else{
					globalMsg(msg);
					$(vm).removeClass('active-shake');
					posStatus();
				}
			},function(){
				drawDisable = false;
				$(vm).removeClass('active-shake');
				posStatus();
			}
		)
	}
	
	$('.chest-box div').on('click',function(){
		if(!drawDisable){
			$chestBox.find('div').removeClass('active-shake');
			var src = $(this).find('img').attr('src');
			if(src.indexOf('chestClose') > -1){
				boxLottery(this);
				$(this).addClass('active-shake');
				drawDisable = true;
			}else{
				drawDisable = false;
			}
			initAcTime(true);
		}
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
			const title = '奥鹏教育双11，狂欢继续，惊喜不止！';
			const desc = '';
			const imgUrl = `${window.location.origin}/activity/assets1911/img/share1.png`;
			const link = `${window.location.origin}/activity/fc191111mid.html` ;
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
	
	$.sendReq(api.wx,'get',{
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