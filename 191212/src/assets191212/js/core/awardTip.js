const addressTip = require('./addressTip.js');
module.exports = (priceNum,prizeTitle)=>{
	const $awardBox = $('.award-box');
	const $awardType = $awardBox.find('.number dd');
	const $awardGift = $awardBox.find('.gift-box');
	
	const priceType = {
		'1':'特等奖',
		'2':'一等奖',
		'3':'二等奖',
		'4':'三等奖'
	}[priceNum];
	
	const giftType = {
		'1':'1',
		'2':'11',
		'3':'01',
		'4':'10'
	}[priceNum];
	
	$awardType.text('');
	$awardType.text(priceType);
	
	$awardGift.html('');
	$awardGift.html(`<dt>${prizeTitle}</dt>
		<dd class="gift">
			<img src="./assets191212/img/gift${giftType}.png" alt="" />
		</dd>
		<dd>
			恭喜您获得${priceType}，速速填写联系方式，工作人员给您派奖！
		</dd>
		<dd class="option">
			<a class="repaireAddr" href="javascript:void(0)">
				填写收货信息 >
			</a>
		</dd>`);
	$awardBox.show();
	
	$awardBox.find('.number dt').off('click')
	 .one('click',()=>{
	 	$awardBox.hide();
	 })
};
/*修改收货信息-开始*/
$('body').on('click','.repaireAddr',()=>{
	$('.award-box').hide();
	addressTip();
});
/*修改收货信息-结束*/
