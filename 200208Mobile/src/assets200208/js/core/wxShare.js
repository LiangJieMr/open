/*
 * @Author: 梁杰
 * @Date: 2020-01-10 16:50:42
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-13 15:07:10
 * @Description: 分享
 */
var wx = require('weixin-js-sdk');
const apiWx = window.location.protocol + '//www.open.com.cn/wx/token'
var showErrorTip = require('./errorTip.js');
/**
 * 分享朋友圈
 * @param {*} data 
 */
function loadShare(data) {
	const { appId, nonceStr, signature, timestamp } = data;
	wx.config({
		debug: false, // 是否开启调试模式
		appId: appId, //appid
		timestamp: timestamp, // 时间戳
		nonceStr: nonceStr, // 随机字符串
		signature: signature, // 签名
		jsApiList: [
			'updateTimelineShareData',
			'updateAppMessageShareData'
		] // 需要使用的JS接口列表
	});

	wx.ready(function () {
		const title = '金鼠报喜 奥鹏有礼';
		const desc = '鼠年开福卡，抽取助学金。2020新春助学金，助你提升学历，开启新生活，快来参与吧~';
		const imgUrl = `${window.location.origin}/activity/assets200208/img/share.png`;
		const link = `${window.location.origin}/activity/2020xchdmid.html`;
		// 分享给好友
		wx.updateAppMessageShareData({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				doShareDone()
			},
			cancel: function () {
				doShareCancel()
			}
		})
		// 分享到朋友圈
		wx.updateTimelineShareData({
			title: title, // 分享标题
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				doShareDone()
			},
			cancel: function () {
				doShareCancel()

			}
		})
	})
};
// 分享成功回调
function doShareDone() {
	//globalMsg('分享成功')

};

// 取消分享回调
function doShareCancel() {
	//globalMsg('取消了分享')

};

$.sendReq(apiWx, 'get', {
	url: window.location.href
}, function (res) {
	const {
		code,
		data,
		msg
	} = res;
	if (code == 200) {
		loadShare(data);
	} else {
		showErrorTip(msg);
	}
}
)