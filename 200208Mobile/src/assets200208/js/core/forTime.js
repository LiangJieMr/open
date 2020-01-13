/*
 * @Author: 梁杰
 * @Date: 2020-01-08 17:54:41
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-13 15:02:24
 * @Description: 活动时间以秒倒计时
 */
const pad = require('./pad.js');
const $countDown =  $('.count-down-in');
const $timeo = $('.time-o');
let forTimeSet = '';
/**
 * 活动时间以秒倒计时-开始
 * @param {*} bannTime 
 * @param {*} time 
 */
function forTime(bannTime,time){
	if(forTimeSet){
		clearInterval(forTimeSet);
	}
	forTimeSet = setInterval(function(){
		bannTime[3]--;
		if(bannTime[3] == -1){
			bannTime[2]--;
			bannTime[3] = 59;
		}
		if(bannTime[2] == -1){
			bannTime[2] = 59;
			bannTime[1]--;
		}
		if(bannTime[1] == -1){
			bannTime[1] = 23;
			bannTime[0]--;
		}
		if(time == 1){
            $timeo.html('距离活动结束仅剩')
			var strTime = `<span class="time d">${pad(bannTime[0])}</span>天<span class="time h">${pad(bannTime[1])}</span>时<span class="time m">${pad(bannTime[2])}</span>分<span class="time s">${pad(bannTime[3])}</span>秒`;
		}else if(time == 0){
            $timeo.html('距离活动开始仅剩')
			var strTime = `<span class="time d">${pad(bannTime[0])}</span>天<span class="time h">${pad(bannTime[1])}</span>时<span class="time m">${pad(bannTime[2])}</span>分<span class="time s">${pad(bannTime[3])}</span>秒`;
		}
		$countDown.html(strTime);
	},1000)
}
/*活动时间以秒倒计时-结束*/
module.exports = forTime;