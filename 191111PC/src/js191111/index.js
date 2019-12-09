window.onload = function(){
	var origin = window.location.origin;
	var urlObj = {
	 'http://10.100.136.243:8000':'http://test.iopen.com.cn',
	 'http://www.open.com.cn':'http://m.open.com.cn',
	 'http://www.iopen.com.cn':'http://m.iopen.com.cn',
	 'https://www.open.com.cn':'https://m.open.com.cn'
	};
	if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
	 var jumpUrl = urlObj[origin]
	 if(jumpUrl){
	  window.location.href = `${jumpUrl}${window.location.pathname}`;
	 }
	}
	 /*同盾安全初始化-开始*/
	 window._fmOpt = {
        partner: "aopengjy",
        appName: "aopengNESwz_web",
        token: "aopengjy" + "-" + new Date().getTime() + "-"+ Math.random().toString(16).substr(2),
        fmb: true,
        getinfo: function(){
            return "e3Y6ICIyLjUuMCIsIG9zOiAid2ViIiwgczogMTk5LCBlOiAianMgbm90IGRvd25sb2FkIn0=";
        }                           
    };
    var cimg = new Image(1,1);
    cimg.onload = function() {
        _fmOpt.imgLoaded = true;
    };
    cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=aopengjy&appName=aopengNESwz_web&tokenId=" + _fmOpt.token;
    var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
    fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/v2/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
 /*同盾安全初始化-结束*/
