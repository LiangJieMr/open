function comError(num,msg){
	$('.success').show();
	$('.mask').show();
	$('.err' + num).show();
	if(num == 6){
		$('.err' + num).find('span').html(msg)
	}
}
module.exports = comError;