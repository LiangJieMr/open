// var getInfor = require('./getInfor');
// var showErrorTip = require('./errorTip');
// var activity_list = require('./activity_list');
// var showLogin = require('./login');
// var ac9 = $('.ac9');
// var ac8 = $('.ac8');
// var ac7 = $('.ac7');
// var ac6 = $('.ac6');
// var cath = '/api/activity/catch'
// var git9 = '2019-11-11 09:00:00'
// var git8 = '2019-11-11 13:00:00'
// var git7 = '2019-11-11 17:00:00'
// var git6 = '2019-11-11 21:00:00';

// // var gitT1 = '2019-11-11 11:11:00'

// var cId9 = [358,359,360,361];
// //09点
// for(var i = 0; i < ac9.length; i++){
// 	ac9[i].index = i;
// 	ac9[i].onclick = function(){
// 		var data9 = {
// 			user_sign : getInfor(),
// 			activity_id : 14,
// 			gift_time : git9,
// 			coupon_id : '',
// 			platform : 1
			
// 		}
		
// 		data9.gift_time = git9
// 		var num = this.index
// 		if(num == 0){
// 			console.log(this.index)
// 			data9.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data9,function(data){
// 				console.log(data)
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>500')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide().find('.for_img').css('background','url(../assets191111/img/mianDan.png)').find('b').html('<span>&yen;</span>500')
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide().find('.for_img').css('background','url(../assets191111/img/mianDan.png)').find('b').html('<span>&yen;</span>500')
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育500元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>500')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 1){
// 			console.log(this.index)
// 			data9.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data9,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>300')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list();
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育300元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>300')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 2){
// 			console.log(this.index)
// 			data9.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data9,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>200')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育200元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>200')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 3){
// 			console.log(this.index)
// 			data9.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data9,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>100')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育100元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>100')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 	}
// }
// //13点
// for(var i = 0; i < ac8.length; i++){
// 	ac8[i].index = i;
// 	ac8[i].onclick = function(){
// 		var data8 = {
// 			user_sign : getInfor(),
// 			activity_id : 14,
// 			gift_time : git8,
// 			coupon_id : '',
// 			platform : 1
			
// 		}
// 		var num = this.index
// 		if(num == 0){
// 			console.log(this.index)
// 			data8.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data8,function(data){
// 				console.log(data)
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>500')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide().find('.for_img').css('background','url(../assets191111/img/mianDan.png)').find('b').html('<span>&yen;</span>500')
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide().find('.for_img').css('background','url(../assets191111/img/mianDan.png)').find('b').html('<span>&yen;</span>500')
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育500元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>500')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 1){
// 			console.log(this.index)
// 			data8.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data8,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>300')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育300元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>300')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 2){
// 			console.log(this.index)
// 			data8.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data8,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>200')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育200元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>200')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 3){
// 			console.log(this.index)
// 			data8.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data8,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>100')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育100元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>100')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 	}
// }
// //19点
// for(var i = 0; i < ac7.length; i++){
// 	ac7[i].index = i;
// 	ac7[i].onclick = function(){
// 		var data7 = {
// 			user_sign : getInfor(),
// 			activity_id : 14,
// 			gift_time : git7,
// 			coupon_id : '',
// 			platform : 1
			
// 		}
// 		var num = this.index
// 		if(num == 0){
// 			console.log(this.index)
// 			data7.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data7,function(data){
// 				console.log(data)
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>500')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育500元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>500')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 1){
// 			console.log(this.index)
// 			data7.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data7,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>300')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育300元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>300')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 2){
// 			console.log(this.index)
// 			data7.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data7,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>200')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育200元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>200')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 3){
// 			console.log(this.index)
// 			data7.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data7,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>100')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育100元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>100')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 	}
// }
// //21点
// for(var i = 0; i < ac6.length; i++){
// 	ac6[i].index = i;
// 	ac6[i].onclick = function(){
// 		var data6 = {
// 			user_sign : getInfor(),
// 			activity_id : 14,
// 			gift_time : git6,
// 			coupon_id : '',
// 			platform : 1
			
// 		}
// 		var num = this.index
// 		if(num == 0){
// 			console.log(this.index)
// 			data6.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data6,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>500')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育500元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>500')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 1){
// 			console.log(this.index)
// 			data6.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data6,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>300')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育300元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>300')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 2){
// 			console.log(this.index)
// 			data6.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data6,function(data){
// 				if(data.code == 400001681){
					
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>200')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育200元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>200')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 		if(num == 3){
// 			console.log(this.index)
// 			data6.coupon_id = cId9[this.index]
// 			$.sendReq(cath,'post',data6,function(data){
// 				if(data.code == 400001681){
// 					$('.abnormal').show().find('.ab2').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab2').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001682){
// 					$('.for').show().find('.huode').show().find('.for_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>100')
// 					$('.for_btn').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 					})
// 					$('.forpx').on('click',function(){
// 						$('.for').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001698){
// 					$('.abnormal').show().find('.ab4').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab4').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001684){
// 					$('.abnormal').show().find('.ab3').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab3').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001653){
// 					$('.abnormal').show().find('.ab1').show()
// 					$('.ab_btn').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 					})
// 					$('.abpx').on('click',function(){
// 						$('.abnormal').hide().find('.ab1').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 0){
// 					$('.lucky').show().find('.huode').show().find('.gongXi').html('恭喜获得奥鹏教育100元助学金')
// 					$('.lucky').find('.lucky_img').css('background','url(../assets191111/img/jin.png)').find('b').html('<span>&yen;</span>100')
// 					switch(data.data.less_num){
// 						case 2:
// 							$('.ciShu').eq(0).html('两次')
// 							break;
// 						case 1:
// 							$('.ciShu').eq(0).html('一次')
// 							break;
// 						case 0:
// 							$('.ciShu').eq(0).html('0次')
// 							break;	
// 					}
// 					$('.lucky_btn').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 					})
// 					$('.lupx').on('click',function(){
// 						$('.lucky').hide().find('.huode').hide()
// 						$('.mask').hide();activity_list()
// 					})
// 				}else if(data.code == 400001685){
					
// 				}else if(data.code == 400001326){
// 					showErrorTip('登录超时，请稍后重新尝试！')
// 					showLogin(showErrorTip)
// 				}
// 			},function(err){
// 				console.log(err,'err')
// 			})
// 		}
// 	}
// }