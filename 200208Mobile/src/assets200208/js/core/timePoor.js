/*
 * @Author: 梁杰
 * @Date: 2020-01-08 15:52:45
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-13 11:33:52
 * @Description: 时间差
 */
const pad = require('./pad.js')
/**
 * 时间差函数
 * @param {*} curTime 
 * @param {*} endTime 
 */
function timePoor(curTime,endTime){
	var begin = curTime + '000';
	var end = endTime + '000'
	//时间相差毫秒数
	var span = parseInt(end) - parseInt(begin);
	//计算相差天数
	var result = [];
	var days = Math.floor(span / (24 * 3600 * 1000));
	result[0] = pad(days);
	//相差小时数
	var leave1 = span % (24 * 3600 * 1000);
	var hours = Math.floor(leave1 / (3600 * 1000))
	result[1] = pad(hours);
	//相差分钟
	var leave2 = leave1 % (3600 * 1000)
	var minutes = Math.floor(leave2 / (60 * 1000));
	result[2] = pad(minutes);
	//相差秒
	var level3 = leave2 % (60 * 1000)
	var seconds = Math.round(level3 / 1000);
	result[3] = pad(seconds);
	return result;
}
module.exports = timePoor;