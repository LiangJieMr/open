/*
 * @Author: 梁杰
 * @Date: 2020-01-08 15:51:41
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-08 15:55:22
 * @Description: 补零函数
 */
/**
 * 补零函数-开始
 * @param {*} num 
 */
function pad(num) {
	var long = num.toString().length;
	if(long == 1){
		num = '0'+num
	}else{
		num = num
	}
	return num;
}
/*补零函数-结束*/
module.exports = pad;