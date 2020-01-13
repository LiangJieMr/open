/*
 * @Author: 梁杰
 * @Date: 2020-01-08 15:50:33
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-08 16:09:22
 * @Description: 活动日期
 */

 /**
  * 活动日期-开始
  * @param {*} now 
  */
function formatDate(now) {
	var year=now.getFullYear();  //取得4位数的年份
	var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
	var date=now.getDate();      //返回日期月份中的天数（1到31）
	var hour=now.getHours();     //返回日期中的小时数（0到23）
	var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
	var second=now.getSeconds(); //返回日期中的秒数（0到59）
	return year+'年'+month+"月"+date+"日";
}
/*活动日期-结束*/
module.exports = formatDate;