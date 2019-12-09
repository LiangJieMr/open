var $awardedTip = $('.awarded-price-tip');
function awardedPriceTip(money){
	var $awardedDt = $awardedTip.find('dt');
	$awardedDt.html('');
	var curMoney = parseInt(money);
	if(curMoney == 0){
		var str = `
			<img class="price-img" src="./assets1911/img/freeCircle.png" alt="" />
		`;
	}else{
		var str = `
			<img class="price-img" src="./assets1911/img/priceCircle.png" alt="" />
			<div>
				<p class="price">
					<em>￥</em><i>${curMoney}</i>
				</p>
				<p class="money">
					助学金
				</p>
			</div>
		`;
	}
	$awardedDt.html(str);
	$awardedTip.show();
};
$awardedTip.find('.sure').on('click',function(){
	$awardedTip.hide();
});
module.exports = awardedPriceTip;
