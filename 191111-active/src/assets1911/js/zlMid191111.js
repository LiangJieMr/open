$(function(){
	const API = {
		wxBoost:'/api/activity/wxBoost'
	};
	require('./core/open.js');
	var globalMsg =require('./core/globalMsg.js');
	function fnUrlReplace(href) {
	    if (href && /^#|javasc/.test(href) === false) {
	        if (history.replaceState) {
	            history.replaceState(null, document.title, href.split('#')[0] + '#');
	            location.replace('');
	        } else {
	            location.replace(href);
	        }
	    }
	};
	
	const openId = $.getParam('open_id');
	const phone = $.getSession('phone');
	
	$.sendReq(
		API.wxBoost,
		'POST',
		{
			open_id:openId,
			phone:phone,
			ac_id:10
		},
		function(res){
			const {code,data,msg} = res;
			if(code == 0){
				fnUrlReplace('/activity/zlcg191111.html');
			}else if(code == 400001696){//太热情了！您已经为该小伙伴助力过啦~
				$.setSession('active1911code',code);
				fnUrlReplace('/activity/zl191111.html');
			}else if(code == 400001649){ //参加抽奖的鹏友太多啦！造成网络繁忙，别慌！幸运已经上路，请重新点击试一下！
				$.setSession('active1911code',code);
				fnUrlReplace('/activity/zl191111.html');
			}else if(code == 400001337){//不好意思，服务器开小差了，请检查网络后再试哦~
				$.setSession('active1911code',code);
				fnUrlReplace('/activity/zl191111.html');
			}else if(code == 400001113){//提交超时，请稍后重新尝试
				$.setSession('active1911code',code);
				fnUrlReplace('/activity/zl191111.htmll');
			}
			else{
				$.setSession('active1911code',400001001);
				$.setSession('active1911msg',msg);
				globalMsg(msg);
				fnUrlReplace('/activity/zl191111.html');
			}
		},
		function(){
			$.setSession('active1911code',400001000);
			fnUrlReplace('/activity/zl191111.html');
		}
	)
})