//	var open = require('../js/open');
	
	var invite = require('./core/invite');
	var help = require('./core/help');
	var activity_list = require('./core/activity_list');
	var changeLogin = require('./core/changeLogin');
	$.getStorage('infor') ? changeLogin(true) : changeLogin(false);
	var showLogin = require('./core/login');
	var showErrorTip = require('./core/errorTip');
	var evn = require('./config');
	var getInfor = require('./core/getInfor');
	var activeOne = require('./core/activeOne');
	// var activeTwo1 = require('./core/activeTwo');
	var $header = $("#header a");
	var $wxMasker = $("#wxMasker");
	var $timerBox = $("#timerBox");
	var $wxShare = $(".share-code");
	var $hideInput = $("#hideInput");
	activity_list();
	//悬浮框跳转检测
	$('.myMoney').on('click',function(event){
		locUrl(event)
	})
	function locUrl(event){
		if(getInfor()){
			window.open("/users/studentSubsidies.html");
		}else{
			event.preventDefault();
			showLogin();
			$('#emialEvent').off('click')
			$('#emialEvent').one('click',function(){
				locUrl()
			})
		}
	}
	//活动一切换
	var ling = document.getElementsByClassName('ling');
	var shiYi = document.getElementsByClassName('shiYi');
	ling[0].onclick = function() {
		$('.tip').show()
		activity_list(1);
		$('.activeOne_inn_con').eq(0).attr('class','activeOne_inn_con')
		$('.activeOne_inn_con').eq(1).attr('class','activeOne_inn_con acOneInn')
		$('.activeOne_inn_tit').css('background','url("./assets191111/img/activeOnebg_l.png")')
	}
	shiYi[0].onclick = function() {
		$('.tip').show()
		activity_list(1);
		$('.activeOne_inn_con').eq(0).attr('class','activeOne_inn_con acOneInn')
		$('.activeOne_inn_con').eq(1).attr('class','activeOne_inn_con')
		$('.activeOne_inn_tit').css('background','url("./assets191111/img/activeOnebg_r.png")')
	}
	// 活动二
	var nav = document.getElementById('nav');
	var oNav = document.getElementsByClassName('nav_li')
	var container = document.getElementById('container');
	var oDiv = container.getElementsByClassName('tab');
	var oAc = document.getElementsByClassName('ac');
	for (var i = 0; i < oNav.length; i++) {
	    oNav[i].index = i;
	    oNav[i].onclick = function() {
			$('.tip').show()
			activity_list(1);
	        for (var m = 0; m < oNav.length; m++) {
	            oDiv[m].style.display = 'none'
	            oAc[m].style.display = 'none'
	        }
	        oAc[this.index].style.display = 'block'
	        oDiv[this.index].style.display = 'block'
	    }
	}
	var body = document.getElementsByClassName('jDKtMA');
	// $('.jDKtMA').attr('class','xiaoShi')
	// console.log($('.jDKtMA'))
	$('.for_btn_inn').on('click',function(){
		activity_list();
		$('.for').hide();
	})
	/*关闭海报开始*/
	$('.posterspx').on('click',function(){
		$('.posters').hide()
		$('.mask').hide()
	})
	/*关闭海报结束*/
	// /*遮罩层关闭开始*/
	// $('.mask_btn').on('click', function(){
	// 	$('.mask').hide()
	// 	activity_list();
	// })
	/*遮罩层关闭结束*/
	var envType = evn['NODE_ENV'];
	console.log(envType)
		var wxShareImg = ((envType== 'production') ? './assets191111/img/shareWx.png' : './assets191111/img/shareWxOff.png');
		$wxShare.attr('src',wxShareImg);
		$hideInput.one('click',function(){
			var $actOneBox = $("#actOneBox");
			$actOneBox.find('span.num-one').html('&#xe60c;');
			var $actTwoBox = $("#actTwoBox");
			$actTwoBox.find('span.num-two').html('&#xe605;');
			var actOneHtml =  $actOneBox.children();
			var actTwoHtml =  $actTwoBox.children();
			$actOneBox.html(actTwoHtml);
			$actTwoBox.html(actOneHtml);
		});
		var str = '';
		var pg = '';
		$.ajax({
			url : '/api/info/shareItem',
			type : 'get',
			dataType : 'json',
			data : {
				ac_id : 14
			},
			success : function(res){
				let {code,data} = res
				if(code == 0){
					str = data.share_words;
					pg = data.img_url;
				}
			}
		})
	function shareToWb(){
			var protocol = window.location.protocol;
			var host = window.location.host;
			var title = str;
			var url = protocol + '//' + host + '/activity/' + ((envType== 'production') ? '191111.html' : '191111.html');
			
			var picurl = protocol + '//' + host + pg;
			var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+(encodeURI(title))+'&url='+(encodeURI(url))+'&sourceUrl='+(encodeURI(url))+'&content=utf-8&sourceUrl='+url+'&pic='+(encodeURI(picurl));
			
			window.open(sharesinastring);
		};
		
		
		function shareToQQ(){
			var desc = str;
			var title = '来奥鹏教育，圆你大学梦想！';
			var summary = '奥鹏教育';
			var protocol = window.location.protocol;
			var host = window.location.host;
			
			var url =  protocol + '//' + host + '/activity/' + ((envType== 'production') ? '191111.html' : '191111.html');
			var picurl = protocol + '//' + host + pg;
			var shareqqzonestring='https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?desc='+(encodeURI(desc))+'&title='+(encodeURI(title))+'&summary='+(encodeURI(summary))+'&url='+(encodeURI(url))+'&pics='+(encodeURI(picurl));
			window.open(shareqqzonestring);
		};
		if(!getInfor()){
			$.removeLocalStorage('infor');
			changeLogin(false)
		}
		/*登录注册按钮--开始*/
		$("body").on("click","#loginBtn",function(){
			showLogin(showErrorTip);
			$("#closeOrder").trigger('click');
		});
		/*登录注册按钮--结束*/
		
		/*微博分享功能--开始*/
		$("body").on("click","#weibo",function(){
			shareToWb();
		});
		/*微博分享功能--结束*/
		
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
			shareToQQ();
		});
		/*qq分享功能--结束*/
		
		/*退出登录--开始*/
			$('body').on('click', '.quit-login', function() {
				var data = {
					user_sign: getInfor()
				};
				$.sendReq('/api/user/logout', 'post', data, function(data) {
					if(data.code == 0) { //退出成功
						$.removeLocalStorage('infor');
						 window.location.reload();
						activity_list();
					} else {
						showErrorTip(data.msg);
					}
				});
			});
			/*退出登录--结束*/
		$('.con_btn p').on('click',function(){
			$('.mask').show()
		})
		
		/*小能聊天绑定事件--开始*/
		var $chats = document.getElementsByClassName('wechat');
		for(var i = 0; i < $chats.length; i++) {
		    $chats[i].onclick=function() {
		        _MEIQIA('showPanel');
		    }
		}
		/*小能聊天绑定事件--结束*/
		
}
