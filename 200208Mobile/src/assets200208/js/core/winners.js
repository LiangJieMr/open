/*
 * @Author: 梁杰
 * @Date: 2020-01-08 10:48:07
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-08 10:49:46
 * @Description: 获奖名单
 */
var demoset = '';
function list(){
	/*上下滚动效果--开始*/
		 if(demoset){
			clearInterval(demoset)
		 }
		 var demo=document.getElementById("demo");
		 var demo2=document.getElementById("demo2");
		 var demo1=document.getElementById("demo1");

		 demo2.innerHTML = '';
		 demo2.innerHTML=demo1.innerHTML
		 function Marquee(){
		  if(demo.scrollTop>=demo1.offsetHeight){
		   demo.scrollTop=0;
		  }else{
		   demo.scrollTop=demo.scrollTop+1;
		  }
		 }
		 demoset = setInterval(Marquee,40)
		/*上下滚动效果--开始*/
}
module.exports = list;
