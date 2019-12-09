var activity_list = require('./activity_list');

function lucky(money,num){
    // console.log(money)
    $('.huode').html('')
    var lessNum = {
		0:'0',
		1:'1',
		2:'2',
		3:'3'
	};
	var Num = lessNum[num] ? lessNum[num] : '';
    var curMoney = parseInt(money);
	// console.log(curMoney,'eee',0,'0')
	if(curMoney == 0){
		var str = `
        <h1>幸运降临</h1>
        <p class="gongXi">恭喜您！成功获得奥鹏教育免单神券一张！</p>
        <p class="chaSHou">助学金已存入您的账户，请在“我的助学金”中查看！</p>
        <div class="lucky_img">
            <b>免单</b>
            <div class="con_btn zxj">
                <p>助学金</p>
            </div>
        </div>
        <div class="lucky_intr">
            还有<span class="ciShu">${Num}</span>次秒抢助学金的机会
        </div>
        <img class="start" src="./assets191111/img/start.png" alt="">
		<p class="start_in">注：仅限支付首期学费（不包括已缴纳的订金）</p>
        `;
		$('.lucky').show().find('.huode').show()
		$('.mask').show()
        $('.huode').append(str)
        $('.lucky_img').css('background','url(./assets191111/img/miandan.png) no-repeat')
        
	}else{
		var str = `
		<h1>幸运降临</h1>
			<p class="gongXi">恭喜获得奥鹏教育<span>${curMoney}</span>元助学金</p>
			<p class="chaSHou">助学金已存入您的账户，请在“我的助学金”中查看！</p>
			<div class="lucky_img">
				<b><span>&yen;</span>${curMoney}</b>
				<div class="con_btn zxj">
				    <p>助学金</p>
				</div>
			</div>
			<div class="lucky_intr">
				还有<span class="ciShu">${Num}</span>次秒抢助学金的机会
			</div>
			<img class="start" src="./assets191111/img/start.png" alt="">
        `;
		$('.lucky').show().find('.huode').show()
		$('.mask').show()
        $('.huode').append(str)
        $('.lucky_img').css('background','url(./assets191111/img/jin.png) no-repeat')
    }
    
}
$('.lucky_btn_inn').on('click',function(){
    $('.lucky').hide().find('.huode').hide()
    $('.mask').hide()
    activity_list();
})
$('.lupx').on('click',function(){
    $('.lucky').hide().find('.huode').hide()
    $('.mask').hide()
    activity_list();
})

module.exports = lucky