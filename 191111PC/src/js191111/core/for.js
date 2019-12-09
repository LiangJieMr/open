var activity_list = require('./activity_list');

function forH(money){
	$('.for_b').html('')
    if(money == 0){
        var str = `免单`;
        $('.for_img').css('background','url(./assets191111/img/miandan.png) no-repeat')
    }else{
        var str = `<span>&yen;</span>${parseInt(money)}`;
        $('.for_img').css('background','url(./assets191111/img/jin.png) no-repeat')
    }

    $('.for_b').append(str)
	$('.for').show()
	$('.mask').show()
}

$('.for_btn').on('click',function(){
    $('.for').hide()
    $('.mask').hide()
    activity_list()
})
$('.forpx').on('click',function(){
    $('.for').hide()
    $('.mask').hide()
    activity_list()
})

module.exports = forH