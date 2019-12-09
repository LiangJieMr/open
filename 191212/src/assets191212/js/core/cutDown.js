const showErrorTip = require('./errorTip.js');
const winnerList = require('./winnerList.js');
const changeDate = require('./changeDate.js');

const $bannerBox = $('#bannerBox');
const $cutDown = $('#bannerBox #cutDown');
const $timeStep = $bannerBox.find('#timeStep');
const $dayTime = $bannerBox.find('#timeDay');
const $hourTime = $bannerBox.find('#timeHour');
const $minTime = $bannerBox.find('#timeMin');
const $secTime = $bannerBox.find('#timeSec');

let cutTime = 60;
let time = null;
let status = 0;


let  supply =(num)=>{
	const str = num.toString();
	if(str.length == 1){
		return `0${num}`
	}
	return num;
};

/*倒计时-开始*/
let countTime = (startTime,nowTime,endTime) => {
	
	let d = 0,h = 0,m = 0,s = 0;
	const leftTime =  startTime - nowTime;
	const rightTime = endTime - nowTime;
	
	if(leftTime <= 0 && rightTime >= 0){ //正在开始中
		d = Math.floor(rightTime/60/60/24);
        h = Math.floor(rightTime/60/60%24);
        m = Math.floor(rightTime/60%60);
        s = Math.floor(rightTime%60);
        $timeStep.text('距活动结束还剩:');
        
        if(status != 1) {
        	winnerList(true);
        	changeDate(startTime,nowTime,endTime);
        	status = 1;
        };
       	
	}else if(leftTime > 0){ //未开始
		d = Math.floor(leftTime/60/60/24);
        h = Math.floor(leftTime/60/60%24);
        m = Math.floor(leftTime/60%60);
        s = Math.floor(leftTime%60);
       	$timeStep.text('距活动开始还剩:');
       	
       	if(status != 2){
       		winnerList(false);
       		changeDate(startTime,nowTime,endTime);
       		status = 2;
       	}
       	
       	
	}else{ //已结束
		$timeStep.text('活动已结束');
		
		$('.game-over').show();
		if(status != 3){
       		winnerList(true);
       		changeDate(startTime,nowTime,endTime);
       		status = 3;
       	}
		$dayTime.text(supply(0));
		$hourTime.text(supply(0));
		$minTime.text(supply(0));
		$secTime.text(supply(0));
		$timeStep.addClass('over');
		$cutDown.hide();
		return false;
	}
	if($cutDown.css('display') == 'none'){
		$cutDown.show();
	}
	if($timeStep.hasClass('over')){
		$timeStep.removeClass('over');
	}
	$dayTime.text(supply(d));
	$hourTime.text(supply(h));
	$minTime.text(supply(m));
	$secTime.text(supply(s));
	
	if(time) clearTimeout(time);
	time = setTimeout(()=>{
		cutTime--;
		if(cutTime <= 0){
			initActime();
			cutTime = 60;
		}else{
			const curTime = ++ nowTime;
			
			countTime(startTime,curTime,endTime);
		}
	},1000);
	
};
/*倒计时-结束*/
let initActime =()=>{
	$.sendReq(
		'/api/activity/acTime',
		'get',
		{
			ac_id:22
		},
		(res)=>{
			const {code,
			   data,
			   msg} = res;
				   
			if(code == 0){
				
				const { start_time,now_time,end_time } = data;
						
				countTime(start_time,now_time,end_time);
				
			}else{
				showErrorTip(msg);
			}
			
		}
	);
};

initActime();
