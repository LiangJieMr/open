/*
 * @Author: 梁杰
 * @Date: 2020-01-06 11:39:17
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-06 15:43:53
 * @Description: 入口文件
 */

import '../sass/2020xchd.scss';
$(function(){
	/*两端切换-开始*/
	require('./core/bothSwitch.js')
	/*两端切换-结束*/
	/*同盾安全初始化-开始*/
	require('./core/sameShield.js')
	/*同盾安全初始化-结束*/
	/*登陆状态-开始*/
	let changeStatus = require('./core/changeStatus.js');
	require('./core/changeLogin.js');
	/*登陆状态-结束*/
	/*用户名下拉-开始*/
	require('./core/header.js');
	/*用户名下拉-结束*/
	/*工具类-开始*/
	require('./core/open.js');
	/*工具类-结束*/
	/*初始化状态-开始*/
	changeStatus();
	/*初始化状态-结束*/
	/*图片懒加载-开始*/
	$.lazyImg('lazy');
	/*图片懒加载-结束*/
})