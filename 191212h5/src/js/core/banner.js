var list = require('./winners.js');
var showErrorTip = require('./errorTip.js');
var changeLogin = require('./changeLogin.js');
var api = {
	time : '/api/activity/acTime',
	winners: '/api/activity/winnerList',
	address: '/api/activity/addPrizeBase',
	myprize: '/api/activity/myPrize',
	delever: '/api/activity/deliver',
	giftlist: '/api/activity/giftList'
}
var curTime =  '';
var endTime = '';
var startTime = '';
var forTimeSet = '';
var acTimeSet = '';
var step = '';
var anma = '';
var flag = true;

/*获取我的奖品开始*/
function getMyPrize(){
	var myPrizeData = {
		user_sign : $.getStorage('infor'),
		ac_id : 22
	}
	$.sendReq(api.myprize,'get',myPrizeData,function(res){
		let {code,data,msg} = res;
		if(code == 0){
			$('.myprize').show();
			$('.myname').html('姓名：' + data["address_name"]);
			$('.myphone').html('电话：' + data["phone"]);
			$('.myprize_add').html('收货信息：' + data["address"]);
		}else{
			$('.myprize').hide();
			showErrorTip(msg)
		}
	})
}
/*获取我的奖品结束*/

/*获取奖品列表开始*/
function getGiftList(){
	$.sendReq(api.giftlist,'GET',{ac_id: 22},function(res){
		let {code,data,msg} = res;
		if(code == 0){
			if(data['prize_degree'] == 1){
				var str = `<span>${data[0]['prize_quota']}名</span><b>特等奖：kindle电子书（价值999元）</b>`;
				$('.special_img').attr('src','./assets/img/topgrade.png');
				$('.special').append(str);
			}else if(data['prize_degree'] == 2){
				var str1 = `<div class="prizeset_top_int">
								<span>${data[1]['prize_quota']}名</span><b>一等奖：</b>
							</div>
							<p>美的扫地机器人</p>
							<p>（价值699元）</p>`;
				$('.prize1li_img').attr('src','./assets/img/prize1.png');
				$('.prize1li').append(str1);
			}else if(data['prize_degree'] == 3){
				var str2 = `<div class="prizeset_top_int">
								<span>${data[2]['prize_quota']}名</span><b>二等奖：</b>
							</div>
							<p>限量版奥鹏双肩包</p>
							<p>（价值299元）</p>`;
				$('.prize2li_img').attr('./assets/img/prize2.png');
				$('.prize2li').append(str2);
			}else if(data['prize_degree'] == 4){
				var str3 = `<div class="prizeset_top_int">
								<span>${data[3]['prize_quota']}名</span><b>二等奖：</b>
							</div>
							<p>限量版奥鹏双肩包</p>
							<p>（价值299元）</p>`;
				$('.prize3li_img').attr('./assets/img/prize3.png');
				$('.prize3li').append(str3);
			}
		}else{
			showErrorTip(msg)
		}
	})
}
/*获取奖品列表结束*/

/*判断奖品是否发货开始*/
function isDelivery(){
	$.sendReq(api.delever,'POST',{user_sign: $.getStorage('infor')},function(res){
		let {code,data,msg} = res;
		if(code == 648){
			$('.changeaddress').hide()
		}else if(code == 0 || data == true){
			$('.changeaddress').show()
		}else if(code == 4000012){
			showErrorTip(msg)
		}
	})
}
/*判断奖品是否发货结束*/

/*填写收货地址开始*/
	$('.register').on('click',function(){
		$('.playbox').hide();
		$('.form-first').show();
		actime()
	})
	$('.placls').on('click',function(){
		$('.mask').hide();
		$('.playbox').hide();
		$('.myprize').show();
		actime()
	})
/*填写收货地址结束*/

