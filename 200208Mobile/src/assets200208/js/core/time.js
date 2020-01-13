/*
 * @Author: 梁杰
 * @Date: 2020-01-08 15:42:42
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-13 13:39:33
 * @Description: 活动时间
 */

require('./open.js');
const judgeStep = require('./judgeStep.js');
const formatDate = require('./formatDate.js');
const winner = require('./winner.js');
const timePoor = require('./timePoor.js');
const activeTime = require('./activeTime.js');
const timeApi = '/api/activity/acTime';
let tim = '';
let time = {
    curTime: '',//当前时间
    endTime: '',//结束时间
    startTime: '',//开始时间
    step: ''//活动是否进行中 0未开始 1进行中 2以结束
}

let $rulesTime = $('.rulesprize-inner');
timeFun();
function timeFun(){
    $.sendReq(timeApi,'GET',{'ac_id': 28},function(res){
        let {code,data,msg} = res;
        if(code == 0){
            time.curTime = data['now_time'];
            time.endTime = data['end_time'];
            time.startTime = data['start_time'];
            time.step = judgeStep(time.curTime, time.startTime, time.endTime);
            let g= time.startTime * 1000; //定义一个时间戳变量
            let d=new Date(g);
            let h= time.endTime * 1000; //定义一个时间戳变量
            let j=new Date(h);
            $rulesTime.find('.rulestime').html(formatDate(d)+'-'+formatDate(j));
            $rulesTime.find('.rulestime1').html(formatDate(d)+'0:00-'+formatDate(j)+'23:59')
            //获奖名单内容
            winner(time.step)
            //活动时间倒计时
            let bannTime = timePoor(time.curTime, time.endTime);
            activeTime(time.step, bannTime, data['now_time'], data['end_time'], data['start_time'])
        }
    })
    if(tim){
        clearInterval(tim);
    }
    tim = setInterval(() => {
        timeFun();
    }, 1000*60);
}