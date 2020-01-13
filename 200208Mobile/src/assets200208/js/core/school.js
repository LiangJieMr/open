/*
 * @Author: 梁杰
 * @Date: 2019-12-24 15:47:25
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-13 13:54:10
 * @Description: 院校显示隐藏
 */

var scLen = $('.school_edu').find('li');
var flag = true;
showHide();
function showHide(){
	for(var i = 0; i < scLen.length; i++){
		if(i < 9){
			$(scLen[i]).show();
		}else{
			$(scLen[i]).slideUp();
		}
	}
}
$('.school_btn').on('click',function(){
	if(flag){
		$('.school_edu li').slideDown();;
		$(this).html(`<span>收起更多高校</span><i class="iconfont jian">&#xe719;</i>`);
		flag = false;
	}else{
		showHide();
		$(this).html(`<span>查看更多高校</span><i class="iconfont jian">&#xe691;</i>`);
		flag = true;
	}

})
