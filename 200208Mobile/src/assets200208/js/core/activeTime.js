/*
 * @Author: 梁杰
 * @Date: 2020-01-08 17:52:52
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-13 11:07:41
 * @Description: 倒计时状态
 */
const forTime = require('./forTime.js');
const $timeo = $('.time-o');
// const $bannerBox = $('#banner-inner');
const $cutDown = $('.count-down');
const $progress = $cutDown.find('.process');
const $lampBox = $cutDown.find("#lampBox");
let initRate = 0;//炮竹进度
let initGress = 0;//炮竹top初始值

const proGress = [21,21,21,21,22,22,22,22,22,22,22,22,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,18,17,17,17,17,17,17,16,16,16,16,16,16,16,16,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,19,19,19,19,19,19,20,20,20,20,20,20,21,21,21,21,21,22,22,22,22,22,23,23,23,23,23,23,24,24,24,24,24,25,25,25,25,25,25,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,30,30,30,30,30,31,31,31,31,32,32,32,32,33,33,33,34,34,34,34,34,34,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,36,36,36,36,36,36,36,36,36,35,35,35,35,35,35,35,34,34,34,34,34,34,34,33,33,33,33,33,33,33,32,32,32,32,32,32,32,32,31,31,31,31,31,31,31,31,30,30,30,30,30,30,30,30,30,29,29,29,29,29,29,29,29,29,28,28,28,28,28,28,28,28,28,28,27,27,27,27,27,27,27,27,27,27,27,27,27,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26];
const gressLen = proGress.length - 1;
/**
 * 倒计时-开始
 * @param {*} time 
 * @param {*} bannTime 8
 */
function activeTime(time, bannTime, now, over, start){
    if(time == 1){ //进行中
        const leftTime =  start - now;
	    const rightTime = over - now;
        $timeo.html('距离活动结束仅剩')
        var strTime = `<span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${bannTime[2]}</span>分<span class="time s">${bannTime[3]}</span>秒`;
        $('.count-down-in').html(strTime)
        forTime(bannTime,time)
        const surplusTime = rightTime - leftTime;
        const rate = Math.round(gressLen/surplusTime*(-leftTime));
        
        if(rate != initRate){
        	$progress.css('width',`${rate/100}rem`);
        	initRate = rate;
        	const gressRate = proGress[rate];
        	
        	if(gressRate != initGress){
        		$lampBox.css('top',`-${(80 - gressRate)/100}rem`)
        		initGress = gressRate;
        	}
        }
    }else if(time == 0){//未开始
        $timeo.html('距离活动开始仅剩')
        var strTime = `<span class="time d">${bannTime[0]}</span>天<span class="time h">${bannTime[1]}</span>时<span class="time m">${bannTime[2]}</span>分<span class="time s">${bannTime[3]}</span>秒`;
        $('.count-down-in').html(strTime)
        forTime(bannTime,time)
    }else{//已结束
        $('.banner-time').html('<div class="count-down-over">活动已结束</div>');
    }
    $cutDown.show();
}
/*倒计时-结束*/
module.exports = activeTime;