var $congratulationTip = $('.congratulation-tip');
var $congratulationPriceType = $congratulationTip.find('.price-type');
function congratulate(money,surplus){
	$congratulationPriceType.html('');
	$congratulationTip.find('.content span').text('');
	$congratulationTip.find('.content span').text(surplus);
	var curMoney = parseInt(money);
	$congratulationTip.find('.title').text('');
	if(curMoney == 0){
		var str = `
			<img class="star" src="./assets1911/img/star.png" alt="" />
			<img class="conpou" src="./assets1911/img/freeCircle.png" alt="" />
		`;
		$congratulationTip.find('.title').text('恭喜你！成功获得奥鹏教育免单神券一张！');
	}else{
		var str = `
		<img class="star" src="./assets1911/img/star.png" alt="" />
			<img class="conpou" src="./assets1911/img/priceCircle.png" alt="" />
			<div class="price-box">
				<p class="price">
					<em>￥</em><i>${curMoney}</i>
				</p>
				<p class="money">
					助学金
				</p>
			</div>
		`;
		$congratulationTip.find('.title').text(`恭喜你！成功获得奥鹏教育${curMoney}元助学金！`);
	}
	$congratulationPriceType.html(str);
	
	
	$congratulationTip.show();
};
$('.congratulation-tip .sure').on('click',function(){
	$congratulationTip.hide();
});
module.exports = congratulate;