/*收货地址开始*/
$('.changeaddress').on('click',function(){
	$('.form-first').show();
	$('.mask').show();
})
$('.addre').on('click',function(){
	$('.form-first').hide();
	$('.mask').hide();
	actime()
})
$('.submit').on('click',function(){
	var adddata = {
		user_sign : $.getStorage('infor') || '',
		name : $('.addressname').val(),
		phone :  $('.form-first-phone').val(),
		address : $('.textarea').val()
	}
	$.sendReq(api.address,'POST',adddata,function(res){
		let {code,data,msg} = res;
		if(code == 0){
			$('.myname').html('姓名：' + $('.addressname').val());
			$('.myphone').html('电话：' + $('.form-first-phone').val());
			$('.myprize_add').html('收货信息：' + $('.textarea').val());
			actime();
		}
	})
	$('.form-first').hide();
	$('.mask').hide();
})
/*收货地址结束*/


/*活动时间开始*/
actime()
function actime(){
	$.sendReq(api.time,'get',{ac_id: 22},function(res){
		let {code,data,msg} = res;
		if(code == 0){
			$("#emilevent").trigger('click');
			curTime = data['now_time'];
			endTime = data['end_time'];
			startTime = data['start_time'];
			step = judgeStep(curTime,startTime,endTime);
			var g= startTime * 1000; //定义一个时间戳变量
			var d=new Date(g);
			var h= endTime * 1000; //定义一个时间戳变量
			var j=new Date(h);
			$('.activity-time span').html('活动时间：' + formatDate(d)+' - '+formatDate(j))
			$('.count-down').html('');
			// step = 3;
			if(step == 1){ //进行中
				var bannTime = timePoor(curTime,endTime);
				var strTime = `<p class="count-down-t">距活动结束还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${bannTime[2]}</span>分<span class="time s">${bannTime[3]}</span>秒`;
				$('.count-down').append(strTime)
				forTime(bannTime,step)
			}else if(step == 0){//未开始
				var bannTime = timePoor(curTime,startTime);
				var strTime = `<p class="count-down-t">距活动开始还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${bannTime[2]}</span>分<span class="time s">${bannTime[3]}</span>秒`;
				$('.count-down').append(strTime)
				forTime(bannTime,step)
			}else{//已结束
				var strTime = `<p class="count-down-t">活动已结束:</p><span class="time d">00</span>天<span class="time h">00</span>时<span class="time m">00</span>分<span class="time m">00</span>秒`;
				$('.count-down').append(strTime);
			}
			
			//用户登录成功之后请求的接口
			if($.getStorage('infor') && step != 0){
				isDelivery(); //判断奖品是否发货
				getMyPrize(); //获取我的奖品
			};
			winner(step)
			getGiftList()
		}else{
			showErrorTip(msg)
		}
	});
	if(acTimeSet){
		clearInterval(acTimeSet)
	}
	acTimeSet =setInterval(function(){
		actime()
	},1000 * 60)
}

/*活动时间结束*/

/*活动时间以秒倒计时开始*/
function forTime(bannTime,step){
	if(forTimeSet){
		clearInterval(forTimeSet);
	}
	forTimeSet = setInterval(function(){
		bannTime[3]--;
		if(bannTime[3] == 0){
			bannTime[2]--;
			bannTime[3] = 59
		}
		$('.count-down').html('');
		if(step == 1){
			var strTime = `<p class="count-down-t">距活动结束还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${pad(bannTime[2])}</span>分<span class="time s">${pad(bannTime[3])}</span>秒`;
		}else if(step == 0){
			var strTime = `<p class="count-down-t">距活动开始还剩:</p><span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${pad(bannTime[2])}</span>分<span class="time s">${pad(bannTime[3])}</span>秒`;
		}
		$('.count-down').append(strTime)
	},1000)
}
/*活动时间以秒倒计时结束*/

