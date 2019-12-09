import "../scss/191212.scss";
$(function(){
	require('./core/jump.js');
	require('./core/open.js');
	require('./core/header.js');
	const addressTip = require('./core/addressTip.js');
	const changeLogin = require('./core/changeLogin.js');
	const getInfor = require('./core/getInfor.js');
	const login = require('./core/login.js');
	const lightGif = require('./core/lightGif.js');
	const myPrice = require('./core/myPrice.js');
	require('./core/cutDown.js');
	require('./core/priceSet.js');
	/*我的奖品-开始*/
	myPrice();
	/*我的奖品-结束*/
	/*转盘灯光效果-开始*/
	lightGif();
	/*转盘灯光效果-结束*/
	require('./core/draw.js');
	require('./core/slider.js');
	$.lazyImg('lazy');
});
