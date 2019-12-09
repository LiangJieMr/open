var setInitTime = '';
var step = 0;
var startTime = '';
var getInfor = require('./getInfor');
var changeLogin = require('./changeLogin');
function initTime(onState){
	
	var p = '';
	// function judgeStep(timeStamp){
	// 	const timeArr = [1573401600,1573434000,1573441860,1573448400,1573462800,1573477200,1573488000];
	//     return timeArr.filter((item)=>item <= timeStamp).length;
	// };
	function formatDate(now) { 
		var year=now.getFullYear();  //取得4位数的年份
		var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
		var date=now.getDate();      //返回日期月份中的天数（1到31）
		var hour=now.getHours();     //返回日期中的小时数（0到23）
		var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
		var second=now.getSeconds(); //返回日期中的秒数（0到59）
		return month+"."+date; 
	} 
	
	
// 
// 	function getLocalTime(nS) {
// 	     return new Date(parseInt(nS) * 1000).toLocaleString(); 
// 	} 
	function judgeStep(timeStamp,start_time){
	  if(start_time){
	   startTime = start_time;
	//   console.log(start_time + 24 * 60 * 60)
	  }
	//  const timeArr = [1573401600,1573434000,1573441860,1573448400,1573462800,1573477200,1573488000];
	  const timeArr = [startTime,startTime + 9 * 60 * 60,startTime + 11 * 60 * 60 + 11 * 60,startTime + 13 * 60 * 60,startTime + 19 * 60 * 60,startTime + 21 * 60 * 60,startTime + 24 * 60 * 60];
	     return timeArr.filter((item)=>item <= timeStamp).length;
	 };
	
	//活动时间
	var acdata = {
		ac_id : 12
	}
	// $('.tip').show()
	//场次及奖品信息
	//活动一
	var data1 = {
		activity_id : 12,
		user_sign : getInfor()
	}
	

	//活动二
	var data2 = {
		activity_id : 14,
		user_sign : getInfor()
	}
	$.sendReq("/api/activity/acTime",'get',acdata,function(res){
		// alert(getLocalTime(1572623999))
		const {code,data,msg} = res;
		var g= data['start_time'] * 1000; //定义一个时间戳变量
		var d=new Date(g);
		$('#zhuxuejin').html(formatDate(d))
		if(code == 0){
				const { now_time,start_time,end_time } = data;
			 	step = judgeStep(now_time,start_time,end_time);
			 	$.sendReq("/api/activity/activityInfo",'post',data1,function(data){
					// console.log(data)
					let {code,msg} = data;
					$('.tip').hide()
					if(code == 0){
						// p = data.data['server_time']
						// var step =judgeStep(p);
						$('.activeOne1_ul').html('')
						$('.activeOne2_ul').html('')
						var l0 = data.data['00:00']
						var l1 = data.data['11:11']
						var i = 0;
						actiOne('.activeOne1_ul',l0,'00:00',step,onState);
						actiOne('.activeOne2_ul',l1,'11:11',step,onState);
						$('#emialEvent').trigger('click');
					}else if(code == 400001306){
						$.removeLocalStorage('infor');
						showLogin()
						changeLogin(false)
					}
				});
				$.sendReq("/api/activity/activityInfo",'post',data2,function(data){
					// p = data.data['server_time']
					// var step =judgeStep(p);
					let {code,msg} = data;
					if(code == 0){
						$('.active09').html('')
						$('.active13').html('')
						$('.active19').html('')
						$('.active21').html('')
						var l9 = data.data['09:00']
						var l13 = data.data['13:00']
						var l19 = data.data['19:00']
						var l21 = data.data['21:00']
						// var i = 0;
						// step = 0;
						actiOne('.active09',l9,'09:00',step,onState);
						actiOne('.active13',l13,'13:00',step,onState);
						actiOne('.active19',l19,'19:00',step,onState);
						actiOne('.active21',l21,'21:00',step,onState);
					}else if(code == 400001306){
						$.removeLocalStorage('infor');
						showLogin()
						changeLogin(false)
					}
				});
		}else if(code == 400001306){
			$.removeLocalStorage('infor');
			showLogin()
			changeLogin(false)
		}
	})


	
	
	if(setInitTime){
		clearInterval(setInitTime)
	}
	setInitTime = setInterval(function(){
		initTime()
	},1000*60)
	
	//判断抽奖用户是否为“新用户”
	var newData = {
		user_sign : getInfor()
	}
	$.sendReq("/api/activity/lotteryCondition",'get',newData,function(data){
		const {code,msg} = data;
		if(code == 0){
			$('.help_chaKan').show()
		}else{
			$('.help_chaKan').hide()
		}
	})
}