//获奖名单
function winner(step){
	$.sendReq(api.winners,'get',{ac_id: 22},function(res){
		let {code,data,msg} = res;
		if(code == 0){
			$('#demo1').html('');
			$('#dem1').html('');
			for(let key in data['list']){
				var phone = data['list'][key]['phone'];
				var price = data['list'][key]['prize_grade'];
				if(step == 0){
					var str = `<p>暂未揭晓</p>`
					$('.winners_demo').html(str)
				}else if(step == 1){
					var str = `<li><span class="list_phone">${phone}</span><span class="list_text">获得${price}</span></li>`
					$('#demo1').append(str)
					$('#dem1').prepend(str)
					list();
				}
			}
		}else{
			showErrorTip(msg)
		}
	})
}
/*抽奖*/
$('.activity_rollpointer').on('click',()=>{
	if(!$.getStorage('infor')){
		showErrorTip('暂未登录');
		changeLogin(true);
		$('#emilevent').off('click');
		$('#emilevent').one('click',function(){
			roll(step)
		})
	}else if($.getStorage('infor')){
		roll(step)
	}
})
var mathRandomTwo= Math.floor(Math.random()*2);
var mathRandomThree = Math.floor(Math.random()*3)
function mathRan(num1,num2){
	return Math.floor(Math.random()*(num2-num1)+num1);
}
function roll(step){
	if(!flag){
		return false;
	}
	flag = false;
	if(step == 0){
		showErrorTip('活动暂未开启')
		return flase;
	}else if(step == 1){
		$.sendReq(api.winners,'get',{ac_id: 22},function(res){
			let {code,data,msg} = res;
			var prize;
			var angle;
			if(code == 0){
				switch('奖品id') {
					case 1: prize = 1;break;
					case 2: prize = [4,9][mathRandomTwo];break;
					case 3: prize = [3,6][mathRandomTwo];break;
					case 4: prize = [2,5,8][mathRandomThree];break;
					case 5: prize = 7;break;
				}
				acRoll(prize,flag)
			}
		})
	}else if(step == 2){
		showErrorTip('活动已结束')
		return flase;
	}else{
		showErrorTip('活动已结束')
		return flase;
	}
}

function acRoll(angle){
	if(angle == 1){
		anma = [mathRan(342,359),mathRan(2,19)];
		angle = anma[mathRandomTwo];
	}else if(angle == 2 || angle == 5 || angle == 8){
		anma = [mathRan(302,339),mathRan(182,219),mathRan(62,99)];
		angle = anma[mathRandomThree];
	}else if(angle == 3 || angle == 6){
		anma = [mathRan(262,299),mathRan(142,179)];
		angle = anma[mathRandomTwo];
	}else if(angle == 4 || angle == 9){
		anma = [mathRan(222,259),mathRan(22,59)];
		angle = anma[mathRandomTwo];
	}else if(angle == 7){
		angle = mathRan(102,139)
	}
	$(".activity_rollprizeimg").rotate({//旋转
	    angle: 90, //角度
	    duration: 7000, //持续时间
	    animateTo: angle + 3600, //angle是图片上各奖项对应的角度，2160是我要让指针旋转6圈。所以最后的结束的角度就是这样子^^
	    callback: function () {
			flag = true;
			$('.playbox').show();
			$('.mask').show();
			// console.log(angle,'angle');
	  //       alert(angle + "度 持续时间6秒 转了6圈！");
	        // window.location.href = window.location.href;
	    }
	});
}

/*抽奖开始*/
// var portion = 40; //没份奖品角度为40
// $('.activity_rollpointer').on('click',function(){
// angle = mathRan(102,139)
// 	console.log(mathRandomTwo)
// 	$(".activity_rollprizeimg").rotate({//旋转
// 	    angle: 90, //角度
// 	    duration: 7000, //持续时间
// 	    animateTo: angle + 3600, //angle是图片上各奖项对应的角度，2160是我要让指针旋转6圈。所以最后的结束的角度就是这样子^^
// 	    callback: function () {
// 			console.log(angle,'angle');
// 	        alert(angle + "度 持续时间6秒 转了6圈！");
// 	        // window.location.href = window.location.href;
// 	    }
// 	});
// })
/*抽奖结束*/
function judgeStep(timeStamp,start_time,end_time){
	const timeArr = [start_time,end_time];
	return timeArr.filter((item)=>item <= timeStamp).length;
};
function formatDate(now) { 
	var year=now.getFullYear();  //取得4位数的年份
	var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
	var date=now.getDate();      //返回日期月份中的天数（1到31）
	var hour=now.getHours();     //返回日期中的小时数（0到23）
	var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
	var second=now.getSeconds(); //返回日期中的秒数（0到59）
	return year+'.'+month+"."+date; 
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
	var level3 = leave2 % (60 * 1000)
	var seconds = Math.round(level3 / 1000);
	result[3] = pad(seconds);
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