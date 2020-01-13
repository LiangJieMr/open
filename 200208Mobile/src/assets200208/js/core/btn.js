/*
 * @Author: 梁杰
 * @Date: 2020-01-09 18:45:23
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-13 13:31:37
 * @Description: 按钮事件
 */
const $mask = $('.mask');
 $('.over-btn').on('click',() => {
     $('.over').hide();
     $mask.hide();
 })
 $('.warmTip-btn').on('click',() => {
    $('.warmTip').hide();
    $mask.hide();
})
$('.prize-tan-btn').on('click',() => {
    $('.prize-tan').hide();
    $mask.hide();
})
/*美洽绑定事件--开始*/
$('.major-meiqia').on('click',() => {
    _MEIQIA('showPanel');
})
/*美洽绑定事件--结束*/




