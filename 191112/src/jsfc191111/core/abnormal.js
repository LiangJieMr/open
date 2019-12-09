function abnormal(les){
	$('.abnormal').hide();
	$('.taiyi').hide();
	$('.ninde').hide();
	$('.buhao').hide();
	$('.wenxin').hide();
	$('.mask').hide();
	if(les == 1){
	    $('.abnormal').show().find('.ninde').show()
	    $('.mask').show()
	}
	if(les == 2){
	    $('.abnormal').show().find('.taiyi').show()
	    $('.mask').show()
	}
	if(les == 3){
	    $('.abnormal').show().find('.buhao').show()
	    $('.mask').show()
	}
	if(les == 4){
	    $('.abnormal').show().find('.wenxin').show()
	    $('.mask').show()
	}
}


module.exports = abnormal;