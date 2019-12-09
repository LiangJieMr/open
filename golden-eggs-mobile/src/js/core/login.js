var getmyprize = require('../index.js');
/*登陆注册开始*/
var api = {
	verify: '/api/user/verify',
	checkverify: '/api/user/checkverify',
	verifysend: '/api/user/verifysend',
	verifylogin: '/api/user/verifylogin',
	userkey: '/api/user/userkey',
}
var userkey; 
getuserkey()
function getuserkey() {
	$.ajax({
		type: 'post',
		url: api.userkey,
		async:true,
		dataType: 'json',
		success: function(res) {
			if (res.code == 0) {
				userkey = res.data
				getverify(res.data)
				$('.login-msg').text('')
			} else {
				getuserkey()
			}
		},
		error: function(err) {
			getuserkey()
			$('.login-msg').text('请求超时，请检查您的网络')
		}
	});
}
module.exports = getuserkey;
function getverify(u) {
	$.ajax({
		type: 'post',
		url: api.verify,
		dataType: 'json',
		async:true,
		data: {
			userkey: u
		},
		success: function(res) {
			if (res.code == 0) {
				$('.valid').attr('src', res.data)
				$('.login-msg').text('')
			} else {
				getuserkey()
			}
		},
		error: function(res) {
//			getuserkey()
			$('.login-msg').text('请求超时，请检查您的网络')
		}
	});
}
/*切换图形验证码*/
$('.valid').click(function() {
	getuserkey()
})
/*获取验证码*/
$('.getcode').click(function(){
	$.ajax({
		type:"post",
		url: api.checkverify,
		async:true,
		dataType: 'json',
		data: {
			verify_code: $('.img-code').val(),
			userkey: userkey
		},
		success: function(res){
			if (res.code == 0) {
				$('.login-msg').text('');
					getverifysend();
			} else {
				$('.login-msg').text(res.msg)
			}
		},
		error: function(err) {
			$('.login-msg').text('请求超时，请检查您的网络')
		}
	});
})
/*发送验证码*/
function getverifysend() {
	$.ajax({
		type: 'post',
		url: api.verifysend,
		dataType: 'json',
		data: {
			phone: $('.phone').val(),
			sms_method: 1,
			type: 1,
			verify_code: $('.img-code').val(),
			userkey: userkey,
			deviceInfo:_fmOpt.getinfo()
		},
		success: function(res){
			if (res.code == 0) {
				setTime();
				$('.login-msg').text('')
			} else {
				$('.login-msg').text(res.msg)
			}
		},
		error: function (err) {
			console.log(err)
			$('.login-msg').text('请求超时，请检查您的网络')
		}
	})
}
/*登陆注册*/
$('.login-btn').click(function(){
	$.ajax({
		type: 'post',
		url: api.verifylogin,
		dataType: 'json',
		data: {
			phone: $('.phone').val(),
			sms_code: $('.code ').val(),
			type: 12,
			verify_code: $('.img-code').val(),
			userkey: userkey
		},
		success: function(res) {
			if (res.code == 0) {
				$('.login').hide();
				$('.mask').hide();
				var j = {
					user_sign: res.data.user_sign,
					phone_num:$('.phone').val()
				}
				getmyprize(res.data.user_sign)
				$.setStorage('infor', j)
			} else {
				$('.login-msg').text(res.msg)
			}
		},
		error: function(err) {
			$('.login-msg').text('请求超时，请检查您的网络')
		}
	})
})
/*获取短信验证码*/
function setTime() {
	var time = 60;
	var el = $('.getcode').eq(0);
	el.attr('disabled', 'disabled')
	el.text(time + '(s)')
	timer = setInterval(function() {
		time--;
		el.text(time + '(s)')
		if(time <= 0) {
			el.text("获取验证码")
			el.attr('disabled', false)
			clearInterval(timer);
		}
	}, 1000)
}
/*倒计时*/
/*登陆注册结束*/