var getInfor = require('./getInfor')
var begi = new Date('2019-11-08 00:00:00')
console.log(begi.getTime())
var overi = new Date('2019-11-11 00:00:00')
var activity_list = require('./activity_list');
var showLogin = require('./login');
var evn = require('../config');
var showErrorTip = require('./errorTip');
var act = '';
var doTime = '';
var helpTime = '';
var haiTime = '';
var loca = '';
var loca1 = '';
// var helTime = [1573142400,1573401600,1573488000];
var step = 0;

function formatDate(now) { 
		var year=now.getFullYear();  //取得4位数的年份
		var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
		var date=now.getDate();      //返回日期月份中的天数（1到31）
		var hour=now.getHours();     //返回日期中的小时数（0到23）
		var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
		var second=now.getSeconds(); //返回日期中的秒数（0到59）
		return month+"."+date; 
	} 
    // function getLocalTime(nS) { 
    //    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 
    // } 
    //    console.log(getLocalTime(1573401599)); 
function judgeStep(timeStamp,start_time,end_time){
	//   if(start_time){
	//    startTime = start_time;
	// //   console.log(start_time + 24 * 60 * 60)
	//   }
	//  const timeArr = [1573401600,1573434000,1573441860,1573448400,1573462800,1573477200,1573488000];
	  const timeArr = [start_time,end_time];
	     return timeArr.filter((item)=>item <= timeStamp).length;
	 };
	 function getLocalTime(nS) { 
	     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g, ".").replace(/下午/g, " ").slice(5,10).replace(/\s*/g,''); 
	} 
	 //活动时间
	 acT()
	function acT(){
		var acdata = {
			ac_id : 10
		}
		$.sendReq("/api/activity/acTime",'get',acdata,function(res){
			const {code,data,msg} = res;
			var g= data['start_time'] * 1000; //定义一个时间戳变量
			var d=new Date(g);
			var h = data['end_time'] * 1000;
			var j=new Date(h);
			$('#zhuli').html(formatDate(d)+' - '+formatDate(j))
			if(code == 0){
					const { now_time,start_time,end_time } = data;
				 	step = judgeStep(now_time,start_time,end_time);
			}
			if(step > 0 && step < 2){
				$('.ban_ac').eq(0).attr('class','zhuLi ban_ac banner_act')
				// $('.ban_ac').eq(1).attr('class','zhuXueJin ban_ac')
			}
			// step = 2;
			if(step >= 2){
				$('.help_over').show()
				$('.rules').after($('.kong'))
				$('.kong').after($('.help'))
				$('.ban_ac').eq(0).attr('class','zhuLi ban_ac')
			}
			if(act){
				clearInterval(act)
			}
			act = setInterval(function(){
				acT()
			},1000*60)
				
		})
	}


