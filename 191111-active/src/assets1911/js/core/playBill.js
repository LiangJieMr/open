var api = {
	boostPoster:'/api/activity/boostPoster',
	overdue:'/api/user/overdue'
};
require('./open.js');
function playBill(){
	
	var infor = $.getStorage('infor');
	var userSign = infor ? infor['user_sign'] : '';
	var phoneNum = infor ? infor['phone_num'] : '';
	var linkUrl = `${window.location.origin}/activity/zl191111.html&param=${JSON.stringify({phone:phoneNum})}`;
	var imgUrl  = `${api.boostPoster}?ac_id=10&user_sign=${userSign}&location_url=${linkUrl}`;
	$('.down-playbill #billImg').attr('src','./assets1911/img/logoBd.svg')
	$.sendReq(api.overdue,'post',{user_sign:userSign},function(data){
		if(data.code == 0){
			$('.down-playbill #billImg').attr('src',imgUrl);
			$(".down-playbill").show();
		}
		else{
			$.removeLocalStorage('infor');
			console.log(data.msg)
//			showTip.changeLogin(false);
//			showTip.showLogin();
//			showTip.showErrorTip(data.msg);
		}
	});
	
};

//判断是否为Trident内核浏览器(IE等)函数
function browserIsIe() {
    if (!!window.ActiveXObject || "ActiveXObject" in window){
        return true;
    }
    else{
        return false;
    }
};

//下载图片的函数
function downloadImg() {
    //iframe的src属性不为空,调用execCommand(),保存图片
    if ($('#IframeReportImg').src != "about:blank") {
        window.frames["IframeReportImg"].document.execCommand("SaveAs");
    }
};

//创建iframe并赋值的函数,传入参数为图片的src属性值.
function createIframe(imgSrc) {
    //如果隐藏的iframe不存在则创建
    if ($("#IframeReportImg").length === 0){
        $('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg"   width="0" height="0" src="about:blank"></iframe>').appendTo("body");
    }
    //iframe的src属性如不指向图片地址,则手动修改,加载图片
    if ($('#IframeReportImg').attr("src") != imgSrc) {
        $('#IframeReportImg').attr("src",imgSrc);
    } else {
        //如指向图片地址,直接调用下载方法
        downloadImg();
    }
};

//$("#downPlaybill").on('click',function(){
//	var infor = $.getStorage('infor');
//	var userSign = infor ? infor['user_sign'] : '';
//	$.sendReq(api.overdue,'post',{user_sign:userSign},function(data){
//		if(data.code == 0){
//			if (browserIsIe()) {
//				    createIframe(imgUrl);
//			} 
//			else {
//			        var alink = document.createElement("a");
//			        document.body.appendChild(alink);
//			        alink.style.display='none';
//			        alink.href = imgUrl;
//			        alink.download = 'playBill';
//			        alink.click();
//			        alink.parentNode.removeChild(alink);
//			};
//			$(".down-playbill").hide();
//		}
//		else{
//			$.removeLocalStorage('infor');
////			showTip.changeLogin(false);
////			showTip.showLogin();
////			showTip.showErrorTip(data.msg);
//			cosole.log(data.msg);
//		}
//	});
//});
$(".down-playbill").on('click','.close',function(){
	$(".down-playbill").hide();
});
module.exports = playBill;