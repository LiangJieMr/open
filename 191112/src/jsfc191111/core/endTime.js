var getInfor = require('./getInfor');
var showErrorTip = require('./errorTip');
var list = require('./lsit');
var forH = require('./for');
var abnormal = require('./abnormal');
var open = require('../open');
var lucky = require('./lucky');
var changeLogin = require('./changeLogin');
var step = '';
var curSet = '';
var curTime =  '';
var endTime = '';
var startTime = '';
var changeLogin = require('./changeLogin');
function formatDate(now) { 
		var year=now.getFullYear();  //取得4位数的年份
		var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
		var date=now.getDate();      //返回日期月份中的天数（1到31）
		var hour=now.getHours();     //返回日期中的小时数（0到23）
		var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
		var second=now.getSeconds(); //返回日期中的秒数（0到59）
		return year+'年'+month+"月"+date+"日"; 
	} 
// function getLocalTime(nS) { 
// 	      var nT = new Date(parseInt(nS) * 1000).toLocaleString(); 
// 		  var nTinn = nT.indexOf(' ');
// 		  var inTime = nT.slice(0,nTinn);
// 		  var inArr = inTime.split('/');
// 		  return inArr[0] + '年' + inArr[1] + '月' + inArr[2] + '日'
// } 
function judgeStep(timeStamp,start_time,end_time){
	  const timeArr = [start_time,end_time];
	     return timeArr.filter((item)=>item <= timeStamp).length;
};
function actime(){
	$.ajax({
		url : '/api/activity/acTime',
		type : 'get',
		dataType:"JSON",
		data : {
			ac_id : 16
		},
		success : function(res){
			let {code,data,msg} = res
			if(code == 0){
				curTime = data['now_time'];
				endTime = data['end_time'];
				startTime = data['start_time'];
				step = judgeStep(curTime,startTime,endTime);
				var g= startTime * 1000; //定义一个时间戳变量
				var d=new Date(g);
				var h= endTime * 1000; //定义一个时间戳变量
				var j=new Date(h);
				$('.ban_time').html('活动时间：' + formatDate(d)+' - '+formatDate(j))
				bannerTime(step,curTime,endTime,startTime)
			}else{
				showErrorTip(msg)
			}
		},
	})
	if(curSet){
		clearInterval(curSet)
	}
	curSet = setInterval(function(){
		actime()
	},1000*60)
	
}
actime()

//活动时间
function bannerTime(step,curTime,endTime,startTime){
	$.ajax({
		url : '/api/activity/acTime',
		type : 'get',
		dataType:"JSON",
		data : {
			ac_id : 16
		},
		success : function(res){
			let {code,data,msg} = res
			if(code == 0){
				$('.fctime').html('');
				if(step == 1){ //进行中
					var bannTime = timePoor(curTime,endTime);
					var strTime = `<p class="car_jv">距活动结束还剩</p><p class="car_time"><span>${bannTime[0]}</span>天 <span>${bannTime[1]}</span>时 <span>${bannTime[2]}</span>分</p>`;
					$('.fctime').append(strTime)
				}else if(step == 0){//未开始
					var bannTime = timePoor(curTime,startTime);
					var strTime = `<p class="car_jv">距活动开始还剩</p><p class="car_time"><span>${bannTime[0]}</span>天 <span>${bannTime[1]}</span>时 <span>${bannTime[2]}</span>分</p>`;
					$('.fctime').append(strTime)
				}else{//已结束
					var strTime = `<p class="carJie">活动已结束</p>`;
					$('.fctime').append(strTime);
				}
			}else{
				$.removeLocalStorage('infor');
				showErrorTip(msg);
				changeLogin(false);
			}
		},
	})
	winners(step)
	cath(step)
	oldOrNew(step)
}



