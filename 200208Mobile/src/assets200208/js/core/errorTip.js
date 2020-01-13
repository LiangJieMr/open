/*
 * @Author: 梁杰
 * @Date: 2020-01-06 11:39:17
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-06 14:23:27
 * @Description: 异常提示框
 */

var $errTip = $('.error-close');
var $Infor = $errTip.find('.infor');
/**
 * 异常提示框
 * @param {*} msg 
 * @param {*} type 
 */
function showErrorTip(msg,type){
	$Infor.html(msg);
	$errTip.slideDown();
	var timer = setTimeout(function(){
		type == 1 ? window.location.href = '/': $errTip.fadeOut();
		clearTimeout(timer);
	},4000)
};
module.exports = showErrorTip;
