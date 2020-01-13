/*
 * @Author: 梁杰
 * @Date: 2020-01-08 13:59:25
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-10 16:39:10
 * @Description: 专业显示隐藏
 */


var scLen = $('.major-inner-list').find('li');
var flag = true;
showHide();
/**
 * 显示隐藏
 */
function showHide(){
	for(var i = 0; i < scLen.length; i++){
		if(i < 4){
			scLen[i].style.display='block';
		}else{
			scLen[i].style.display='none';
		}
	}
}
$('.major-btn-more').on('click',function(){
	if(flag){
		scLen.slideDown();
		$(this).html(`<span>收起更多热门专业</span><i class="iconfont jian">&#xe719;</i>`);
		flag = false;
	}else{
		showHide();
		$(this).html(`<span>查看更多热门专业</span><i class="iconfont jian">&#xe691;</i>`);
		flag = true;
	}

})
