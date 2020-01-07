/*
 * @Author: 梁杰
 * @Date: 2020-01-06 14:03:22
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-06 14:05:06
 * @Description: 两端切换
 */

var origin = window.location.origin;
var urlObj = {
    'http://test.iopen.com.cn': 'http://10.100.136.243:8000',
    'http://m.open.com.cn': 'http://www.open.com.cn',
    'http://m.iopen.com.cn': 'http://www.iopen.com.cn',
    'https://m.open.com.cn': 'https://www.open.com.cn',
};
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    var jumpUrl = urlObj[origin]
    if (jumpUrl) {
        window.location.href = `${jumpUrl}${window.location.pathname}`;
    }
}