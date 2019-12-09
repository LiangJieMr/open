var $errTip = $('.error-close');
var $Infor = $errTip.find('.infor');
function showErrorTip(msg,type){
	$Infor.html(msg);
	// $errTip.css('margin-left', 0+'rem')
	// var wid = ($errTip.width()*2)/100;
	// $errTip.css('margin-left', -wid+'rem');
	$errTip.slideDown();
	var timer = setTimeout(function(){
		type == 1 ? window.location.href = '/': $errTip.fadeOut();
		clearTimeout(timer);
	},4000)
};
module.exports = showErrorTip;
