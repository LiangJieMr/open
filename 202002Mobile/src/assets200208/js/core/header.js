/*
 * @Author: 梁杰
 * @Date: 2019-12-24 15:43:21
 * @LastEditors: 梁杰
 * @LastEditTime: 2019-12-25 10:30:49
 * @Description: 用户名下拉切换
 */

var $logoutSpan = $('.logout span');
$('body').on('click',function(event){
	if(!$(event.target).data('click')){
		$logoutSpan.slideUp();
	}
});
