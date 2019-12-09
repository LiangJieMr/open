function lucky(money,lessNum,pos){
	$('.rpbf').html('');
	$('.lucky').show();
	$('.mask').show();
	var num = {
		0 : '0',
		1 : '1',
		2 : '2'
	};
	
	let lesnum = num[lessNum] ? num[lessNum] : '';
	
	var str = `
				<h1>人品爆棚</h1>
				<p class="gongXi">恭喜获得奥鹏教育<span>${money}</span>元助学金</p>
				<p class="chaSHou">助学金已存入您的账户，请在“我的助学金”中查看！</p>
				<div class="lucky_img">
					<b><span>&yen;</span>${money}</b>
					<div class="con_btn">
					    <p>助学金</p>
					</div>
				</div>
				<div class="lucky_intr">
					还有<span>${lesnum}</span>次开启机会
				</div>
				<img class="start" src="./assetsfc191111/img/start.png" alt="">
				<p class="zhu">注：仅限报名奥鹏教育支付缴费时使用</p>
				`;
	$('.rpbf').append(str);
	// $('.pack' + pos).find('b').html(money)
}

module.exports = lucky;