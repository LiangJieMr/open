var activity_list = require('./activity_list');

function abnor(les){
    if(les == 1){
        $('.abnormal').show().find('.ab4').show()
        $('.mask').show()
    }
    if(les == 2){
        $('.abnormal').show().find('.ab3').show()
        $('.mask').show()
    }
    if(les == 3){
        $('.abnormal').show().find('.ab1').show()
        $('.mask').show()
    }
    if(les == 4){
        $('.abnormal').show().find('.ab2').show()
        $('.mask').show()
    }
}
$('.ab_btn').on('click',function(){
    $('.abnormal').hide().find('.ab4').hide()
    $('ab3').hide()
    $('ab1').hide()
    $('ab2').hide()
    $('.mask').hide()
    activity_list()
})
$('.abpx').on('click',function(){
    $('.abnormal').hide().find('.ab4').hide()
    $('ab3').hide()
    $('ab1').hide()
    $('ab2').hide()
    $('.mask').hide()
    activity_list()
})

module.exports = abnor