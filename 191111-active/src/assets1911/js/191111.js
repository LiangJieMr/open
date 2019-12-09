import "../scss/191111.scss";
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
	window.timer = null;
	window.interval = null;
	
	var actStatus ={
		active1:'',
		time1:'',
		activeId1:'',
		active2:'',
		time2:'',
		activeId2:''
	};
	
	var globalStep = null;
	var globalFirst = true;

	var $actStatus = $('.active-status');
	/*定义变量-结束*/
	
	/*引入自定义插件-开始*/
	require('./core/open.js');
	
	var changeStatus = require('./core/changeStatus.js');
	var changeLogin = require('./core/changeLogin.js');
	var assistance = require('./core/assistance.js');
	var congratulate = require('./core/congratulate.js');
	var vacanciesTip = require('./core/vacanciesTip.js');
	var netWrongTip =require('./core/netWrongTip.js');
	var warmTip =require('./core/warmTip.js');
	var awardedPriceTip =require('./core/awardedPriceTip.js');
	var withoutTip =require('./core/withoutTip.js');
	var globalMsg =require('./core/globalMsg.js');
	require('./core/login.js');
	require('./core/header.js');
	var wx = require('weixin-js-sdk');
	/*引入自定义插件-结束*/
	
	/*初始化变量-开始*/
	var api = {
		activityList:'/api/activity/activityList',
		activityInfo:'/api/activity/activityInfo',
		drawLottery:'/api/activity/catch',
		lotteryCondition:'/api/activity/lotteryCondition',
		acTime:'/api/activity/acTime',
		wx:window.location.protocol + '//www.open.com.cn/wx/token'
	};
	var $menuTaps1 = $('.active1 .tap-menu dl');
	var $menuTaps2 = $('.active2 .tap-menu dl');
	/*初始化变量-结束*/
	var tapDisbale1 = false;
	var tapDisbale2 = false;
	var drawDisbale = false;
	/*初始化-开始*/
	changeStatus();
	/*初始化-结束*/
	
	/*登录-开始*/
	$(".header-box .login").on('click',function(){
		changeLogin(true);
		$("#emitEvent").off('click');
		$("#emitEvent").one('click',function(){
			acTime();
		})
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
		acTime();
		$("#emitEvent").off('click');
		$("#emitEvent").one('click',function(){
			acTime();
		})
		
	});
	/*登录-结束*/
	
	function lotteryCondition(){
		var infor = $.getStorage('infor');
		var userSign = infor ? infor['user_sign'] : '';
		if (userSign) {
			$.sendReq(
				api.lotteryCondition,
				'GET',
				{
					user_sign:userSign
				},
				function(res){
					const {code,data,msg} = res;
					if(code == 0){
						assistance();
					}else if(code == 400001653){
						warmTip();
					}else if(code == 400001306){
						$.removeLocalStorage('infor');
						globalMsg(msg);
						changeStatus();
						changeLogin(true);
						$("#emitEvent").off('click');
						$("#emitEvent").one('click',function(){
							assistance();
						})
					}
					else{
						globalMsg(msg);
					}
				}
			)
			
		}else{
			changeLogin(true);
			$("#emitEvent").off('click');
			$("#emitEvent").one('click',function(){
				assistance();
			})
		}
	}
	
	/*生成助力海报-开始*/
	$(".playbill img").on('click',function(){
		$.sendReq(
			api.acTime,
			'get',
			{
				ac_id:10
			},
			function(res){
				const {code,data,msg} = res;
				const { now_time,start_time,end_time } = data;
				const leftTime = start_time - now_time;
				const rightTime = end_time - now_time;
				
				if(leftTime <= 0 && rightTime >=0){ //进行中
					 lotteryCondition();
				}else if(leftTime > 0){ //未开始
					globalMsg('活动未开启');
				}else{ //已结束
					globalMsg('活动已结束');
				}
				
			}
		);
	});
	var startTime = null;
	function judgeStep(timeStamp,start_time){
		if(start_time){
			startTime = start_time;
//			console.log(start_time + 24 * 60 * 60)
		}
//		const timeArr = [1573401600,1573434000,1573441860,1573448400,1573462800,1573477200,1573488000];
		const timeArr = [startTime,startTime + 9 * 60 * 60,startTime + 11 * 60 * 60 + 11 * 60,startTime + 13 * 60 * 60,startTime + 19 * 60 * 60,startTime + 21 * 60 * 60,startTime + 24 * 60 * 60];
	    return timeArr.filter((item)=>item <= timeStamp).length;
	};
	
	function debounce(fn, delay, scope) {
	    let timer = null;
	    // 返回函数对debounce作用域形成闭包
	    return function () {
	        // setTimeout()中用到函数环境总是window,故需要当前环境的副本；
	        let context = scope || this, args = arguments;
	        // 如果事件被触发，清除timer并重新开始计时
	        clearTimeout(timer);
	        timer = setTimeout(function () {
	            fn.apply(context, args);
	        }, delay);
	    }
	};
	
	/*生成助力海报-结束*/
	var $timeTaps = $('.time-tap');
	var $container2 = $('.active2 .container');
	/*获取优惠券信息-开始*/
	function initActivityInfo(active,time,activeId){
		
		actStatus[`active${active}`] = active;
		actStatus[`time${active}`] = time;
		actStatus[`activeId${active}`] = activeId;
		if(active == 1){
			assist();
		}
		var infor = $.getStorage('infor');
		var userSign = infor ? infor['user_sign'] : '';
		$.sendReq(
			api.activityInfo,
			'POST',
			{
				user_sign:userSign,
				activity_id:activeId
			},
			function(res){
				const {code,data,msg} = res;
				if(code == 0){
					const {server_time} = data;
					const step =judgeStep(server_time);
					for(let i = 1 ;i<=6;i++){
						const $dd = $timeTaps
								.filter((index,item)=>$(item)
								.data('index') == i)
								.find('dd');
						
						if(i < step) {
							$dd
							.html('<em class="finish">已结束</em>');
						}else if(i == step){
							$dd
							.html('<em class="progress">进行中</em>');
						}else{
							$dd
							.html('<em class="nostart">未开始</em>');
						}
						
					};
					
					var dataTime = data[time] || {};
					$(`.active${active} .container`).html('');
					const curTimeTap = {
						'00:00':1,
						'09:00':2,
						'11:11':3,
						'13:00':4,
						'19:00':5,
						'21:00':6
					}[time];
					
					
					var curStatus = -1;
					if(curTimeTap > step){ //未开始
						curStatus = -1;
						if(curTimeTap == 2 || curTimeTap > 3){
							$menuTaps2.css('background-color','#8c80ff');
							
							$menuTaps2.removeClass('active');
							 const $dd = $timeTaps
							.filter((index,item)=>$(item)
							.data('index') == curTimeTap)
							.addClass('active')
							.css('background-color','#60099d')
							$container2.css('borderColor','#60099d');
						}
					}else if(curTimeTap == step){ //正在进行
						curStatus =0;
						if(curTimeTap == 2 || curTimeTap > 3){
							$menuTaps2.css('background-color','#8c80ff');
							
							$menuTaps2.removeClass('active');
							 const $dd = $timeTaps
							.filter((index,item)=>$(item)
							.data('index') == curTimeTap)
							.addClass('active')
							.css('background-color','#ea00c2')
							$container2.css('borderColor','#ea00c2')
						}
					}else{ //已结束
						curStatus = 1;
						if(curTimeTap == 2 || curTimeTap > 3){
							$menuTaps2.css('background-color','#8c80ff');
							
							$menuTaps2.removeClass('active');
							 const $dd = $timeTaps
							.filter((index,item)=>$(item)
							.data('index') == curTimeTap)
							.addClass('active')
							.css('background-color','#515151')
							$container2.css('borderColor','#515151')
						}
					}
					for(let key in dataTime){
						var money = dataTime[key]['money'];
						var gt = dataTime[key]['gift_time'];
						var cd = dataTime[key]['coupon_id'];
						var have = dataTime[key]['have'];
						var stateStr = '';
						if(curStatus == -1){ //未开始
							if(money == '免单券'){
									stateStr = `
										<img src="./assets1911/img/freeNotStarted.png" alt="" />
									`;
							}else{
								stateStr = `
									<p>
										<em>￥</em>
										<i>${parseInt(money)}</i>
									</p>
									<img src="./assets1911/img/notStarted.png" alt="" />
								`;
							}
						}else if(curStatus == 1){ //已结束
							if(have == 2){ //2已经拥
								if(money == '免单券'){
									stateStr = `
										<img src="./assets1911/img/freeAcquire.png" alt="" />
									`;
								}else{
									stateStr = `
										<p>
											<em>￥</em>
											<i>${parseInt(money)}</i>
										</p>
										<img src="./assets1911/img/acquire.png" alt="" />
									`;
								}
							}else{
								if(money == '免单券'){
									stateStr = `
										<span class="over">
											已结束
										</span>
										<img src="./assets1911/img/freeNotStarted.png" alt="" />
									`;
								}else{
									stateStr = `
										<span class="over">
											已结束
										</span>
										<p>
											<em>￥</em>
											<i>${parseInt(money)}</i>
										</p>
										<img src="./assets1911/img/notStarted.png" alt="" />
									`;
								}
							}
							
						}else{
							if(have == -1){ //-1没有库存
								if(money == '免单券'){
									stateStr = `
										<span class="finish">
											已抢完
										</span>
										<img src="./assets1911/img/freeNotStarted.png" alt="" />
									`;
								}else{
									stateStr = `
										<span class="finish">
											已抢完
										</span>
										<p>
											<em>￥</em>
											<i>${parseInt(money)}</i>
										</p>
										<img src="./assets1911/img/notStarted.png" alt="" />
									`;
								}
							}else if(have == 1){ //1有库存可抢
								if(money == '免单券'){
									stateStr = `
										<img src="./assets1911/img/freeStarted.png" alt="" />
									`;
								}else{
									stateStr = `
										<p>
											<em>￥</em>
											<i>${parseInt(money)}</i>
										</p>
										<img src="./assets1911/img/started.png" alt="" />
									`;
								}
							}else if(have == 2){ //2已经拥
								if(money == '免单券'){
									stateStr = `
										<img src="./assets1911/img/freeAcquire.png" alt="" />
									`;
								}else{
									stateStr = `
										<p>
											<em>￥</em>
											<i>${parseInt(money)}</i>
										</p>
										<img src="./assets1911/img/acquire.png" alt="" />
									`;
								}
							}else{
								if(money == '免单券'){
									stateStr = `
										<span class="finish">
											已抢完
										</span>
										<img src="./assets1911/img/freeNotStarted.png" alt="" />
									`;
								}else{
									stateStr = `
										<span class="finish">
											已抢完
										</span>
										<p>
											<em>￥</em>
											<i>${parseInt(money)}</i>
										</p>
										<img src="./assets1911/img/notStarted.png" alt="" />
									`;
								}
							}
						};
						var str = `<dl>
							<dt>
								<div data-gt="${gt}" data-cd="${cd}" data-mey="${money == '免单券' ? '0.00' : money}">
									${stateStr}
								</div>
							</dt>
							<dd>
								${money == '免单券' ? '免单神券': parseInt(money) + '元助学金'}
							</dd>
						</dl>`;
						
						$(`.active${active} .container`).append($.trim(str));
					}
					if(globalFirst || (step != globalStep)){
						exchange(step);
					}
				}else{
					globalMsg(msg);
				}
				tapDisbale1 = false;
				tapDisbale2 = false;
				if(interval){
					clearTimeout(interval);
				}
				interval = setTimeout(function(){
					initActivityInfo(actStatus['active1'],actStatus['time1'],actStatus['activeId1']);
					initActivityInfo(actStatus['active2'],actStatus['time2'],actStatus['activeId2']);
				},1000*30);
				
			},function(){
				tapDisbale1 = false;
				tapDisbale2 = false;
			}
		)
	};
	
	/*获取优惠券信息-结束*/
	function exchange(step){
		globalFirst = false;
		globalStep = step;
//		$actStatus.find('div').removeClass('active');
		if(step == 0){
//			$actStatus.find('.active-one').removeClass('active');
			
		}else if(step == 1){
			$actStatus.find('.active-two').addClass('active');
			$('#activeContainer').append($('.active1'))
			$('#activeContainer').append($('.active2'))
			$('#activeContainer').append($('.active-rule'))
			$('#activeContainer').append($('.assistance-box'))
		}else if(step == 2){
			$actStatus.find('.active-two').addClass('active');
			$('#activeContainer').append($('.active2'))
			$('#activeContainer').append($('.active1'))
			$('#activeContainer').append($('.active-rule'))
			$('#activeContainer').append($('.assistance-box'))
		}else if(step == 3){
			$actStatus.find('.active-two').addClass('active');
			$('#activeContainer').append($('.active1'))
			$('#activeContainer').append($('.active2'))
			$('#activeContainer').append($('.active-rule'))
			$('#activeContainer').append($('.assistance-box'))
		}else if(step == 4){
			$actStatus.find('.active-two').addClass('active');
			$('#activeContainer').append($('.active2'))
			$('#activeContainer').append($('.active1'))
			$('#activeContainer').append($('.active-rule'))
			$('#activeContainer').append($('.assistance-box'))
		}else if(step == 5){
			$actStatus.find('.active-two').addClass('active');
			$('#activeContainer').append($('.active2'))
			$('#activeContainer').append($('.active1'))
			$('#activeContainer').append($('.active-rule'))
			$('#activeContainer').append($('.assistance-box'))
		}else if(step == 6){
			$actStatus.find('.active-two').addClass('active');
			$('#activeContainer').append($('.active2'))
			$('#activeContainer').append($('.active1'))
			$('#activeContainer').append($('.active-rule'))
			$('#activeContainer').append($('.assistance-box'))
		}else{
			$('#activeContainer').append($('.active1'))
			$('#activeContainer').append($('.active2'))
			$('#activeContainer').append($('.active-rule'))
			$('#activeContainer').append($('.assistance-box'))
		}
		if(!globalFirst){
			triggerClick(step);
		}
	}
	
	/*活动一tap切换-开始*/
	$menuTaps1.on('click',function(event,param){
		if(tapDisbale1){
			return false;
		}
		var index = $(this).data('index');
		if(index == 1){
			initActivityInfo(1,'00:00',12);
		}else if(index == 3){
			initActivityInfo(1,'11:11',12);
		}
		if(!param){
			initActivityInfo(actStatus['active2'],actStatus['time2'],actStatus['activeId2']);
		}
		
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		tapDisbale1 = true;
	});
	/*活动一tap切换-结束*/
	
	/*活动二tap切换-开始*/
	$menuTaps2.on('click',function(event,param){
		if(tapDisbale2){
			return false;
		}
		var index = $(this).data('index');
		if(index == 2){
			initActivityInfo(2,'09:00',14);
		}else if(index == 4){
			initActivityInfo(2,'13:00',14);
		}
		else if(index == 5){
			initActivityInfo(2,'19:00',14);
		}
		else if(index == 6){
			initActivityInfo(2,'21:00',14);
		}
		if(!param){
			initActivityInfo(actStatus['active1'],actStatus['time1'],actStatus['activeId1']);
		}
		tapDisbale2 = true;
	});
	/*活动二tap切换-结束*/
	
	/*抢券-开始*/
	function drawLottery(activeId,giftTime,couponId,money){
		var infor = $.getStorage('infor');
		var userSign = infor ? infor['user_sign'] : '';
		$.sendReq(
			api.drawLottery,
			'POST',
			{
				user_sign:userSign,
				activity_id:activeId,
				gift_time:giftTime,
				coupon_id:couponId,
				platform:2
			},
			function(res){
				const {code,data,msg} = res;
				if(code == 0){ //抢券成功
					congratulate(money,data.less_num);
				}else if(code == 400001682){//已获得过
					awardedPriceTip(money);
				}else if(code == 400001698){//您参与次数余额不足
					vacanciesTip('你的参与次数已用完~<br />下次活动期待你的参与');
				}else if(code == 400001684){//库存不足
					const curMoney = parseInt(money);
					if(curMoney == 0){
						withoutTip('太遗憾了,免单助学金库存不足了呦~<br />试试别的吧');
					}else{
						withoutTip(`太遗憾了,${curMoney}元助学金库存不足了呦~<br />试试别的吧`);
					}
				}else if(code == 400001653){ //老学员不能参与
					warmTip();
				}else if(code == 400001653){ //服务器开小差了
					netWrongTip();
				}
				else if(code == 400001681){ //活动未开启
					
				}else if(code == 400001326 || code == 400001306){//登录超时，请稍后重新尝试
					$.removeLocalStorage('infor');
					globalMsg(msg);
					var $headerLogin = $('.header-box .login');
					var $headerLogout = $('.header-box .logout');
					$headerLogin.show();
					$headerLogout.find('i').text('');
					$headerLogout.hide();
					changeLogin(true);
					$('.my-playbill').hide();
					$("#emitEvent").off('click');
					$("#emitEvent").one('click',function(){
						
						drawLottery(activeId,giftTime,couponId,money);
					})
				}
				else{
					globalMsg(msg);
				}
				initActivityInfo(actStatus['active1'],actStatus['time1'],actStatus['activeId1']);
				initActivityInfo(actStatus['active2'],actStatus['time2'],actStatus['activeId2']);
				drawDisbale = false;
			},function(){
				drawDisbale = false;
			}
		)
	};
	$(".active1 .container").on('click','dt div',function(){
		initActivityInfo(actStatus['active1'],actStatus['time1'],actStatus['activeId1']);
		initActivityInfo(actStatus['active2'],actStatus['time2'],actStatus['activeId2']);
		if(drawDisbale){
			return false;
		}
		var priceSrc = $(this).find('img').attr('src');
		if(priceSrc.indexOf('freeStarted.png') > -1 || priceSrc.indexOf('started.png') > -1 || priceSrc.indexOf('acquire.png') > -1 || priceSrc.indexOf('freeAcquire.png') > -1){
			$(this).addClass('active-shake');
			var timer = setTimeout(()=>{
				$(this).removeClass('active-shake');
				if(timer) clearTimeout(timer);
			},1000);
			var giftTime = $(this).data('gt');
			var couponId = $(this).data('cd');
			var mey = $(this).data('mey');
			drawLottery(12,giftTime,couponId,mey);
			drawDisbale = true;
		}else{
			drawDisbale = false;
		}
	});
	
	$(".active2 .container").on('click','dt div',function(){
		
		initActivityInfo(actStatus['active2'],actStatus['time2'],actStatus['activeId2']);
		initActivityInfo(actStatus['active1'],actStatus['time1'],actStatus['activeId1']);
		if(drawDisbale){
			return false;
		}
		var priceSrc = $(this).find('img').attr('src');
		
		if(priceSrc.indexOf('freeStarted.png') > -1 || priceSrc.indexOf('started.png') > -1 || priceSrc.indexOf('acquire.png') > -1){
			$(this).addClass('active-shake');
			var timer = setTimeout(()=>{
				$(this).removeClass('active-shake');
				if(timer) clearTimeout(timer);
			},1000);
			var giftTime = $(this).data('gt');
			var couponId = $(this).data('cd');
			var mey = $(this).data('mey');
			drawLottery(14,giftTime,couponId,mey);
			drawDisbale = true;
		}else{
			drawDisbale = false;
		}
	});
	/*抢券-结束*/
	
	
	function triggerClick(step){
		if(step == 0){
			$menuTaps1.eq(0).trigger('click','self');
			$menuTaps2.eq(0).trigger('click','self');
		}
		else if(step == 1){
			$menuTaps1.eq(0).trigger('click','self');
			$menuTaps2.eq(0).trigger('click','self');
		}else if(step == 2){
			$menuTaps2.eq(0).trigger('click','self');
			$menuTaps1.eq(0).trigger('click','self');
		}else if(step == 3){
			$menuTaps1.eq(1).trigger('click','self');
			$menuTaps2.eq(0).trigger('click','self');
		}else if(step == 4){
//					initActivityInfo(1,'00:00',12);
			$menuTaps2.eq(1).trigger('click','self');
			$menuTaps1.eq(1).trigger('click','self');
		}else if(step == 5){
			$menuTaps2.eq(2).trigger('click','self');
			$menuTaps1.eq(1).trigger('click','self');
		}
		else if(step == 6){
			$menuTaps2.eq(3).trigger('click','self');
			$menuTaps1.eq(1).trigger('click','self');
		}
		else if(step == 7){
			$menuTaps2.eq(3).trigger('click','self');
			$menuTaps1.eq(1).trigger('click','self');
		}
	}
	
	function acTime(){
		$.sendReq(
			api.acTime,
			'get',
			{
				ac_id:12
			},
			function(res){
				const {code,data,msg} = res;
				const { now_time,start_time,end_time } = data;
				const step = judgeStep(now_time,start_time,end_time);
				globalStep = step;
				
				const startDate = new Date(start_time * 1000);
				const startYear = startDate.getFullYear();
				const startMonth = startDate.getMonth() + 1;
				const startDay = startDate.getDate();
				const startHour = startDate.getHours() < 10 ?  '0' + startDate.getHours() : startDate.getHours();
				const startMinute = startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes();
				const endDate = new Date(end_time * 1000);
				const endYear = endDate.getFullYear();
				const endMonth = endDate.getMonth() + 1;
				const endDay = endDate.getDate();
				const endHour = endDate.getHours() < 10 ? '0' + endDate.getHours() : endDate.getHours();
				const endMinute = endDate.getMinutes() < 10 ? '0' + endDate.getMinutes() : endDate.getMinutes();
				
				$actStatus.find('.active-two').find('dd').text(`${startMonth}.${startDay}`);
				$('.active-rule').find('span').text(`${startYear}年${startMonth}月${startDay}日${startHour}:${startMinute}-${endYear}年${endMonth}月${endDay}日${endHour}:${endMinute}`);
				$('.rule-box').find('em').text(`${endYear}年${endMonth}月${endDay}日`);
				
				triggerClick(step);
			}
		);
		var infor = $.getStorage('infor');
		var userSign = infor ? infor['user_sign'] : '';
		if (userSign) {
			$.sendReq(
				api.lotteryCondition,
				'GET',
				{
					user_sign:userSign
				},
				function(res){
					const {code,data,msg} = res;
					if(code == 0){
						$('.my-playbill').show();
					}else if(code == 400001653){
						$('.my-playbill').hide();
					}else{
						$('.my-playbill').hide();
						globalMsg(msg);
					}
				},function(){
					$('.my-playbill').hide();
				}
			)
		}else{
			$('.my-playbill').hide();
		}	
	};
	
	acTime();
	
	var globalInitFirst = true;
	function assist(){
		$.sendReq(
			api.acTime,
			'get',
			{
				ac_id:10
			},
			function(res){
				const {code,data,msg} = res;
				const { now_time,start_time,end_time } = data;
				const leftTime = start_time - now_time;
				const rightTime = end_time - now_time;
				const $activeOne = $actStatus.find('.active-one');
				if(globalInitFirst){
					const startDate = new Date(start_time * 1000);
					const startYear = startDate.getFullYear();
					const startMonth = startDate.getMonth() + 1;
					const startDay = startDate.getDate();
					const endDate = new Date(end_time * 1000);
					const endYear = endDate.getFullYear();
					const endMonth = endDate.getMonth() + 1;
					const endDay = endDate.getDate();
					$('.rule-box').find('span').text(`${startYear}年${startMonth}月${startDay}日-${endYear}年${endMonth}月${endDay}日`);
					$('.rule-box').find('i').text(`${startYear}年${startMonth}月${startDay}日`);
					$activeOne.find('dd').text(`${startMonth}.${startDay}-${endMonth}.${endDay}`);
					globalInitFirst = false;
				}
				
				
				if(leftTime <= 0 && rightTime >=0){ //进行中
					 $activeOne
					 .addClass('active');
					 $('.assistance-box').find('.outer-box').hide();
				}else if(leftTime > 0){ //未开始
					 $activeOne
					 .removeClass('active');
					 $('.assistance-box').find('.outer-box').hide();
				}else{ //已结束
					$activeOne
					.removeClass('active');
					$('.assistance-box').find('.outer-box').show();
				}
				
			}
		);
	};
	
	assist();
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
			const title = '奥鹏双11，百万助学金，一年仅此一次！';
			const desc = '';
			const imgUrl = `${window.location.origin}/activity/assets1911/img/share1.png`;
			const link = `${window.location.origin}/activity/191111mid.html` ;
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
