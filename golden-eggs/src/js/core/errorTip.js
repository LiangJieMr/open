var $errTip = $('.error-close');
var $Infor = $errTip.find('.infor');
function showErrorTip(msg,type){
	$Infor.html(msg);
	$errTip.css('margin-left', 0+'px')
	var wid = parseInt($errTip.outerWidth(true)/2);
	$errTip.css('margin-left', -wid+'px');
	$errTip.slideDown();
	var timer = setTimeout(function(){
		type == 1 ? window.location.href = '/': $errTip.fadeOut();
		clearTimeout(timer);
	},4000)
};
module.exports = showErrorTip;
