/*院校状态开始*/
var scLen = $('.school_edu').find('li');
var flag = true;
showHide();
function showHide(){
	for(var i = 0; i < scLen.length; i++){
		if(i < 9){
			scLen[i].style.display='block';
		}else{
			scLen[i].style.display='none';
		}
	}
}
$('.school_btn').on('click',function(){
	if(flag){
		$('.school_edu li').slideDown();;
		$(this).html(`<span>收起更多</span><i class="iconfont jian">&#xe630;</i>`);
		flag = false;
	}else{
		showHide();
		$(this).html(`<span>查看更多</span><i class="iconfont jian">&#xe632;</i>`);
		flag = true;
	}
	
})
/*院校状态结束*/