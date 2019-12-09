var getInfor = require('./getInfor');
var showErrorTip = require('./errorTip');
var showLogin = require('./login');
var list = require('./lsit');
var forH = require('./for');
var abnormal = require('./abnormal');
var open = require('../open');
var lucky = require('./lucky');
var changeLogin = require('./changeLogin');
var actime = require('./endTime');
// var step = '';
// var curTime =  '';
// var enTime = '';
// var startTime = '';
var acti = '';
var lu = '';



//开宝箱
$('.chest_inner').on('click','img',function(){
	if($(this).attr('id') != 'ch1' && $(this).attr('id') != 'ch2' && $(this).attr('id') != 'ch3' && $(this).attr('id') != 'chestOne3' && $(this).attr('id') != 'chestOne2' && $(this).attr('id') != 'chestOne1'){
		var $num = $(this).attr('data-id');
		var cla = $(this).attr('class');
		$(this).attr('class',cla + ' chestac')
		if(acti){
			clearTimeout(acti)
		}
		acti = setTimeout(function(){
			$(this).attr('class',cla)
			ope($num)
		},550)
	}
})

//开宝箱
function ope(pos){
	if(getInfor()){
		$.ajax({
			url : '/api/activity/boxLottery',
			type : 'post',
			dataType : 'json',
			data : {
				ac_id : 16,
				platform : 1,
				user_sign : getInfor(),
				click_pos : pos
			},
			success : function(res){
				let {code,data,msg} = res;
				//$(`#chestOne${pos}`).show()
				if(code == 0){
					var number = data['lottery_num'];
					var money = data['prize_content'];
					var mey = money.replace(/[^0-9]/ig,"");
					$(`#chestO${pos}`).hide()
					$(`#chestOne${pos}`).show()
					if(lu){
						clearTimeout(lu)
					}
					lu = setTimeout(function(){
						lucky(mey,number,pos)
					},700)
				}else if(code == 400001682 || code == 400001913){
					var number = data['lottery_num'];
					var money = data['prize_content'];
					var mey = money.replace(/[^0-9]/ig,"");
					forH(mey);
					showErrorTip(msg);
				}
				else if(code == 400001646){
					abnormal(1)
					// $(`#chestO${pos}`).hide()
					// $(`#chestOne${pos}`).show()
					// if(lu){
					// 	clearTimeout(lu)
					// }
					// lu = setTimeout(function(){
					// 	lucky(mey,number,pos)
					// },700)
				}else if(code == 400001684){
					abnormal(2)
				}else if(code == 400001649 || code == 400001685){
					abnormal(3)
				}else if(code == 400001653){
					abnormal(4)
				}else if(code == 400001326 || code == 400001306){
					$.removeLocalStorage('infor');
					showErrorTip(msg);
					changeLogin(false);
					showLogin();
					$('#emilevent').off('click');
					$('#emilevent').one('click',function(){
						ope(pos)
					})
				}else if(code == 400001681){
					showErrorTip('活动未开启，请耐心等待！');
					actime()
				}else if(code == 400001680){
					showErrorTip('活动已结束,更多活动，敬请关注奥鹏教育微信公众号与奥鹏教育官网');
				}else if(code == 400001651){
					showErrorTip('抽奖位置参数未传递(砸的金蛋位置、点击宝箱位置)');
				}else if(code == 400001647){
					showErrorTip('抽奖平台参数为空');
				}
			},
			error : function(err){
				console.log(err)
			}
		})
	}else{
		$.removeLocalStorage('infor');
		changeLogin(false);
		showLogin();
		$('#emilevent').off('click');
		$('#emilevent').one('click',function(){
			ope(pos)
		})
	}
}

$('.lucky_btn').on('click',function(){
	$('.lucky').hide();
	$('.mask').hide();
	actime()
})

$('.luckypx').on('click',function(){
	$('.lucky').hide();
	$('.mask').hide();
	actime()
})
$('.ab_btn').on('click',function(){
	$('.abnormal').hide();
	$('.taiyi').hide();
	$('.ninde').hide();
	$('.buhao').hide();
	$('.wenxin').hide();
	$('.mask').hide();
	actime()
})
$('.abpx').on('click',function(){
	$('.abnormal').hide();
	$('.taiyi').hide();
	$('.ninde').hide();
	$('.buhao').hide();
	$('.wenxin').hide();
	$('.mask').hide();
	actime()
})