
function fore(money){
	$('.b').html('');
	$('.for').show();
	$('.mask').show();
	var str = `<span>&yen;</span>${money}`;
	$('.b').append(str);
}

$('.for_btn').on('click',function(){
	$('.for').hide();
	$('.mask').hide();
})
$('.forpx').on('click',function(){
	$('.for').hide();
	$('.mask').hide();
})

module.exports = fore;