var apihellp = '/api/activity/lotteryCondition?user_sign=';
$('.posters_btn_inn').on('click',function(){
	if(haiTime){
		clearTimeout(haiTime)
	}
	haiTime = setTimeout(function(){
		$('.posters').hide()
		$('.mask').hide()
	},500)
})
console.log(window.location)
$('.invite_btn').on('click',function(){
	
		
	if(window.location.origin == 'http://10.100.136.243:8000'){
		loca1 = 'http://test.iopen.com.cn';
		
		
		$('.posters').show()
		$('.mask').show()
		$('.invite').hide()
		var pho = $.getStorage('infor') ? $.getStorage('infor').phoneNum ? $.getStorage('infor').phoneNum : '' : '';
		$('#poster_img').attr('src',`/api/activity/boostPoster?ac_id=10&user_sign=${getInfor()}&location_url=${loca1}/activity/zl191111.html&param=${JSON.stringify({phone:pho})}`)
		$('.posters_btn_inn').attr('href','/api/activity/posterDownload?user_sign=' + getInfor())
	}
	
	if(window.location.origin == 'http://www.open.com.cn' || window.location.origin == 'http://www.iopen.com.cn' ||  window.location.origin == 'https://www.open.com.cn'){
		loca1 = 'http://m.open.com.cn';
		
		$('.posters').show()
		$('.mask').show()
		$('.invite').hide()
		var pho = $.getStorage('infor') ? $.getStorage('infor').phoneNum ? $.getStorage('infor').phoneNum : '' : '';
		$('#poster_img').attr('src',`/api/activity/boostPoster?ac_id=10&user_sign=${getInfor()}&location_url=${loca1}/activity/zl191111.html&param=${JSON.stringify({phone:pho})}`)
		$('.posters_btn_inn').attr('href','/api/activity/posterDownload?user_sign=' + getInfor())
	}
	
	if(window.location.origin == 'http://localhost:3000'){
		loca1 = 'http://localhost:3000';
		
		$('.posters').show()
		$('.mask').show()
		$('.invite').hide()
		var pho = $.getStorage('infor') ? $.getStorage('infor').phoneNum ? $.getStorage('infor').phoneNum : '' : '';
		$('#poster_img').attr('src',`/api/activity/boostPoster?ac_id=10&user_sign=${getInfor()}&location_url=${loca1}/activity/zl191111.html&param=${JSON.stringify({phone:pho})}`)
		$('.posters_btn_inn').attr('href','/api/activity/posterDownload?user_sign=' + getInfor())
	}
})
$('.help_btn').on('click',function(){
	if(getInfor()){
		// step = 2;
		// doTime >= helTime[0] && doTime < helTime[1]
			if(step == 1){
				$.sendReq(apihellp + getInfor(),'get',{},function(data){
					if(data.code == 0){
						if(window.location.origin == 'http://10.100.136.243:8000'){
							loca = 'http://test.iopen.com.cn';
							
							$('.mask').show()
							$('.invite').show()
							var pho1 = $.getStorage('infor') ? $.getStorage('infor').phoneNum ? $.getStorage('infor').phoneNum : '' : '';
							$('.inimg').attr('src',`/api/activity/boostQrcode?ac_id=10&user_sign=${getInfor()}&location_url=${loca}/activity/zl191111.html&param=${JSON.stringify({phone:pho1})}`)
							$('#lianJie').val(loca+`/activity/zl191111.html?phone=${pho1}`)
						}
						if(window.location.origin == 'http://www.open.com.cn' || window.location.origin == 'http://www.iopen.com.cn' ||  window.location.origin == 'https://www.open.com.cn'){
							loca = 'http://m.open.com.cn';
							
							$('.mask').show()
							$('.invite').show()
							var pho1 = $.getStorage('infor') ? $.getStorage('infor').phoneNum ? $.getStorage('infor').phoneNum : '' : '';
							$('.inimg').attr('src',`/api/activity/boostQrcode?ac_id=10&user_sign=${getInfor()}&location_url=${loca}/activity/zl191111.html&param=${JSON.stringify({phone:pho1})}`)
							$('#lianJie').val(loca+`/activity/zl191111.html?phone=${pho1}`)
						}
						if(window.location.origin == 'http://localhost:3000'){
							loca = 'http://localhost:3000';
							
							$('.mask').show()
							$('.invite').show()
							var pho1 = $.getStorage('infor') ? $.getStorage('infor').phoneNum ? $.getStorage('infor').phoneNum : '' : '';
							$('.inimg').attr('src',`/api/activity/boostQrcode?ac_id=10&user_sign=${getInfor()}&location_url=${loca}/activity/zl191111.html&param=${JSON.stringify({phone:pho1})}`)
							$('#lianJie').val(loca+`/activity/zl191111.html?phone=${pho1}`)
						}
					}else if(data.code == 400001653){
						$('.no').show()
						$('.mask').show()
					}else{
						$.removeLocalStorage('infor')
						changeLogin(false)
						showLogin();
						
					}
				})
			}else{
				showErrorTip('活动未开启')
				return false;
			}
	}else{
		showLogin();
		$('#emialEvent').off('click')
		$('#emialEvent').one('click',function(){
			if(step == 1){
				$.sendReq(apihellp + getInfor(),'get',{},function(data){
					if(data.code == 0){
						if(window.location.origin == 'http://10.100.136.243:8000'){
							loca = 'http://test.iopen.com.cn';
							
							$('.mask').show()
							$('.invite').show()
							var pho1 = $.getStorage('infor') ? $.getStorage('infor').phoneNum ? $.getStorage('infor').phoneNum : '' : '';
							$('.inimg').attr('src','/api/activity/boostQrcode?ac_id=10&user_sign=' + getInfor() + '&location_url='+loca+'/activity/zl191111.html')
							$('#lianJie').val(loca+`/activity/zl191111.html?phone=${pho1}`)
						}
						if(window.location.origin == 'http://www.open.com.cn' || window.location.origin == 'http://www.iopen.com.cn' ||  window.location.origin == 'https://www.open.com.cn'){
							loca = 'http://m.open.com.cn';
							
							$('.mask').show()
							$('.invite').show()
							var pho1 = $.getStorage('infor') ? $.getStorage('infor').phoneNum ? $.getStorage('infor').phoneNum : '' : '';
							$('.inimg').attr('src','/api/activity/boostQrcode?ac_id=10&user_sign=' + getInfor() + '&location_url='+loca+'/activity/zl191111.html')
							$('#lianJie').val(loca+`/activity/zl191111.html?phone=${pho1}`)
						}
						if(window.location.origin == 'http://localhost:3000'){
							loca = 'http://localhost:3000';
							
							$('.mask').show()
							$('.invite').show()
							var pho1 = $.getStorage('infor') ? $.getStorage('infor').phoneNum ? $.getStorage('infor').phoneNum : '' : '';
							$('.inimg').attr('src','/api/activity/boostQrcode?ac_id=10&user_sign=' + getInfor() + '&location_url='+loca+'/activity/zl191111.html')
							$('#lianJie').val(loca+`/activity/zl191111.html?phone=${pho1}`)
						}
					}else if(data.code == 400001653){
						$('.no').show()
						$('.mask').show()
					}else{
						$.removeLocalStorage('infor')
						changeLogin(false)
						showLogin();
						
					}
				})
			}else{
				showErrorTip('活动未开启')
				return false;
			}
		})
	}
	
})

$('.invi').on('click',function(){
	$('.invite').hide()
	$('.mask').hide()
	activity_list()
})
$('.no_btn_inn').on('click',function(){
	$('.no').hide()
	$('.mask').hide()
	activity_list()
})
