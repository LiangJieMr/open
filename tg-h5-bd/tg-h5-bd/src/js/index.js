window.onload = function() {
	
	/*接口API定义--开始*/
	var api = {
		groundpage: "/api/user/groundpage"
	}
	/*接口API定义--结束*/

	/*查找元素--开始*/
	function getByClassName(classn) {
		if(!document.getElementsByClassName) { //判断document.getElementsByClassName方法是否支持
			var list = document.getElementsByTagName("*"); //先取得所有的dom标签元素
			//              alert(list.length)
			var temp = []; //创建临时数组
			for(var i = 0; i < list.length; i++) { //循环每一个dom元素
				if(list[i].className == classn) { //判断当前这个元素的class名称是否等于box
					temp.push(list[i]) //如果等于，将该元素添加到数组中去
				}

			}
			return temp; //返回给函数
		} else {

			return document.getElementsByClassName(classn);
		}
	};

	function getById(id) {
		return document.getElementById(id);
	};
	/*查找元素--结束*/
	var $submitForm = getById('submitForm');
	/*隐藏站长统计--开始*/
//	document.getElementsByTagName('a')[0].style.display="none";
	/*隐藏站长统计--结束*/
	
	/*事件兼容处理--开始*/
	function addEvent(element, type, handler) {
		if(element.addEventListener) {
			//事件类型、需要执行的函数、是否捕捉
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent) {
			element.attachEvent('on' + type, function() {
				handler.call(element);
			});
		} else {
			element['on' + type] = handler;
		}
	};
	/*事件兼容处理--结束*/
	
	/*弹出层方法封装--开始*/
	function showbox(flag) {
		var msgcontent = getByClassName('msgcontent')[0];
		if(flag) {
			msgcontent.style.display = 'block';
		} else {
			msgcontent.style.display = 'none';
		}
	}
	/*弹出层方法封装--结束*/

	/*关闭弹出层--开始*/
	var closemsg = getById('closemsg');
	addEvent(closemsg, 'click', function() {
		showbox(false);
	});
	/*关闭弹出层--结束*/

	/*手机号验证--开始*/
	function isPhoneNo(phone) {
		var pattern = /^1[3|4|5|7|8][0-9]{9}$/;
		return pattern.test(phone);
	}
	/*手机号验证--结束*/

	/*获取单选框value--开始*/
	function getRadioValue(elements) {
		var saveVal = '';
		for(var i = 0; i < elements.length; i++) {
			if(elements[i].checked) {
				saveVal = elements[i].value;
				break;
			}
		}
		return saveVal;
	};
	/*获取单选框value--结束*/

	/*表单数据封装--开始*/
	function formdata(type) {
		var option = {}
		option.name = getByClassName("name-" + type)[0].value;
		option.userDetail = '';
		option.level = getRadioValue(getByClassName('level-' + type));
		option.age = getRadioValue(getByClassName("age-" + type));
		option.learning_type = getRadioValue(getByClassName("meth-" + type));
		option.phone = getByClassName("phone-" + type)[0].value;
		option.type = (type == 0 ? '表单一' : '表单二');
		option.url = window.location.href;
		return option;
	}
	/*表单数据封装--结束*/

	/*在线入学测试表单提交--开始*/
	var onlinesubmit = getByClassName('form-submit');
	for(var i = 0; i < onlinesubmit.length; i++) {
		(function(i) {
			addEvent(onlinesubmit[i], 'click', function(e) {
				
				var options = formdata(i);
				if(isPhoneNo(options.phone)) {
					var obj = formdata(i);
					$('.yxItem').eq(0).find('input').val('未知');
					$('.yxItem').eq(1).find('input').val(obj['phone']);
					$('.yxItem').eq(2).find('input').val(obj['name']);
					$('.yxItem').eq(3).find('input').val(obj['age']);
					$('.yxItem').eq(4).find('select').val('其他方式');
					$('.yxItem').eq(5).find('select').val('未知');
					$('.yxItem').eq(6).find('select').val(obj['type']);
					$('.yxItem').eq(7).find('select').val('网站表单');
					$('.yxItem').eq(8).find('select').val('新学员咨询');
					$('.yxItem').eq(9).find('textarea').val(window.location.href);
					console.log($(".btn-primary"))
					$(".btn-primary").trigger('click');
					getByClassName('error')[i].innerHTML = '';
//					
//					getById('customerName').value = obj['name'];
//					getById('contactPhone').value = obj['phone'];
//					getById('yearOld').value = obj['age'];
//					getById('graduateLevel').value = obj['level'];
//					getById('methodListon').value = obj['learning_type'];
//					getById('formType').value = obj['type'];
//					$submitForm.click();
//					subAjax(options);
				} else {
					getByClassName('error')[i].innerHTML = '请输入正确的手机号码！';
					 if(document.all){
					 	e.cancelBubble=true;
					 }
					 else{
					 	e.stopPropagation();
					 }
					
				}
			})
		})(i)
	};
	/*在线入学测试表单提交--结束*/
	
	/*手机号码输入框绑定事件--开始*/
	var $phones = getByClassName('phoneNumber');
	for(var i = 0; i < $phones.length; i++) {
		(function(i){
			addEvent($phones[i], 'focus', function() {
				getByClassName('error')[i].innerHTML = '';
			})
			addEvent($phones[i], 'blur', function(e) {
				if(isPhoneNo(e.target.value)) {
					getByClassName('error')[i].innerHTML = '';
				} else {
					getByClassName('error')[i].innerHTML = '请输入正确的手机号码！';
				}
			})
		})(i)
	}
	/*手机号码输入框绑定事件--结束*/
	
	var msgTitle = getByClassName('msgtitle')[0];
	var inforTain = getByClassName('infortain')[0];

	function chanInfor(msgInf, msg) {
		msgTitle.innerText = msgInf;
		inforTain.innerText = msg;
	};
	
	/*数据提交--开始*/
	function subAjax(flage) {
		Ajax.post({
			url: api.groundpage,
			data: flage,
			success: function(res) {
				var res = JSON.parse(res);
				if(res.code == 0) {
					chanInfor('提交成功', res.msg);
					showbox(true);
				} else if(res.code == 407) {
					chanInfor('提交成功', res.msg.msg);
					showbox(true)
				} else {
					chanInfor('提交失败', res.msg);
					showbox(true)
				}
			},
			error: function() {
				alert('接口报错！')
			}
		});
	};
	/*ajax发送请求--结束*/
	
	/*小能聊天绑定事件--开始*/
	var $chats = getByClassName('wechat');
	for(var i = 0; i < $chats.length; i++) {
		addEvent($chats[i], 'click', function() {
			//_MEIQIA('showPanel');
			//NTKF.im_openInPageChat('kf_10225_1526297888027');
			var offset = document.getElementById('giftForm').offsetTop ;
			console.log(offset)
			window.scrollTo(0,offset);
		})
	}
	/*小能聊天绑定事件--结束*/
	
	/*上下滚动效果--开始*/
	function scroll(ele){
		var height = ele.children[0].offsetHeight;
		var num = 0;
		var timer = setInterval(function(){
			ele.style.top = (num--) + 'px';
			if(num <= -height){
				ele.style.top = "0px";
				ele.appendChild(ele.children[0]);
				clearInterval(timer);
				
				setTimeout(function(){
					
					scroll(ele)
					
				},2000)
				
			}
		},50)
	}
	var $scrBtm = getById("scrBtm");
	var $scrAsk = getById("scrAsk");
	var $scrTry = getById("scrTry");
	scroll($scrBtm);
	scroll($scrAsk);
	scroll($scrTry);
	/*上下滚动效果--结束*/
	$.getScript("http://crm.yunduocrm.com/resources/js/outer/yxutils.js", function() {
		YxUtils.init("#yxmg_5c8f7bf23947445a5dbfd8c8");
	});
}
