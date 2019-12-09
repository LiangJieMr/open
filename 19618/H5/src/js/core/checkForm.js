(function($) {
	/*表单验证公共插件*/
	$.fn.checkForm = function(options) {
		var defaults = {
			regExpPhone: /^1[3456789]\d{9}$/,
			regExpImgCode:/^[a-zA-Z0-9]{4}$/,
			regExpPhoCode:/^[a-zA-Z0-9]{4}$/,
			regExpName:/^([\u4e00-\u9fa5\·\.]{2,16})$/,
			regExpCard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
			regExpFormatCard:/(^(\d{6})|(\d{8}))(?=[^\s])/g,
			regExpNum:/\D/g,
			regExpNumSort:/[^\w\.\/]/ig,
			userNoneMsg:'请输入真实姓名',
			userErrorMsg:'请输入真实姓名',
			cardNoneMsg:'请输入身份证号码',
			cardErrorMsg:'请输入正确的省份证号码',
			phonenNoneMsg: '请输入手机号码',
			phoneErrorMsg: '请输入正确的手机号码',
			imgCodeNoneMsg: '请输入图形验证码',
			imgCodeErrorMsg: '请输入正确图形验证码',
			codeNoneMsg: '请输入手机验证码',
			codeError: '验证码错误，请重新输入',
			phoCodeApi:'/api/user/verifysend',
			imgCodeApi:'',
			getVerify:'/api/user/verify',
			checkverify:'/api/user/checkverify',
			userkey:null,
			domEle:null
		};
		var timer = null;
		
		var options = $.extend(defaults, options);
		
		/*手机验证码倒计时--开始*/
		function setWaitTime(time, ele) {
			var $ele = $(ele);
			$ele.prop('disabled', true);
			$ele.text(time + 'S');
			timer = setInterval(function() {
				time--;
				$ele.text(time + '(S)');
				if(time <= 0) {
					$ele.text('获取验证码');
					$ele.prop('disabled', false);
					clearInterval(timer);
				}
			}, 1000)
		};
		/*手机验证码倒计时--结束*/
		
		function validForm(ele) {
			var dataType = $(ele).attr('data-type');
			switch(dataType) {
				case 'userName':
				checkUserName(ele);
				break;
				case 'idCard':
				checkCard(ele);
				break;
				case 'phoneNum':
					checkPhone(ele);
					break;
				case 'imgCode':
					checkImgCode(ele);
					break;
				case 'phoneCode':
					checkCode(ele);
					break;
			}
		};

		function changeTip(flage, $ele, errInfro) {
			var num = $ele.attr('data-num');
			if(flage) {
				$ele.removeClass('focus');
			}
			$($errorEles[num]).text(errInfro);
		};
		
		/*身份证号码校验规则--开始*/
		function checkCard(ele) {
			var val = $(ele).val();
			if($.trim(val).length == 0) {
				changeTip(true, $(ele), options.cardNoneMsg);
			} else if(!(options.regExpCard).test(val.replace(/\s+/g, ""))) {
				changeTip(false, $(ele), options.cardErrorMsg);
			} else {
				changeTip(false, $(ele), '');
			}
		};
		/*身份证号码校验规则--结束*/
		
		/*用户名校验--开始*/
		function checkUserName(ele) {
			var val = $(ele).val();
			if($.trim(val).length == 0) {
				changeTip(true, $(ele), options.userNoneMsg);
			} else if(!(options.regExpName).test(val)) {
				changeTip(false, $(ele), options.userErrorMsg);
			} else {
				changeTip(false, $(ele), '');
			}
		};
		/*用户名校验--结束*/
		
		/*手机号码校验规则--开始*/
		function checkPhone(ele) {
			var val = $(ele).val();
			if($.trim(val).length == 0) {
				changeTip(true, $(ele), options.phonenNoneMsg);
			} else if(!(options.regExpPhone).test(val)) {
				changeTip(false, $(ele), options.phoneErrorMsg);
			} else {
				changeTip(false, $(ele), '');
			}
		};
		/*手机号码校验规则--结束*/
		
		/*图片验证码校验规则--开始*/
		function checkImgCode(ele) {
			var val = $(ele).val();
			if($.trim(val).length == 0) {
				changeTip(true, $(ele), options.imgCodeNoneMsg);
			} else if(!(options.regExpImgCode).test(val)) {
				changeTip(false, $(ele), options.imgCodeErrorMsg);
			} else {
				validImgCode(ele);
//				changeTip(false, $(ele), '');
				
			}
		};
		/*图片验证码校验规则--结束*/
		
		/*短信验证码校验规则--开始*/
		function checkCode(ele) {
			var val = $(ele).val();
			if($.trim(val).length == 0) {
				changeTip(true, $(ele), options.codeNoneMsg);
			} else if(!(options.regExpPhone).test(val)) {
				changeTip(false, $(ele), options.codeErrorMsg);
			} else {
				changeTip(false, $(ele), '');
			}
		};
		/*短信验证码校验规则--结束*/
		function validImgCode(ele){
			var val = $(ele).val();
			var data = {
				verify_code:val,
				userkey:options.userkey
			};
			$.ajax({
				url:options.checkverify,
				type:'post',
				dataType: 'json',
				data: data,
				async:false,
				success: function(data) {
					if(data.code == 0){
						changeTip(false, $(ele), '');
					}
					else{
						changeTip(false, $(ele),options.imgCodeErrorMsg);
					}
				},
				error: function() {
					options.showErrorTip('网络请求超时！')
				}
			})
		};

		function sendImgCode() {
			$.sendReq(options.getVerify,'post',{userkey:options.userkey},function(data){
				if(data.code == 0){
					$ImgCodeEle.attr('src',data.data);
				}
				else{
					options.showErrorTip(data.msg);
				}
			});
		};
		
		function changeImgCode(src){
			$ImgCodeEle.attr('src',src);
		};
		
		function changeUserkey(userkey){
			options.userkey = userkey;
			sendImgCode();
		};
		/*初始化数据--开始*/
		function initData() {
			$inputEles.val('');
			$errorEles.text('');
			clearInterval(timer);
			$phoCodeEle.text('获取验证码');
			$phoCodeEle.prop('disabled', false);
		};
		/*初始化数据--结束*/
		
		/*遍历错误信息判断是够通过校验--开始*/
		function checkTxt($eles){
			var flage = true;
			$.each($eles,function(index,item){
				var txt = $(item).text();
				if(txt != '') {
					flage =false;
					return false;
				};
			})
			return flage;
		};
		/*遍历错误信息判断是够通过校验--结束*/
		/*根据data-type查找元素--开始*/
		function findByDataType(type){
			return $this.find("input[data-type='"+type+"']");
		};
		/*根据data-type查找元素--结束*/
		var $this = $(this);
		var $inputEles = $this.find("input[data-type]");
		var $errorEles = $this.find(".error");
		var $phoneNumEle = $this.find("[data-type='phoneNum']");
		var $imgCodeEle = $this.find("[data-type='imgCode']");
		var $cardEles = $this.find("[data-type='idCard']");
		var $ImgCodeEle = $this.find("[data-type='getImgCode']");
		var $phoneCodeEle = $this.find("[data-type='phoneCode']");
		var $phoCodeEle = $this.find("[data-type='getCode']");
		var $submitEle = $this.find("*[data-type='submit']");
		
		$inputEles.bind('focus', function() {
			var num = $(this).attr('data-num');
			$($errorEles[num]).text('');
			$(this).addClass('focus');
		});

		$inputEles.bind('blur', function() {
			validForm(this);
		});
		$cardEles.bind('keyup',function(){
			var value = $(this).val();
			$(this).val(value.replace(options.regExpNumSort,''));
		});
		$phoneNumEle.bind('keyup',function(){
			var value = $(this).val();
			$(this).val(value.replace(options.regExpNum, ""));
			$(this).val($(this).val().substr(0,11));
		});
		$imgCodeEle.bind('keyup',function(){
			var value = $(this).val();
			$(this).val(value.replace(options.regExpNumSort,''));
			$(this).val($(this).val().substr(0,4));
		});
		$phoneCodeEle.bind('keyup',function(){
			var value = $(this).val();
			$(this).val(value.replace(options.regExpNum, ""));
			$(this).val($(this).val().substr(0,4));
		});
		$ImgCodeEle.bind('click', function() {
			sendImgCode();
		});
		
		$phoCodeEle.bind('click', function() {
			var $phoneNumEle = findByDataType('phoneNum');
			var $imgCodeEle = findByDataType('imgCode');
			$phoneNumEle.trigger('blur');
			$imgCodeEle.trigger('blur');
			if(checkTxt($errorEles.eq($phoneNumEle.attr('data-num'))) && checkTxt($errorEles.eq($imgCodeEle.attr('data-num')))){
				var data = {
					phone:$phoneNumEle.val(),
					type:options.type,
					verify_code:$imgCodeEle.val(),
					userkey:options.userkey,
					sms_method:2
				};
				var vm = this;
				$(this).prop('disabled', true);
				$.sendReq(options.phoCodeApi,'post',data,function(data){
					if(data.code == 0){
						setWaitTime(60, vm);
					}
					else{
						$(vm).prop('disabled', false);
						options.showErrorTip(data.msg);
					}
				},function(){
					$(this).prop('disabled', false);
				});
			}
		});
		$cardEles.bind('keyup',function(){
			$(this).val($(this).val().replace(options.regExpFormatCard,'$1 '));
			$(this).val($(this).val().substr(0,20));
		});
		$submitEle.bind('click', function() {
			$inputEles.trigger('blur');
			if(checkTxt($errorEles)){
				options.submit($inputEles,this,options.userkey,options.domEle);
			}
		});

		return {
			initData: initData,
			sendImgCode: sendImgCode,
			changeUserkey:changeUserkey
		}
	}
})(jQuery)