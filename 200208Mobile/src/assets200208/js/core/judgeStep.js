/*
 * @Author: 梁杰
 * @Date: 2020-01-08 15:54:21
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-08 15:54:42
 * @Description: 判断活动时间
 */
/**
 * 判断活动时间-开始
 * @param timeStamp
 * @param start_time
 * @param end_time
 * @returns {number}
 */
function judgeStep(timeStamp,start_time,end_time){
	const timeArr = [start_time,end_time];
	return timeArr.filter((item)=>item <= timeStamp).length;
};
/*判断活动时间-结束*/
module.exports = judgeStep;