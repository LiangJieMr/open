var $withoutTip = $('.without-tip');
function withoutTip(cont){
	$withoutTip.find('.content').html('');
	$withoutTip.find('.content').html(cont);
	$withoutTip.show();
}
$withoutTip.find('.sure').on('click',function(){
	$withoutTip.hide();
})
module.exports = withoutTip;