//获取抽奖单位状态
function cath(step){
	$.ajax({
		url : '/api/activity/posStatus',
		type : 'post',
		dataType : 'JSON',
		data : {
			ac_id : 16,
			user_sign : getInfor(),
			pos_num : 3
		},
		success : function(res){
			let {code,data,msg} = res;
			if(code == 0){
				var dataValue = data['pos_list'];
				$('.chest_inner').html('');
				$('.chest_p').find('span').html('');
				$('.chest_p').find('span').html(data['lottery_num'])
				var num = 0;
				for(let key in dataValue){
					num++;
					var acid1 = dataValue[key]['status'];
					var price = dataValue[key]['price']
					// step = 1;
					// have = 0;
					if(step == 0){
						var str = `<div class="shest_one  che${num}">
										<img id="chestO${num}" class='' data-id='${key}' src="./assetsfc191111/img/chest.png" alt="">
									</div>
									`
					}else if(step == 1){
						if(acid1 == 0){
							var str = `<div class="shest_one che${num}">
											<img id="chestOne${num}" class=''  data-id='${key}' src="./assetsfc191111/img/kai.png" alt="">
											<img id="chestO${num}" class="chestOne"  data-id='${key}' src="./assetsfc191111/img/chest.png" alt="">
										</div>
									`;
						}else if(acid1 == 1){
							var str = `<div class="shest_one che${num}">
											<img id="chestOne${num}" class=''  data-id='${key}' src="./assetsfc191111/img/kai.png" alt="">
											<img id="ch${num}" class=''  data-id='${key}' src="./assetsfc191111/img/guan.png" alt="">
											<div class='pack${num}' id='pack'><b>${parseInt(price)}</b>元助学金</div>
										</div>
									`;
									
									
						}
					}else{
						if(acid1 == 0){
							var str = `<div class="shest_one che${num}">
											<img id="chestOne${num}" class=''  data-id='${key}' src="./assetsfc191111/img/kai.png" alt="">
											<img id="chestO${num}" class="chestOne"  data-id='${key}' src="./assetsfc191111/img/chest.png" alt="">
										</div>
									`;
						}else if(acid1 == 1){
							var str = `<div class="shest_one che${num}">
											<img id="chestOne${num}" class=''  data-id='${key}' src="./assetsfc191111/img/kai.png" alt="">
											<img id="ch${num}" class=''  data-id='${key}' src="./assetsfc191111/img/guan.png" alt="">
											<div class='pack${num}' id='pack'><b>${parseInt(price)}</b>元助学金</div>
										</div>
									`;
									
									
						}
					}
					$('#chestOne1').hide();
					$('#chestOne2').hide();
					$('#chestOne3').hide();
					$('.chest_inner').append(str);
				}
			}else if(code == 400001306 || code == 400001326){
				$.removeLocalStorage('infor');
				// showErrorTip(msg);
				changeLogin(false);
				$('.chest_inner').html('');
				var str = `<div class="shest_one  che1">
								<img id="chestO1" class='' data-id='1' src="./assetsfc191111/img/chest.png" alt="">
							</div>
							<div class="shest_one  che2">
											<img id="chestO2" data-id='2' class='' src="./assetsfc191111/img/chest.png" alt="">
										</div>
										<div class="shest_one  che3">
														<img id="chestO3" data-id='3' class='' src="./assetsfc191111/img/chest.png" alt="">
													</div>
							`
				$('.chest_inner').append(str);
			}
			
		}
	})
}

//判断是否为新老学生
function oldOrNew(step){
	$.ajax({
		url : '/api/activity/lotteryCondition',
		type : 'get',
		dataType : 'json',
		data : {
			user_sign : getInfor()
		},
		success : function(res){
			let {code,msg} = res;
			if(code == 0 && step != 0){
				$("#emilevent").trigger('click');
				$('.chest_p').show();
			}else{
				$('.chest_p').hide();
			}
		}
	})
}

//获奖名单
function winners(step){
	$.ajax({
		url : '/api/activity/winnerList',
		type : 'get',
		dataType : 'JSON',
		data : {
			ac_id : 16
		},
		success : function(res){
			let {code,data,msg} = res;
			$('#demo1').html('');
			$('#dem1').html('');
			for(let key in data['list']){
				var phone = data['list'][key]['phone'];
				var price = data['list'][key]['price'];
				if(step == 0){
					var str = `<p class='list_none'>暂未揭晓</p>`
					$('.list_proson').html(str)
				}else{
					var str = `<li><span class="list_phone">${phone}</span><span class="list_text">获得${parseInt(price)}元助学金</span></li>`
					$('#demo1').append(str)
					$('#dem1').prepend(str)
				}
			}
			list()
		}
	})
}

// 时间差函数
function timePoor(curTime,endTime){
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
	// var level3 = leave2 % (60 * 1000)
	// var seconds = Math.round(level3 / 1000);
	// result += seconds + '秒';
	return result;
}
//补零函数
function pad(num) {
	var long = num.toString().length;
	if(long == 1){
		num = '0'+num
	}else{
		num = num
	}
	return num;
}
module.exports = actime;