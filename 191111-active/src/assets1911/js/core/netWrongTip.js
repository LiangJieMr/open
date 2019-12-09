var $netWrongTip = $('.net-wrong-tip');
function netWrongTip(){
	$netWrongTip.show();
}
$netWrongTip.find('.sure').on('click',function(){
	$netWrongTip.hide();
})
module.exports = netWrongTip;
