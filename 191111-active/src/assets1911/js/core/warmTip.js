var $warmTip = $('.warm-tip');
function warmTip(){
	$warmTip.show();
};
$warmTip.find('.sure').on('click',function(){
	$warmTip.hide();
});
module.exports =  warmTip;
