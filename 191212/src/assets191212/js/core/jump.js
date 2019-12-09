const origin = window.location.origin;
const urlObj = {
	'http://10.100.136.243:8000':'http://test.iopen.com.cn',
	'http://www.open.com.cn':'http://m.open.com.cn',
	'http://www.iopen.com.cn':'http://m.iopen.com.cn',
	'https://www.open.com.cn':'https://m.open.com.cn'
};
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
	var jumpUrl = urlObj[origin];
	if(jumpUrl){
		window.location.href = `${jumpUrl}${window.location.pathname}`;
	}
}