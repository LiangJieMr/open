var getInfor = require('./getInfor');
var showErrorTip = require('./errorTip');
var showLogin = require('./login');
var lucky = require('./lucuy');
var changeLogin = require('./changeLogin');
var forH = require('./for');
var abnormal = require('./abnormal');
var activity_list = require('./activity_list');
var acOne = $('.acOne');
var cath = '/api/activity/catch'
var gitT = '2019-11-11 00:00:00'
var gitT1 = '2019-11-11 11:11:00'
// 参数名	必选	类型	说明
// user_sign	是	string	用户登录标识
// activity_id	是	int	活动ID
// gift_time	是	string	奖品发放时间(奖品列表接口返回值)
// coupon_id	是	int	优惠券ID
// platform	是	int	1.pc 2.h5

var data = {
	user_sign : getInfor(),
	activity_id : 12,
	gift_time : '2019-11-11 00:00:00',
	coupon_id : 357,
	platform : 1
}
//活动一点击抢券
$('.activeOne1_ul').on('click','p',function(){
	var cound_id = $(this).attr('data-id');
	var mey = $(this).attr('data-mey');
	var giftTime = $(this).attr('data-gt');
	 drawLottery(12,giftTime,cound_id,mey)
})
$('.activeOne2_ul').on('click','p',function(){
	var cound_id = $(this).attr('data-id');
	var mey = $(this).attr('data-mey');
	var giftTime = $(this).attr('data-gt');
	 drawLottery(12,giftTime,cound_id,mey)
})
//活动二点击抢券
$('.active09').on('click','p',function(){
	var cound_id = $(this).attr('data-id');
	var mey = $(this).attr('data-mey');
	var giftTime = $(this).attr('data-gt');
	 drawLottery(14,giftTime,cound_id,mey)
})
$('.active13').on('click','p',function(){
	var cound_id = $(this).attr('data-id');
	var mey = $(this).attr('data-mey');
	var giftTime = $(this).attr('data-gt');
	 drawLottery(14,giftTime,cound_id,mey)
})
$('.active19').on('click','p',function(){
	var cound_id = $(this).attr('data-id');
	var mey = $(this).attr('data-mey');
	var giftTime = $(this).attr('data-gt');
	 drawLottery(14,giftTime,cound_id,mey)
})
$('.active21').on('click','p',function(){
	var cound_id = $(this).attr('data-id');
	var mey = $(this).attr('data-mey');
	var giftTime = $(this).attr('data-gt');
	 drawLottery(14,giftTime,cound_id,mey)
})
/*抢券-开始*/
	function drawLottery(activeId,giftTime,couponId,money){
		$('.tip').show()
		if(getInfor()){
			$.sendReq(
				cath,
				'POST',
				{
					user_sign:getInfor(),
					activity_id:activeId,
					gift_time:giftTime,
					coupon_id:couponId,
					platform:1
				},
				function(res){
					$('.tip').hide()
					var {code,data,msg} = res;
					if(code == 0){ //抢券成功
						lucky(money,data.less_num);
					 }else if(code == 400001682){//已获得过
						forH(money);
					}else if(code == 400001698){//您参与次数余额不足
						abnormal(1);
					}else if(code == 400001684){//库存不足
						abnormal(2);
					}else if(code == 400001653){ //老学员不能参与
						abnormal(3);
					}else if(code == 400001653){ //服务器开小差了
						abnormal(4);
					}else if(code == 400001681){ //活动未开启	
						showErrorTip(msg)
					}else if(code == 400001326 || code == 400001306){//登录超时，请稍后重新尝试	
						$.removeLocalStorage('infor')
						changeLogin(false)
						showLogin()
						// showErrorTip(msg)
						$('#emialEvent').off('click')
						$('#emialEvent').one('click',function(){
							drawLottery(activeId,giftTime,couponId,money)
						})
					}else if(code == 400001680){
						showErrorTip(msg)
					}
					activity_list()
				},function(){
					// drawDisbale = false;
				}
			)
		}else{
			$('.tip').hide()
			$.removeLocalStorage('infor')
			changeLogin(false)
			showLogin()
			$('#emialEvent').off('click')
			$('#emialEvent').one('click',function(){
				drawLottery(activeId,giftTime,couponId,money)
			})
		}
		
	};