$(function(){
	/*图片懒加载*/
	$("img.lazy").lazyload({
			placeholder: "../assets19zhounianqing/img/logoBd2.svg",
			effect: "fadeIn",
			threshold: 200,
	});
	/*图片懒加载*/
	/*两端切换*/
	var locObj = window.location;
	var search = locObj.search;
	var origin = locObj.origin;
	var hostname = locObj.hostname;
	if(!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		switch(hostname){
			case 'test.iopen.com.cn':
			window.location.href = "http://10.100.136.243:8000/activity/19zhounianqing.html";
			break;
			case 'm.open.com.cn':
			window.location.href = "http://www.open.com.cn/activity/19zhounianqing.html";
			break;
		}
	}
	/*接口*/
	var api = {
		init: '/api/activity/init',//活动初始化接口
		winners: '/api/activity/winners',//活动获奖名单
		myprize: '/api/activity/myprize',//活动我的奖品（列表）
		egglottery: '/api/activity/egglottery', //活动抽奖
		address: '/api/activity/address', //活动中奖收货信息
		send: '/api/activity/send', //获奖短信发送
		deliver: '/api/activity/deliver', //奖品发货状态
	}
	/*接口*/
	/*环境变量*/
	var evn = require('./config');
	var envType = evn['NODE_ENV'];
	/*环境变量*/
	/*两端切换*/
	/*锤子展示*/
	var eggSrc = {
		1: './assets19zhounianqing/img/egg1.png',
		2: './assets19zhounianqing/img/egg2.png',
		3: './assets19zhounianqing/img/egg3.png'
	}
	var classType = {
		1: 'active-1',
		2: 'active-2',
		3: 'active-3'
	}
	$('#z-egg li img').click(function(e){
		if ($.getStorage('infor')) {
			var $target = $(e.target).parent(); 
			var params = {
//				activity_id: 4,
				user_sign: $.getStorage('infor').user_sign,
				platform: 1,
				egg_pos: $target.data('num')
			}
			$target.attr('clicked', 'clicked');
			if (!$target.attr('clicked')) {
				return;
			}
			$.sendReq(api.egglottery, 'post', params, function(res){
				$target.attr('clicked', '');
				if (res.code == 0) {
					$('.mask').show();
					$('.get-gift').show();
					setTimeout(function(){
						initDialog();
						showDialog();
						$('.gift').show();
						$('.gift').find('h4').text(res.data.prize_grade).end().find('.gift-des').text(res.data.prize_name);
						modifyPosition('-0.99rem');
						setTimeout(function(){
							if (res.data.gift_id == 1) {
								$('.gift-top').show();
								$('.liu-xing').show();
							}
							$('.cl-' + $target.data('num')).find('img').attr('src', '').attr('src', eggSrc[res.data.gift_id]).end().addClass(classType[$target.data('num')]);
							getmyprize(params.user_sign)
						}, 200)
						var imgsrc = {
							1: './assets19zhounianqing/img/one.png',
							2: './assets19zhounianqing/img/two.png',
							3: './assets19zhounianqing/img/three.png'
						}
						if (res.data.tem_id == 0) {
							$('.gift').find('.gift-img').attr('src', imgsrc[1]);
							$('.make').show();
						} else {
							$('.gift-time').show();
							$('.gift').find('.gift-img').attr('src', imgsrc[res.data.gift_id]);
						}
					},1000)
					var reqData = {
						user_sign: $.getStorage('infor').user_sign,
						phone: res.data.phone,
						gift_id: res.data.gift_id,
						sms_method: 2
					}
					$.sendReq(api.send, 'post', reqData, function(res){})
				} else if (res.code == 400001306 || res.code==40000123000) {
					initDialog();
					loginout();
				}else if (res.code == 400001681) {
					initDialog();
					showDialog();
					modifyPosition('-0.75rem');
					$('.show-status').show().find('.status-1').show()
				} else if (res.code == 400001646) {
					initDialog();
					showDialog();
					modifyPosition('-0.75rem');
					$('.show-status').show().find('.status-3').show()
				} else if (res.code == 400001653) {
					initDialog();
					showDialog();
					modifyPosition('-0.75rem');
					$('.show-status').show().find('.status-2').show()
				} else if (res.code == 400001680) {
					initDialog();
					showDialog();
					modifyPosition('-0.75rem');
					$('.show-status').show().find('.status-4').show()
				}else if (res.code == 400001640){
					initDialog();
					showDialog();
					modifyPosition('-0.7rem')
					$('.res-msg').show().find('p').text('本活动仅限缴纳订金的学员参与！ ').end().find('.sure').attr('data-type', 'ntkf').end().find('.sure').text('立即咨询客服')
				}else {
					initDialog();
					showDialog();
					modifyPosition('-0.7rem')
					$('.res-msg').show().find('p').text(res.msg).end().find('.sure').attr('data-type', 'sure').end().find('.sure').text('确定')
				}
			}, function(){
				$target.attr('clicked', '');
			})
		} else {
			changeLogin(true);
		}
	})
	/*锤子展示*/
	var $inputs = $('.modify-form .f input');
	function initDialog () {
		$.each($inputs,function(i,item){
			item.value = ''
		})
		$('.liu-xing').hide();
		$('.login').hide();
		$('textarea').val('')
		$('.modify-form .err').text('');
		$('.mask').hide();
		$('.temp').hide();
		$('.dialog').hide();
		$('.get-gift').hide();
	}
	function showDialog () {
		$('.mask').show();
		setTimeout(function(){
			$('.dialog').show();
		}, 100)
	}
	/*修改收货地址*/
	$('.make').click(function(e){
		$.sendReq(api.deliver, 'post', {user_sign: $.getStorage('infor').user_sign}, function(res){
			if (res.code == 400001648) {
				  initDialog();
					showDialog();
					modifyPosition('-0.7rem')
					$('.res-msg').show().find('p').text(res.msg).end().find('.sure').attr('data-type', 'sure').end().find('.sure').text('确定')
			} else if (res.code == 400001306 || res.code==40000123000) {
				loginout()
			}else {
				modifyPosition('-0.85rem');
				var $target = $(e.target);
				initDialog();
				var $textarea = $('.modify-form textarea');
				var $inputs2 = $('.form span');
				$inputs.eq(0).val($inputs2.eq(1).text())
				$inputs.eq(1).val($inputs2.eq(2).text())
				$textarea.val($inputs2.eq(3).text())
				showDialog();
				$('.dialog').find('.modify-form').show()
			}
		})
	})
	$('.close').click(function(){
		initDialog();
	})
	/*修改收货地址*/
	
	/*页面初始化*/
	var currenttime;
	var activitybegin;
	var activityend;
	init();
	function init(){
		$.sendReq(api.init, 'post', '', function(res){
			if (res.code == 0) {
				/*倒计时*/
				var countDownTime;
				currenttime = new Date(res.data.now_time).getTime();
				activitybegin = new Date(res.data.start_time).getTime();
				activityend = new Date(res.data.end_time).getTime();
				$("title").html(res.data.tdk_title); 
				$('[name="keywords"]').html(res.data.tdk_keyword);
				$('[name="description"]').html(res.data.tdk_description);
				var list = res.data.list;
				for(var i=0; i< list.length; i++ ){
					if (list[i].tem_id == 0) {
						var str = ''
						str += '<dt>'
						str += 	'<img src="./assets19zhounianqing/img/gift1.png" alt="" class="lazy"/>'
						str +=  '<h5>'+list[i].prize_grade+'<span class="count">'
						if(list[i].tem_id == 0){
							str +='共'+ list[i].prize_quota+'台'
						} else {
							str +='共'+ list[i].prize_quota+'名'
						}
						str +='</span></h5>'
						str += 	'<p>'+list[i].prize_name+'</p>'
						str += 	'</dt>'
					} else {
						str += '<dd>'
						str += 	'<div><em>￥</em><span>'+list[i].price.slice(0, list[i].price.indexOf('.'))+'</span><i>助学金</i></div>'
						str +=  '<h5>'+list[i].prize_grade+'<span class="count">'
						if(list[i].tem_id == 0){
							str +='共'+ list[i].prize_quota+'台'
						} else {
							str +='共'+ list[i].prize_quota+'名'
						}
						str +='</span></h5>'
						str += 	'<p>'+list[i].prize_name+'</p>'
						str += 	'</dd>'
					}
				}
				$('.item1').find('dl').append(str)
				if (activitybegin>currenttime) {
					stime = activitybegin - currenttime;
					countDown(stime)
					cd= setInterval(function(){
						countDownTime = countDown(stime)
						renderTime([{e:$('.d'), type:'d'}, {e:$('.h'), type:'h'}, {e:$('.m'), type:'m'}, {e:$('.s'), type:'s'}],countDownTime, 'e', 'type')
					}, 1000)
				} else if (activityend > currenttime) {
					stime = activityend - currenttime
					$('.count-down-t').find('p').text('距离活动结束还剩 ')
					countDown(stime)
					cd= setInterval(function(){
						countDownTime=countDown(stime)
						renderTime([{e:$('.d'), type:'d'}, {e:$('.h'), type:'h'}, {e:$('.m'), type:'m'}, {e:$('.s'), type:'s'}],countDownTime, 'e', 'type')
					}, 1000)
				} else {
					$('.time').html('活动已结束').css('fontSize', '0.18rem')
				}
			}else if (res.code == 400001306 || res.code==40000123000) {
					loginout()
				}
		})
	}
	/*时间渲染*/
	function renderTime (arr,timedata, key1, key2) {
		for (var j=0; j<arr.length; j++) {
			for(var i=0; i<arr[j][key1].length; i++) {
				$(arr[j][key1][i]).text(timedata[arr[j][key2]][i])
			}
		}
		
	}
	/*时间渲染*/
/*页面初始化*/
/*获取获奖名单*/
var getGContentLength = 0;
getwinners();
function getwinners() {
	$.ajax({
		type: "get",
		url: api.winners,
		dataType: 'json',
		async:true,
		success: function(res) {
			if (res.code == 0) {
				var $list;
				var str ='';
				if (res.data instanceof Array) {
					$list=[]
				} else {
					$list = res.data.list
				}
				if ($list.length) {
					$('.no-content').hide();
					$('.get-g-content').html('')
					for(var i=0; i<res.data.list.length; i++) {
						str+= "<li><span>"+res.data.list[i].phone+"</span>&nbsp;&nbsp;<span class='j'>"+res.data.list[i].prize_grade+"</span></li>"
					}
					currenttime = new Date(res.data.time).getTime();
					$('.list').append(str);
				} else {
					$('.no-person').css('display','block');
				}
			} else if (res.code == 400001306 || res.code==40000123000) {
				loginout()
			}
		},
		error: function(err) {
			
		}
	});
}
function autoScroll(obj) {
    $(obj).find(".list").animate({
        marginTop: "-32px"
    }, 500, function() {
    	if ($(".list li").length <= 6) {
    		$(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    	} else {
    		$(this).css({
            marginTop: "0px"
        }).find("li:first").remove();
    	}
    })
}

setInterval(function(){
	autoScroll('.list-content')
}, 2000);
setInterval(function(){
	getwinners();
}, 23000)
/*获奖名单滚动*/
	/*倒计时封装*/
	function countDown(t) {
    //定义变量 d,h,m,s保存倒计时的时间  
    var d,h,m,s;
    t-= 1000;
    stime = t;
    if (t >= 0) {  
         d = Math.floor(t/1000/60/60/24);  
         h = Math.floor(t/1000/60/60%24);  
         m = Math.floor(t/1000/60%60);  
         s = Math.floor(t/1000%60);                    
    }  else {
    	clearInterval(cd);
//  	$('.count-down-t p').text('距离活动结束还剩')
    	init();
    	getwinners();
    	if (currenttime > activityend) {
    		$('.time').html('活动已结束').css('fontSize', '0.18rem')
    	}
    } 
    d = d<10? '0' + d: d ? String(d) : '00';
    h = h<10? '0' + h: h ? String(h) : '00';
    m = m<10? '0' + m: m ? String(m) : '00';
    s = s<10? '0' + s: s ? String(s) : '00';
    var timeData = {
    	d:d.split(''),
    	h:h.split(''),
    	m:m.split(''),
    	s:s.split('')
    }
    return timeData
	}
	/*倒计时封装*/
	
	/*我的奖品模板*/
	function getmyprize(user_sign) {
		if (!user_sign) {
				loginout();
				return;
			}
		$.sendReq(api.myprize, 'GET', {user_sign:user_sign}, function(res){
			if(res.code == 0) {
				if (res.data instanceof Array) {
				} else {
					if (res.data.tem_id != 0) {
						$('.make').hide()
						$('.form').find('div').hide().end().find('.form-1').show().css({
							'lineHeight': '0.28rem',
							'textAlign': 'center'
						});
					}
					$('.my-gift').show();
						$('.item2').show();
					var imgSrc = {
						1: './assets19zhounianqing/img/gift1.png'
					}
					if (res.data.gift_id == 1) {
						$('.item2 img').show();
						$('.item2 img').attr('src', imgSrc[res.data.gift_id]);
					} else {
						$('.gift-left-img').css('display', 'inline-block');
						$('.gift-left-img span').text(res.data.price.slice(0, res.data.price.indexOf('.')));
					}
				  $('.cl-' + res.data.egg_pos).find('img').attr('src', '').attr('src', eggSrc[res.data.gift_id]).end().addClass(classType[res.data.egg_pos]);
					var $spans = $('.form span');
					$('.form-1').html('<label>'+res.data.prize_grade+'：</label><span>'+res.data.prize_name+'</span>')
					$spans.eq(1).text(res.data.address_name);
					$spans.eq(2).text(res.data.phone);
					$spans.eq(3).text(res.data.address ? res.data.address: '未填写');
				}
				
			} else if (res.code == 400001306 || res.code==40000123000) {
				loginout()
			}
		})
	}
	module.exports = getmyprize;
	/*我的奖品模板*/
	
	/*修改收货地址*/
	$('.sure').click(function(e){
		var $target = $(e.target);
		var $type = $target.data('type');
		if ($type == 'submit') {
			var u = $.getStorage('infor');
			if (!u) {
				loginout();
				return;
			}
			var params = {
				user_sign: u['user_sign'],
				name:$inputs.eq(0).val(),
				phone: $inputs.eq(1).val() ,
				address: $('textarea').val()
			}
			$.sendReq(api.address, 'post', params, function(res){
				if (res.code == 0) {
						getmyprize($.getStorage('infor')['user_sign']);
						initDialog();
						showDialog();
						modifyPosition('-0.85rem');
						$('.show-msg').show();
					} else if (res.code == 400001306 || res.code==40000123000) {
						loginout()
					} else {
						$('.modify-form .err').text(res.msg)
					}
			})
		} else if($type == 'ntkf'){
//				NTKF.im_openInPageChat('kf_10225_1531102671297');
			_MEIQIA('showPanel');
		} else {
			initDialog()
		}
	})
	/*修改收货地址*/
	
	/*登陆超时*/
	function loginout() {
		initDialog();
		$.removeLocalStorage('infor');
		changeLogin(true)
	}
	/*登陆超时*/
	
	/*修改弹出层位置*/
	function modifyPosition(num){
		$('.dialog').css('marginTop', num)
	}
	/*修改弹出层位置*/
	var changeLogin = require('./core/changeLogin');
	$.getStorage('infor') ? getmyprize($.getStorage('infor').user_sign): '';
	var Login = require('./core/login');
})
