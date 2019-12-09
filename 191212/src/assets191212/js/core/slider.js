const $sliderBox = $('.slider-box');
/*活动攻略-开始*/
$sliderBox.find("#gameStrategy").bind('click',()=>{
	const $strategyTip = $('#strategyTip')
	$strategyTip.show();
	$strategyTip.find('button').one('click',()=>{
		$strategyTip.hide();
	});
});
/*活动攻略-结束*/

/*在线咨询-开始*/
$sliderBox.find("#weChat").bind('click',()=>{
	_MEIQIA('showPanel');
});
/*在线咨询-结束*/