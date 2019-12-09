const showErrorTip = require('./errorTip.js');
const $wxMasker = $("#wxMasker");

let shareToWb = (title,bg)=>{
	const origin = window.location.origin;
	const url = `${origin}/activity/191212.html`;
	const picurl = origin + bg;
	const sharesinaString='http://v.t.sina.com.cn/share/share.php?title='+(encodeURI(title))+'&url='+(encodeURI(url))+'&sourceUrl='+(encodeURI(url))+'&content=utf-8&sourceUrl='+url+'&pic='+(encodeURI(picurl));
	window.open(sharesinaString);
};

let shareToQQ = (desc,bg) =>{
	const title = '来奥鹏教育，圆你大学梦想！';
	const summary = '奥鹏教育';
	const origin = window.location.origin;
	const url = `${origin}/activity/191212.html`;
	const picurl = origin + bg;
	const shareqqzoneString='https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?desc='+(encodeURI(desc))+'&title='+(encodeURI(title))+'&summary='+(encodeURI(summary))+'&url='+(encodeURI(url))+'&pics='+(encodeURI(picurl));
	window.open(shareqqzoneString);
};

/*微信分享功能--开始*/
$("body").on("mouseenter","#weixin",function(){
	$wxMasker.fadeIn();
});
$("body").on("mouseleave","#weixin",function(){
	$wxMasker.fadeOut();
});
/*微信分享功能--结束*/

/*qq分享功能--开始*/
$("body").on("click","#Qq",function(){
	getShareItem('QQ');
});
/*qq分享功能--结束*/

/*微博分享功能--开始*/
$("body").on("click","#weibo",function(){
	getShareItem('WB');
});
/*微博分享功能--结束*/

let getShareItem = (type) =>{
	$.sendReq(
		'/api/info/shareItem',
		'get',
		{
			ac_id :22
		},
		(res)=>{
			
			const {
				code,
				data,
				msg
			} = res;
			
			if(code == 0){
				
				const {
					share_words,
					img_url
				} = data;
				
				if(type == 'QQ'){
					shareToQQ(share_words,img_url);
				}else{
					shareToWb(share_words,img_url);
				}
				
			}else{
				showErrorTip(msg);
			}
		}
	)
};