/*
 * @Author: 梁杰
 * @Date: 2020-01-06 14:06:48
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-06 14:07:15
 * @Description: 同盾安全初始化
 */
window._fmOpt = {
    partner: "aopengjy",
    appName: "aopengNESwz_web",
    token: "aopengjy" + "-" + new Date().getTime() + "-" + Math.random().toString(16).substr(2),
    fmb: true,
    getinfo: function () {
        return "e3Y6ICIyLjUuMCIsIG9zOiAid2ViIiwgczogMTk5LCBlOiAianMgbm90IGRvd25sb2FkIn0=";
    }
};
var cimg = new Image(1, 1);
cimg.onload = function () {
    _fmOpt.imgLoaded = true;
};
cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=aopengjy&appName=aopengNESwz_web&tokenId=" + _fmOpt.token;
var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/v2/fm.js?ver=0.1&t=' + (new Date().getTime() / 3600000).toFixed(0);
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);