function actiOne(active,time,shi,step,onState){
	const curTimeTap = {
		'00:00':1,
		'11:11':3,
		'09:00':2,
		'13:00':4,
		'19:00':5,
		'21:00':6,
	}[shi];
	// alert(step)
	var curStatus = -1;
	if(curTimeTap > step){ //未开始
			curStatus = -1;
			if(onState != 1){
				if(shi == '00:00'){
					$('.state').eq(0).html('未开始').attr('class','state')
					$('.activeOne_inn_tit').css('background','url(./assets191111/img/activeOnebg_l.png)')
					$('.ac').eq(0).show();
					$('.ac').eq(0).attr('class','ac ac_wei')
					$('.ac_state').eq(0).html('未开始')
				}
				if(shi == '11:11'){
					$('.state').eq(1).html('未开始').attr('class','state')
					$('.activeOne_inn_tit').css('background','url(./assets191111/img/activeOnebg_l.png)')
				}
				if(shi == '09:00'){
					// $('.ac').eq(0).hide();
					$('.nav_li_sp').eq(0).attr('class','nav_li_sp').html('未开始')
				}
				if(shi == '13:00'){
					$('.ac').eq(1).hide()
					$('.nav_li_sp').eq(1).attr('class','nav_li_sp').html('未开始')
				}
				if(shi == '19:00'){
					$('.ac').eq(2).hide()
					$('.nav_li_sp').eq(2).attr('class','nav_li_sp').html('未开始')
				}
				if(shi == '21:00'){
					$('.ac').eq(3).hide()
					$('.nav_li_sp').eq(3).attr('class','nav_li_sp').html('未开始')
				}
			}
			// $('.state').eq(0).html('未开始')
	}else if(curTimeTap == step){ //正在进行
			curStatus =0;
			// $('.ban_ac').eq(0).attr('class','zhuLi ban_ac')
			// $('.ban_ac').eq(1).attr('class','zhuXueJin ban_ac banner_act')
			if(shi == '00:00'){
				if(onState != 1){
					$('.activeOne_inn_tit').css('background','url(./assets191111/img/activeOnebg_l.png)')
					$('.activeOne_inn_con').eq(0).attr('class','activeOne_inn_con')
					$('.activeOne_inn_con').eq(1).attr('class','activeOne_inn_con acOneInn')
					$('.ac').eq(0).show();
					$('.ac').eq(0).attr('class','ac ac_wei')
					$('.ac_state').eq(0).html('未开始')
				}
				$('.state').eq(0).html('进行中').attr('class','state doing')
				$('.activeOne').after($('.activeTwo'))
				$('.activeOne').attr('id','activeOne')
				$('.activeTwo').attr('id','')
				$('.rules').after($('.kong'))
				$('.kong').after($('.help'))
				// $('.ban_ac').eq(0).attr('class','zhuLi ban_ac')
				$('.ban_ac').eq(1).attr('class','zhuXueJin ban_ac banner_act')
			}
			if(shi == '09:00'){
				if(onState != 1){
					$('.ac').eq(0).attr('class','ac ac_te');
					$('.ac').eq(0).show();
					$('.tab').eq(0).show();
					$('.tab').eq(1).hide();
					$('.tab').eq(2).hide();
					$('.tab').eq(3).hide();
				}
				
				$('.ac_state').eq(0).html('进行中')
				$('.nav_li_sp').eq(0).attr('class','nav_li_sp sp_doing').html('进行中')
				$('.activeTwo').after($('.activeOne'))
				$('.activeOne').attr('id','')
				$('.activeTwo').attr('id','activeOne')
				$('.rules').after($('.kong'))
				$('.kong').after($('.help'))
				// $('.ban_ac').eq(0).attr('class','zhuLi ban_ac')
				$('.ban_ac').eq(1).attr('class','zhuXueJin ban_ac banner_act')
			}
			if(shi == '11:11'){
				if(onState != 1){
					$('.activeOne_inn_con').eq(0).attr('class','activeOne_inn_con acOneInn')
					$('.activeOne_inn_con').eq(1).attr('class','activeOne_inn_con')
					$('.activeOne_inn_tit').css('background','url(./assets191111/img/activeOnebg_r.png)')
				}
				$('.state').eq(1).html('进行中').attr('class','state doing')
				$('.activeOne').after($('.activeTwo'))
				$('.activeOne').attr('id','activeOne')
				$('.activeTwo').attr('id','')
				$('.rules').after($('.kong'))
				$('.kong').after($('.help'))
				// $('.ban_ac').eq(0).attr('class','zhuLi ban_ac')
				$('.ban_ac').eq(1).attr('class','zhuXueJin ban_ac banner_act')
			}
			if(shi == '13:00'){
				if(onState != 1){
					$('.ac').eq(0).hide();
					$('.ac').eq(1).show();
					$('.tab').eq(0).hide();
					$('.tab').eq(1).show();
					$('.tab').eq(2).hide();
					$('.tab').eq(3).hide();
					$('.ac').eq(1).attr('class','ac ac_te')
				}
				$('.ac_state').eq(1).html('进行中')
				$('.nav_li_sp').eq(1).attr('class','nav_li_sp sp_doing').html('进行中')
				$('.activeTwo').after($('.activeOne'))
				$('.activeOne').attr('id','')
				$('.activeTwo').attr('id','activeOne')
				$('.rules').after($('.kong'))
				$('.kong').after($('.help'))
				// $('.ban_ac').eq(0).attr('class','zhuLi ban_ac')
				$('.ban_ac').eq(1).attr('class','zhuXueJin ban_ac banner_act')
			}
			if(shi == '19:00'){
				if(onState != 1){
					$('.ac').eq(0).hide();
					$('.ac').eq(1).hide();
					$('.ac').eq(2).show();
					$('.tab').eq(0).hide();
					$('.tab').eq(1).hide();
					$('.tab').eq(2).show();
					$('.tab').eq(3).hide();
					$('.ac').eq(2).attr('class','ac ac_te')
				}
				$('.ac_state').eq(2).html('进行中')
				$('.nav_li_sp').eq(2).attr('class','nav_li_sp sp_doing').html('进行中')
				$('.activeTwo').after($('.activeOne'))
				$('.activeOne').attr('id','')
				$('.activeTwo').attr('id','activeOne')
				$('.rules').after($('.kong'))
				$('.kong').after($('.help'))
				// $('.ban_ac').eq(0).attr('class','zhuLi ban_ac')
				$('.ban_ac').eq(1).attr('class','zhuXueJin ban_ac banner_act')
			}
			if(shi == '21:00'){
				if(onState != 1){
					$('.ac').eq(0).hide();
					$('.ac').eq(1).hide();
					$('.ac').eq(2).hide();
					$('.ac').eq(3).show();
					$('.tab').eq(0).hide();
					$('.tab').eq(1).hide();
					$('.tab').eq(2).hide();
					$('.tab').eq(3).show();
					$('.ac').eq(3).attr('class','ac ac_te')
				}
				
				$('.ac_state').eq(3).html('进行中')
				$('.nav_li_sp').eq(3).attr('class','nav_li_sp sp_doing').html('进行中')
				$('.activeTwo').after($('.activeOne'))
				$('.activeOne').attr('id','')
				$('.activeTwo').attr('id','activeOne')
				$('.rules').after($('.kong'))
				$('.kong').after($('.help'))
				// $('.ban_ac').eq(0).attr('class','zhuLi ban_ac')
				$('.ban_ac').eq(1).attr('class','zhuXueJin ban_ac banner_act')
			}
	}else{ //已结束
			curStatus = 1;
			if(shi == '00:00'){
				$('.state').eq(0).html('已结束').attr('class','state over')
				if(onState != 1){
					//$('.activeOne_inn_tit').css('background','url(./assets191111/img/activeOnebg_r.png)')
				}
			}
			if(shi == '09:00'){
				$('.ac').eq(0).attr('class','ac ac_yi')
				$('.ac_state').eq(0).html('已结束')
				$('.nav_li_sp').eq(0).attr('class','nav_li_sp sp_jieShu').html('已结束')
			}
			if(shi == '11:11'){
				$('.state').eq(1).html('已结束').attr('class','state over')
				if(onState != 1){
					$('.activeOne_inn_tit').css('background','url(./assets191111/img/activeOnebg_r.png)')
					$('.activeOne_inn_con').eq(0).attr('class','activeOne_inn_con acOneInn')
					$('.activeOne_inn_con').eq(1).attr('class','activeOne_inn_con')
				}
			}
			if(shi == '13:00'){
				$('.ac').eq(1).attr('class','ac ac_yi')
				$('.ac_state').eq(1).html('已结束')
				$('.nav_li_sp').eq(1).attr('class','nav_li_sp sp_jieShu').html('已结束')
			}
			if(shi == '19:00'){
				$('.ac').eq(2).attr('class','ac ac_yi')
				$('.ac_state').eq(2).html('已结束')
				$('.nav_li_sp').eq(2).attr('class','nav_li_sp sp_jieShu').html('已结束')
			}
			if(shi == '21:00'){
				$('.ac').eq(3).attr('class','ac ac_yi')
				$('.ac_state').eq(3).html('已结束')
				$('.nav_li_sp').eq(3).attr('class','nav_li_sp sp_jieShu').html('已结束')
			}
			
	}
	if(step >= 7){
		$('.kong').after($('.help'))
		$('.help').after($('.activeOne'))
		$('.activeOne').after($('.activeTwo'))
		$('.activeOne').attr('id','activeOne')
		$('.activeTwo').after($('.rules'))
		if(onState != 1){
			$('.ac').eq(0).hide();
			$('.ac').eq(1).hide();
			$('.ac').eq(2).hide();
			$('.ac').eq(3).show();
			$('.tab').eq(0).hide();
			$('.tab').eq(1).hide();
			$('.tab').eq(2).hide();
			$('.tab').eq(3).show();
		}
		
		// $('.help_over').show()
		// alert('111')
		// $('.ban_ac').eq(0).attr('class','zhuLi ban_ac')
		$('.ban_ac').eq(1).attr('class','zhuXueJin ban_ac')
		// $('.nav_li_sp').eq(0).attr('class','nav_li_sp sp_yi').html('已结束')
		// $('.nav_li_sp').eq(1).attr('class','nav_li_sp sp_yi').html('已结束')
		// $('.nav_li_sp').eq(2).attr('class','nav_li_sp sp_yi').html('已结束')
		// $('.nav_li_sp').eq(3).attr('class','nav_li_sp sp_yi').html('已结束')
		// return false;
	}
	for(let key in time){
		var money = time[key]['money'];
		var coupon_id = time[key]['coupon_id'];
		var have = time[key]['have'];
		var gift_time = time[key]['gift_time'];
		// have = 2;
		if(curStatus == -1){ //未开始
			if(money == '免单券'){
				// var str = `<li><img class="jiang" src="./assets191111/img/miandan_w.png" alt=""></img><span class="con_p over_p">免单神券</span></li>`
				var str = `<li>
								<div class="con_Li">
									<b class="l0">免单</b>
									<img class="jiang" src="./assets191111/img/notStarted.png" alt="">
								</div>
								<span class="con_p">免单神券</span>
							</li>`
			}else{
				var str = ` <li>
								<div class="con_Li">
									<b class="l0"><span>&yen;</span>${parseInt(money)}</b>
									<img class="jiang" src="./assets191111/img/notStarted.png" alt="">
								</div>
								<span class="con_p">${parseInt(money)}元助学金</span>
							</li>`
			}
		}else if(curStatus == 1){ //已结束
			if(money == '免单券'){
				if(have == 2){
				var	str = ` <li>
									<div class="con_Li">
										<b class="l0">免单</b>
										<div class="con_btn">
											<p class="acOne liqu deDao" data-gt='${gift_time}' data-mey='0' data-id='${coupon_id}' >已获得</p>
										</div>
										<img class="jiang" id='can' src="./assets191111/img/miandan.png" alt="">
									</div>
									<span class="con_p">免单神券</span>
								</li>
							`;
				}else{
					//var str = `<li><span class="Over">已结束</span><img class="jiang" src="./assets191111/img/miandan_w.png" alt=""></img><span class="con_p over_p">免单神券</span></li>`
					var str = ` <li>
									<span class="Over">已结束</span>
									<div class="con_Li">
										<b class="l0">免单</b>
										<img class="jiang" src="./assets191111/img/notStarted.png" alt="">
									</div>
									<span class="con_p">免单神券</span>
								</li>`
				}
			}else{
				if(have == 2){
					var str = ` <li>
								<div class="con_Li">
									<b class="l0"><span>&yen;</span>${parseInt(money)}</b>
									<div class="con_btn">
										<p class="acOne liqu deDao" data-gt='${gift_time}' data-mey=${money} data-id='${coupon_id}'>已获得</p>
									</div>
									<img class="jiang" id='can' src="./assets191111/img/jin.png" alt="">
								</div>
								<span class="con_p">${parseInt(money)}元助学金</span>
							</li>
						`;
				}else{
					var str = ` <li>
									<span class="Over">已结束</span>
									<div class="con_Li">
										<b class="l0"><span>&yen;</span>${parseInt(money)}</b>
										<img class="jiang" src="./assets191111/img/notStarted.png" alt="">
									</div>
									<span class="con_p">${parseInt(money)}元助学金</span>
								</li>`
				}
			}
		}else{
			if(have == -1){
				if(money == '免单券'){
					//str = `
					//<li><span class="Over">已抢完</span><img class="jiang" src="./assets191111/img/miandan_w.png" alt=""></img><span class="con_p over_p">免单神券</span></li>`;
					str = `
						<li>
						<span class="Over">已抢完</span>
						<div class="con_Li">
							<b class="l0">免单</b>
							<img class="jiang" src="./assets191111/img/notStarted.png" alt="">
						</div>
						<span class="con_p">免单神券</span>
					</li>
						`;
				}else{
					str = `
					<li>
					<span class="Over">已抢完</span>
					<div class="con_Li">
						<b class="l0"><span>&yen;</span>${parseInt(money)}</b>
						<img class="jiang" src="./assets191111/img/notStarted.png" alt="">
					</div>
					<span class="con_p">${parseInt(money)}元助学金</span>
				</li>
					`;
				}
			}else if(have == 1){ //1有库存可抢
				if(money == '免单券'){
					var str = ` <li>
									<div class="con_Li">
										<b class="l0">免单</b>
										<div class="con_btn">
											<p class="acOne" data-gt='${gift_time}' data-mey='0' data-id='${coupon_id}' >立即领取</p>
										</div>
										<img class="jiang" id='can' src="./assets191111/img/miandan.png" alt="">
									</div>
									<span class="con_p">免单神券</span>
								</li>
							`
				}else{
					var str = ` <li>
								<div class="con_Li">
									<b class="l0"><span>&yen;</span>${parseInt(money)}</b>
									<div class="con_btn">
										<p class="acOne" data-gt='${gift_time}' data-mey=${money} data-id='${coupon_id}'>立即领取</p>
									</div>
									<img class="jiang" id='can' src="./assets191111/img/jin.png" alt="">
								</div>
								<span class="con_p">${parseInt(money)}元助学金</span>
							</li>
						`
				}
			}else if(have == 2){ //2已经拥
				if(money == '免单券'){
					var str = ` <li>
									<div class="con_Li">
										<b class="l0">免单</b>
										<div class="con_btn">
											<p class="acOne liqu deDao" data-gt='${gift_time}' data-mey='0' data-id='${coupon_id}' >已获得</p>
										</div>
										<img class="jiang" id='can' src="./assets191111/img/miandan.png" alt="">
									</div>
									<span class="con_p">免单神券</span>
								</li>
							`;
				}else{
					var str = ` <li>
								<div class="con_Li">
									<b class="l0"><span>&yen;</span>${parseInt(money)}</b>
									<div class="con_btn">
										<p class="acOne liqu deDao" data-gt='${gift_time}' data-mey=${money} data-id='${coupon_id}'>已获得</p>
									</div>
									<img class="jiang" id='can' src="./assets191111/img/jin.png" alt="">
								</div>
								<span class="con_p">${parseInt(money)}元助学金</span>
							</li>
						`;
				}
			}else{
				if(money == '免单券'){
					//str = `
					//<li><span class="Over">已抢完</span><img class="jiang" src="./assets191111/img/miandan_w.png" alt=""></img><span class="con_p over_p">免单神券</span></li>`;
					str = `
						<li>
						<span class="Over">已抢完</span>
						<div class="con_Li">
							<b class="l0">免单</b>
							<img class="jiang" src="./assets191111/img/notStarted.png" alt="">
						</div>
						<span class="con_p">免单神券</span>
					</li>
						`;
				}else{
					str = `
					<li>
					<span class="Over">已抢完</span>
					<div class="con_Li">
						<b class="l0"><span>&yen;</span>${parseInt(money)}</b>
						<div class="con_btn">
							<p class="acOne" data-gt='${gift_time}' data-mey=${money} data-id='${coupon_id}'>立即领取</p>
						</div>
						<img class="jiang" src="./assets191111/img/notStarted.png" alt="">
					</div>
					<span class="con_p">${parseInt(money)}元助学金</span>
				</li>
					`;
				}
			}
		}
		$(active).append($.trim(str))
	}
}

module.exports = initTime;