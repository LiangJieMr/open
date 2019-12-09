$(function(){

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

	/*提交表单开始*/
	//手机号提交
	$(".phoneNumber").bind("input",function(event){
		$('#contactPhone').val($(this).val())
	});
	//姓名提交
	$(".userName").bind("input",function(event){
		$('#customerName').val($(this).val())
	});
	//学历提交
	$(".level-0").bind("change",function(event){
		$("select[name='fc_1840']").val($(this).val())
	});
	//提升学历目的
	$(".muDi").bind("change",function(event){
		$("select[name='fc_1849']").val($(this).val())
		console.log($("select[name='fc_1849']").val())
	});
	/*提交表单结束*/

	/*上下滚动效果--开始*/
		var speed = 30
		var tab = document.getElementById("demo");
		var tab1 = document.getElementById("demo1");
		var tab2 = document.getElementById("demo2");

		tab2.innerHTML = tab1.innerHTML;
		tab.scrollTop = tab1.offsetHeight;
		function Marquee(){
		    if (tab.scrollTop >= tab1.offsetHeight) {
		        tab.scrollTop-=tab2.offsetHeight;
		    }else{
		        tab.scrollTop+=1;
		    }
		}
		var MyMar=setInterval(Marquee,speed);
		/*上下滚动效果--开始*/

	/*底部常驻条--开始*/
	$('#article_clo').click(function(){
		$('#article').css({'display':'none'});
		$('#gif').css({'display':'block'})
	})
	$('#gif').click(function(){
		$(this).css({'display':'none'});
		$('#article').css({'display':'block'})
	})
	/*底部常驻条--结束*/


	/*怀才不遇模块开始*/
	$('.ta_list_p').mouseover(function(){
		$(this).siblings().fadeIn()
	})
	/*怀才不遇模块结束*/

	/*判断焦点进出文字状态开始*/
	$('#xingMing').on("blur focus",function(){
		if($(this).is(":focus")){
			if($(this).val() == '请输入姓名'){
				$(this).val('')
			}
		}else{
			if($(this).val() == ''){
				$(this).val('请输入姓名')
			}
		}
	})
	$('#haoMa').on("blur focus",function(){
		if($(this).is(":focus")){
			if($(this).val() == '请输入手机号'){
				$(this).val('')
			}
		}else{
			if($(this).val() == ''){
				$(this).val('请输入手机号')
			}
		}
	})
	/*判断焦点进出文字状态开始*/

	/*判断输入框焦点状态开始*/
	var tcc = null;
	var ttc = null;
	$("input[type='text']").on("blur focus",function(){
		if($(this).is(":focus")){
			clearTimeout(ttc)
			clearInterval(tcc);
		}else{
			tcc = setInterval(ct,30000)
		}
	})
	/*判断输入框焦点状态结束*/

	/*弹出层45秒弹出一次开始*/
	function tc(){
		$('#ce').css({'display':'block'});
		tcc = setInterval(ct,30000)
	}
	ttc =setTimeout(tc,45000)
	function ct() {
		$('.ff')[0].reset();
		$('#ce').css({'display':'block'});
	}
	/*弹出层45秒弹出一次结束*/

	/*弹出层方法封装--开始*/
	function showbox(flag) {
		if(flag) {
			$('#ce').css({'display':'block'});
		} else {
			$('#ce').css({'display':'none'});
		}
	}
	$('#maskClo').click(function(){
		showbox(false);
	})
	/*弹出层方法封装--结束*/


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

	/*在线入学测试表单提交--开始*/
	var onlinesubmit = getByClassName('form-submit');
	for(var i = 0; i < onlinesubmit.length; i++) {
		(function(i) {
			addEvent(onlinesubmit[i], 'click', function(e) {
				if(i == 0){
					$('select[name="fc_1841"]').val('表单一')
				}else if(i == 1){
					$('select[name="fc_1841"]').val('表单二')
					$("select[name='fc_1840']").val('')
				}else if(i == 2){
					$('select[name="fc_1841"]').val('表单三')
				}

//				alert('提交')
				var options = formdata(i);
				if(isPhoneNo(options.phone)) {
					var obj = formdata(i);
					// $('.yxItem').eq(0).find('input').val('未知');
					// $('.yxItem').eq(1).find('input').val(obj['phone']);
					// $('.yxItem').eq(2).find('input').val(obj['name']);
					// $('.yxItem').eq(3).find('input').val(obj['age']);
					// $('.yxItem').eq(4).find('select').val('其他方式');
					// $('.yxItem').eq(5).find('select').val('未知');
					// $('.yxItem').eq(6).find('select').val(obj['type']);
					// $('.yxItem').eq(7).find('select').val('网站表单');
					// $('.yxItem').eq(8).find('select').val('新学员咨询');
					// $('.yxItem').eq(9).find('textarea').val(window.location.href);
					// $('.yxItem').eq(10).find('textarea').val(obj['city']);
					$(".btn-primary").trigger('click');
					getByClassName('error')[i].innerHTML = '';
					// console.log($('select[name="fc_1841"]').val())
					// console.log($("select[name='fc_1840']").val())
//					getById('customerName').value = obj['name'];
//					getById('contactPhone').value = obj['phone'];
//					getById('yearOld').value = obj['age'];
//					getById('graduateLevel').value = obj['level'];
//					getById('methodListon').value = obj['learning_type'];
//					getById('formType').value = obj['type'];
//					$submitForm.click();
					// subAjax(options);
				} else {
					getByClassName('error')[i].innerHTML = '*请输入正确的手机格式';
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
					getByClassName('error')[i].innerHTML = '*请输入正确的手机格式';
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
				// console.log(res)
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
			_MEIQIA('showPanel');
//			NTKF.im_openInPageChat('kf_10225_1526297888027');
		})
	}
	/*小能聊天绑定事件--结束*/

	/*下拉框开始*/
	 $('.sel').mouseover(function(){
		$(this).children(".sel-ul").stop().slideDown();
	 }).mouseout(function(){
	 	$('.sel-ul').stop().slideUp(50);
	 })
	 $('.sel-ul li').mouseover(function(){
		 $(this).addClass('sel-current')
	 }).mouseout(function(){
		 $(this).removeClass('sel-current')
	 })
	/*下拉框结束*/


	/*banner开始*/


	//轮播图
	        var img=$(".img_box .lun");
	        var li=$(".ul5 li");
	        var divW=$(".img_box").width();
	        var len=$(".img_box .lun").length;
	        img.css("left",divW);
	        img.eq(0).css("left",0);
	        li.eq(0).css("background","#bf5050");
	        var index=0;
	        var next=0;
	        function show(){
	            next++;
	            if(next==len){
	                next=0;
	            }
	            img.eq(next).css("left",divW);
	            img.eq(index).animate({"left":-divW});
	            img.eq(next).animate({"left":0});
	            li.eq(next).css("background","#bf5050");
	            li.eq(index).css("background","transparent");
				index=next;
	        }
	        t=setInterval(show,7000);
	        function show1(){
	            next--;
	            if(next==-1){
	                next=len-1;
	            }
	            img.eq(next).css("left",-divW);
	            img.eq(index).animate({"left":divW});
	            img.eq(next).animate({"left":0});
	            li.eq(next).css("background","#bf5050");
	            li.eq(index).css("background","transparent");
	            index=next;
	        }
	        $('.banner').hover(function(){
	            clearInterval(t);
	        },function(){
	            t=setInterval(show,7000);
	        })

			var a = true;

	        //左右按钮
	        $(".d2").mousedown(function(){
				if(a){
					a = false
					show();
					setTimeout(function(){
						a = true
					}, 700);
				}
			})
			$(".d1").mousedown(function(){
				if(a){
					a = false
					show1();
					setTimeout(function(){
						a = true
					}, 700);
				}
			})
	        //小白点 点击
	        li.mousedown(function(){
	            num=$(this).index();
	            if(num==next){
	                return;
	            }else if(num<next){
	                clearInterval(t);
	                img.eq(num).css("left",-divW);
	                    img.eq(index).animate({"left":divW});
	                    img.eq(num).animate({"left":0});
	                    li.eq(num).css("background","#bf5050");
	                    li.eq(index).css("background","transparent");
	                    index=num;
	                    next=num;
	            }else if(num>next){
	                clearInterval(t);
	                    img.eq(num).css("left",divW);
	                    img.eq(index).animate({"left":-divW});
	                    img.eq(num).animate({"left":0});
	                    li.eq(num).css("background","#bf5050");
	                    li.eq(index).css("background","transparent");
	                    index=num;
	                    next=num;
	            }
	    })
	                li.mouseup(function(){
	                    t=setInterval(show,7000);
	            })
	/*banner结束*/

	/* 重点院校详情开始*/
	$('.fz').mouseover(function() {
		$(this).siblings().removeClass('btn_c');//方法2
		$(this).addClass('btn_c');
	})
	/*重点院校详情结束*/

	/*院校轮播开始*/
	$('div.pro_box').hover(function() {
		$(this).toggleClass('pro_box_hover')
	});
//c的值为每次滚动数
	var slideContainer = $('#slideContainer'), c = 1, s_w = 150 * c, counts_l = 0, counts_r = 0, maxCounts = slideContainer.find('li').size() - 0, gameOver = true, slideCounts = 7, sTimer;
	$('#link_prev').on('click', function() {
		clearInterval(sTimer);
		if (gameOver) {
			gameOver = false;
			counts_l++;
			slideContainer.animate({
				left: '+=' + s_w
			}, 500, function() {
				gameOver = true;
				slideContainer.animate({
					left: '-=' + s_w
				}, 0);
				var html = '';
				slideContainer.find('li:gt(' + (maxCounts - c - 1) + ')').each(function() {
					html += '<li>' + $(this).html() + '</li>';
				});
				slideContainer.find('li:gt(' + (maxCounts - c - 1) + ')').remove();
				slideContainer.html(html + slideContainer.html());
			});
		}
	});
	$('#link_next').on('click', function() {
		clearInterval(sTimer);
		link_next_event();
	});

	function link_next_event() {
		if (gameOver) {
			gameOver = false;
			counts_r++;
			slideContainer.animate({
				left: '-=' + s_w
			}, 500, function() {
				gameOver = true;
				slideContainer.animate({
					left: '+=' + s_w
				}, 0);
				slideContainer.find('li:lt(' + c + ')').clone().appendTo(slideContainer);
				slideContainer.find('li:lt(' + c + ')').remove();
			});
		}
	}

	lastCLiHtml();
	slideContainer.find('li:gt(' + (maxCounts - 1) + ')').remove();
	function lastCLiHtml() {
		var html = '';
		slideContainer.find('li:gt(' + (maxCounts - c - 1) + ')').each(function() {
			html += '<li>' + $(this).html() + '</li>';
		});
		slideContainer.html(html + slideContainer.html()).css({
			'margin-left': 0 + 'px'
		});
	}

	var l_hover = false, m_hover = false, r_hover = false;
	$('#links').on({
		'mouseover': function() {
			m_hover = true;
			clearInterval(sTimer);
		},
		'mouseout': function() {
			m_hover = false;
			isStartGo();
		}
	});

	$('#link_next, #link_prev').on('mouseout', function() {
		l_hover = false;
		r_hover = false;
		isStartGo();
	})
	$('#link_next, #link_prev').on('mouseover', function() {
		l_hover = true;
		r_hover = true;
		clearInterval(sTimer);
	})
	setInverterTimer();
	function setInverterTimer() {
		clearInterval(sTimer);
		sTimer = setInterval(function() {
			link_next_event();
		}, 2000);
	}

	function isStartGo() {
		var st = setTimeout(function() {
			if (!l_hover && !m_hover && !r_hover) {
				setInverterTimer();
			}
		}, 1000);
	}


	/*院校轮播结束*/



	/* 学习中心地图开始*/
	// 金额转换万字单位 start
	function unitConvert(num) {
		if (num) {
			var moneyUnits = ["", "万"],
				dividend = 10000,
				curentNum = num, //转换数字
				curentUnit = moneyUnits[0]; //转换单位
			for (var i = 0; i < 2; i++) {
				curentUnit = moneyUnits[i];
				if (strNumSize(curentNum) < 5) {
					return num;
				}
			}
			curentNum = curentNum / dividend;
			var m = {
				num: 0,
				unit: ""
			}
			m.num = curentNum.toFixed(2);
			m.unit = curentUnit;
			return m.num + m.unit;
		}
	}

	function strNumSize(tempNum) {
		var stringNum = tempNum.toString()
		var index = stringNum.indexOf(".")
		var newNum = stringNum
		if (index != -1) {
			newNum = stringNum.substring(0, index)
		}
		return newNum.length;
	}
	// 金额转换万字单位 end
	var myChart = echarts.init(document.getElementById('china-map'));
	var oBack = document.getElementById("back");

	var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];
	var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];
	// 全国省份数据
	var toolTipData = [{
		"provinceName": "北京",
		"provinceKey": 110000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 18,
		"totalPrice": 860448.7,
		"orderCount": 31744,
		"onlineCount": 0
	}, {
		"provinceName": "天津",
		"provinceKey": 120000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 19,
		"totalPrice": 697438.3,
		"orderCount": 30025,
		"onlineCount": 0
	}, {
		"provinceName": "河北",
		"provinceKey": 130000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 74,
		"totalPrice": 1051461.5,
		"orderCount": 50625,
		"onlineCount": 0
	}, {
		"provinceName": "山西",
		"provinceKey": 140000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 31,
		"totalPrice": 432680.2,
		"orderCount": 20427,
		"onlineCount": 0
	}, {
		"provinceName": "内蒙古",
		"provinceKey": 150000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 25,
		"totalPrice": 379952.5,
		"orderCount": 14585,
		"onlineCount": 0
	}, {
		"provinceName": "辽宁",
		"provinceKey": 210000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 74,
		"totalPrice": 543290.6,
		"orderCount": 27143,
		"onlineCount": 0
	}, {
		"provinceName": "吉林",
		"provinceKey": 220000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 31,
		"totalPrice": 234353.7,
		"orderCount": 11123,
		"onlineCount": 0
	}, {
		"provinceName": "黑龙江",
		"provinceKey": 230000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 30,
		"totalPrice": 152894.8,
		"orderCount": 6481,
		"onlineCount": 0
	}, {
		"provinceName": "上海",
		"provinceKey": 310000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 22,
		"totalPrice": 665877.5,
		"orderCount": 26753,
		"onlineCount": 0
	}, {
		"provinceName": "江苏",
		"provinceKey": 320000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 13,
		"totalPrice": 3302139.4,
		"orderCount": 158180,
		"onlineCount": 0
	}, {
		"provinceName": "浙江",
		"provinceKey": 330000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 103,
		"totalPrice": 2285259.3,
		"orderCount": 116344,
		"onlineCount": 0
	}, {
		"provinceName": "安徽",
		"provinceKey": 340000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 57,
		"totalPrice": 1081322.1,
		"orderCount": 57139,
		"onlineCount": 0
	}, {
		"provinceName": "福建",
		"provinceKey": 350000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 57,
		"totalPrice": 1352019.8,
		"orderCount": 65228,
		"onlineCount": 0
	}, {
		"provinceName": "江西",
		"provinceKey": 360000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 36,
		"totalPrice": 689353.7,
		"orderCount": 31822,
		"onlineCount": 0
	}, {
		"provinceName": "山东",
		"provinceKey": 370000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 59,
		"totalPrice": 1177320.9,
		"orderCount": 59966,
		"onlineCount": 0
	}, {
		"provinceName": "河南",
		"provinceKey": 410000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 65,
		"totalPrice": 953710.6,
		"orderCount": 52829,
		"onlineCount": 0
	}, {
		"provinceName": "湖北",
		"provinceKey": 420000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 34,
		"totalPrice": 890921.4,
		"orderCount": 46768,
		"onlineCount": 0
	}, {
		"provinceName": "湖南",
		"provinceKey": 430000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 43,
		"totalPrice": 1007182.7,
		"orderCount": 44094,
		"onlineCount": 0
	}, {
		"provinceName": "广东",
		"provinceKey": 440000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 114,
		"totalPrice": 3792306.1,
		"orderCount": 165774,
		"onlineCount": 0
	}, {
		"provinceName": "广西",
		"provinceKey": 450000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 38,
		"totalPrice": 1252955,
		"orderCount": 69882,
		"onlineCount": 0
	}, {
		"provinceName": "海南",
		"provinceKey": 460000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 6,
		"totalPrice": 617514,
		"orderCount": 33090,
		"onlineCount": 0
	}, {
		"provinceName": "重庆",
		"provinceKey": 500000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 46,
		"totalPrice": 468892.6,
		"orderCount": 20163,
		"onlineCount": 0
	}, {
		"provinceName": "四川",
		"provinceKey": 510000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 85,
		"totalPrice": 793622.7,
		"orderCount": 43625,
		"onlineCount": 0
	}, {
		"provinceName": "贵州",
		"provinceKey": 520000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 45,
		"totalPrice": 659747.2,
		"orderCount": 28817,
		"onlineCount": 0
	}, {
		"provinceName": "云南",
		"provinceKey": 530000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 50,
		"totalPrice": 657485.2,
		"orderCount": 30916,
		"onlineCount": 0
	}, {
		"provinceName": "西藏",
		"provinceKey": 540000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 1,
		"totalPrice": 106922.4,
		"orderCount": 2470,
		"onlineCount": 0
	}, {
		"provinceName": "陕西",
		"provinceKey": 610000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 46,
		"totalPrice": 589961.2,
		"orderCount": 27093,
		"onlineCount": 0
	}, {
		"provinceName": "甘肃",
		"provinceKey": 620000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 32,
		"totalPrice": 248209.2,
		"orderCount": 12390,
		"onlineCount": 0
	}, {
		"provinceName": "青海",
		"provinceKey": 630000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 2,
		"totalPrice": 33328.1,
		"orderCount": 1161,
		"onlineCount": 0
	}, {
		"provinceName": "宁夏",
		"provinceKey": 640000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 12,
		"totalPrice": 146590.7,
		"orderCount": 5240,
		"onlineCount": 0
	}, {
		"provinceName": "新疆",
		"provinceKey": 650000,
		"cityName": null,
		"cityKey": null,
		"shopCount": 43,
		"totalPrice": 294423.4,
		"orderCount": 11741,
		"onlineCount": 0
	}]
	var seriesData = [];
	for (var i = 0; i < toolTipData.length; i++) {
		seriesData[i] = {};
		seriesData[i].name = toolTipData[i].provinceName;
		seriesData[i].value = toolTipData[i].shopCount;
		seriesData[i].provinceKey = toolTipData[i].provinceKey;
	}
	// 请求省市数据，传递provinceKey进行ajax请求 province(key)
	var provinceData = [{
		"provinceName": null,
		"provinceKey": null,
		"cityName": "乌鲁木齐市",
		"cityKey": 650100,
		"shopCount": 17,
		"totalPrice": 89429.1,
		"orderCount": 4019,
		"onlineCount": 0
	}, {
		"provinceName": null,
		"provinceKey": null,
		"cityName": "克拉玛依市",
		"cityKey": 650200,
		"shopCount": 1,
		"totalPrice": 363.6,
		"orderCount": 17,
		"onlineCount": 0
	}, {
		"provinceName": null,
		"provinceKey": null,
		"cityName": "昌吉回族自治州",
		"cityKey": 652300,
		"shopCount": 3,
		"totalPrice": 2203.7,
		"orderCount": 82,
		"onlineCount": 0
	}, {
		"provinceName": null,
		"provinceKey": null,
		"cityName": "博尔塔拉蒙古自治州",
		"cityKey": 652700,
		"shopCount": 1,
		"totalPrice": 7327.7,
		"orderCount": 236,
		"onlineCount": 0
	}, {
		"provinceName": null,
		"provinceKey": null,
		"cityName": "巴音郭楞蒙古自治州",
		"cityKey": 652800,
		"shopCount": 2,
		"totalPrice": 28768.4,
		"orderCount": 961,
		"onlineCount": 0
	}, {
		"provinceName": null,
		"provinceKey": null,
		"cityName": "阿克苏地区",
		"cityKey": 652900,
		"shopCount": 5,
		"totalPrice": 78415.2,
		"orderCount": 3108,
		"onlineCount": 0
	}, {
		"provinceName": null,
		"provinceKey": null,
		"cityName": "喀什地区",
		"cityKey": 653100,
		"shopCount": 4,
		"totalPrice": 38870.1,
		"orderCount": 1477,
		"onlineCount": 0
	}, {
		"provinceName": null,
		"provinceKey": null,
		"cityName": "和田地区",
		"cityKey": 653200,
		"shopCount": 1,
		"totalPrice": 10488,
		"orderCount": 218,
		"onlineCount": 0
	}, {
		"provinceName": null,
		"provinceKey": null,
		"cityName": "伊犁哈萨克自治州",
		"cityKey": 654000,
		"shopCount": 6,
		"totalPrice": 32864.2,
		"orderCount": 1363,
		"onlineCount": 0
	}, {
		"provinceName": null,
		"provinceKey": null,
		"cityName": "塔城地区",
		"cityKey": 654200,
		"shopCount": 1,
		"totalPrice": 160,
		"orderCount": 5,
		"onlineCount": 0
	}, {
		"provinceName": null,
		"provinceKey": null,
		"cityName": "省直辖行政单位",
		"cityKey": 659000,
		"shopCount": 2,
		"totalPrice": 5533.4,
		"orderCount": 255,
		"onlineCount": 0
	}];
	var seriesDataPro = [];
	for (var i = 0; i < provinceData.length; i++) {
		seriesDataPro[i] = {};
		seriesDataPro[i].name = provinceData[i].cityName;
		seriesDataPro[i].value = provinceData[i].shopCount;
	}
	var max = Math.max.apply(Math, seriesData.map(function(o) {
			return o.value
		})),
		min = 0; // 侧边最大值最小值
	var maxSize4Pin = 40,
		minSize4Pin = 30;
	var mapName = '';
	function getGeoCoordMap(name) {
		name = name ? name : 'china';
		/*获取地图数据*/
		var geoCoordMap = {};
		myChart.showLoading(); // loading start
		var mapFeatures = echarts.getMap(name).geoJson.features;
		myChart.hideLoading(); // loading end
		mapFeatures.forEach(function(v) {
			var name = v.properties.name; // 地区名称
			geoCoordMap[name] = v.properties.cp; // 地区经纬度
		});
		return geoCoordMap;
	}

	function convertData(data) { // 转换数据
		var geoCoordMap = getGeoCoordMap(mapName);
		var res = [];
		for (var i = 0; i < data.length; i++) {
			var geoCoord = geoCoordMap[data[i].name]; // 数据的名字对应的经纬度
			if (geoCoord) { // 如果数据data对应上，
				res.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].value),
				});
			}
		}
		return res;
	};
	// 初始化echarts-map

	function initEcharts(pName, Chinese_,$) {
		var tmpSeriesData = pName === "china" ? seriesData : seriesDataPro;
		var tmp = pName === "china" ? toolTipData : provinceData;
		var option = {
			title: {},
			tooltip: {
				trigger: 'item',
				formatter: function(params) { // 鼠标滑过显示的数据
					if (pName === "china") {
						var toolTiphtml = ''
						for (var i = 0; i < tmp.length; i++) {
							if (params.name == tmp[i].provinceName) {
								toolTiphtml += tmp[i].provinceName + '学习中心' + '（'+ tmp[i].shopCount + '家）';
							}
						}
						return toolTiphtml;
					} else {
						var toolTiphtml = ''
						for (var i = 0; i < tmp.length; i++) {
							if (params.name == tmp[i].cityName) {
								toolTiphtml += tmp[i].cityName + '<br>销售额：' + unitConvert(tmp[i].totalPrice) + '<br>订单数：' + tmp[i].orderCount + '单' + '<br>门店数：' + tmp[i].shopCount;
							}
						}
						return toolTiphtml;
					}
				}
			},
			visualMap: { //视觉映射组件
				show: false,
				min: min,
				max: max, // 侧边滑动的最大值，从数据中获取
				left: '5%',
				top: '96%',
				inverse: true, //是否反转 visualMap 组件
				// itemHeight:200,  //图形的高度，即长条的高度
				text: ['高', '低'], // 文本，默认为数值文本
				calculable: false, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
				seriesIndex: 1, //指定取哪个系列的数据，即哪个系列的 series.data,默认取所有系列
				orient: "horizontal",
				inRange: {
					color: ['#ebe7e8', '#ebe7e8'] ,// 蓝绿
				}
			},
			geo: {
				show: true,
				map: pName,
				roam: false,
				label: {
					normal: {
						show: false
					},
					emphasis: {
						show: false,
					}
				},
				itemStyle: {
					normal: {
						areaColor: '#3c8dbc', // 没有值得时候颜色
						borderColor: '#097bba',
					},
					emphasis: {
						areaColor: '#fbd456', // 鼠标滑过选中的颜色
					}
				}
			},
			series: [{
				name: '散点',
				type: 'scatter',
				coordinateSystem: 'geo',
				data: tmpSeriesData,
				symbolSize: '1',
				label: {
					normal: {
						show: true,
						formatter: '{b}',
						position: 'right'
					},
					emphasis: {
						show: true
					}
				},
				itemStyle: {
					normal: {
						color: '#000' // 字体颜色
					}
				}
			},
				{
					name: Chinese_ || pName,
					type: 'map',
					mapType: pName,
					roam: false, //是否开启鼠标缩放和平移漫游
					data: tmpSeriesData,
					// top: "3%",//组件距离容器的距离
					// geoIndex: 0,
					// aspectScale: 0.75,       //长宽比
					// showLegendSymbol: false, // 存在legend时显示
					selectedMode: 'single',
					label: {
						normal: {
							show: true, //显示省份标签
							textStyle: {
								color: "#000"
							} //省份标签字体颜色
						},
						emphasis: { //对应的鼠标悬浮效果
							show: true,
							textStyle: {
								color: "#323232"
							}
						}
					},
					itemStyle: {
						normal: {
							borderWidth: .5, //区域边框宽度
							borderColor: '#a97384', //区域边框颜色
							areaColor: "#a97384", //区域颜色
						},
						emphasis: {
							borderWidth: .5,
							borderColor: 'red',
							areaColor: "#ece39e",
						}
					}
				},
				{
					name: '点',
					type: 'scatter',
					coordinateSystem: 'geo',
					symbol: 'pin', //气泡
					symbolSize: function(val) {
						var a = (maxSize4Pin - minSize4Pin) / (max - min);
						var b = minSize4Pin - a * min;
						b = maxSize4Pin - a * max;
						return a * val[2] + b;
					},
					label: {
						normal: {
							show: true,
							formatter: function(params) {
								return params.data.value[2];
							},
							textStyle: {
								color: '#fff',
								fontSize: 9
							}
						}
					},
					itemStyle: {
						normal: {
							color: 'red' //标志颜色'#F62157'
						}
					},
					zlevel: 6,
					data: convertData(tmpSeriesData),
				},
			]
		};
		// 针对海南放大
		if (pName == '海南') {
			option.series[1].center = [109.844902, 19.0392];
			option.series[1].layoutCenter = ['50%', '50%'];
			option.series[1].layoutSize = "300%";
		} else { //非显示海南时，将设置的参数恢复默认值
			option.series[1].center = undefined;
			option.series[1].layoutCenter = undefined;
			option.series[1].layoutSize = undefined;
		}
		myChart.setOption(option);
		/* 响应式 */
		$(window).on('resize',function() {
			myChart.resize();
		});
	};
	initEcharts("china", "中国",$);
	// 展示对应的省
	// function showProvince(pName, Chinese_) {
	// 	//这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
	// 	loadBdScript('$' + pName + 'JS', './js/map/province/' + pName + '.js', function() {
	// 		initEcharts(Chinese_);
	// 	});
	// }
	// 加载对应的JS
	// function loadBdScript(scriptId, url, callback) {
	// 	var script = document.createElement("script");
	// 	script.type = "text/javascript";
	// 	if (script.readyState) { //IE
	// 		script.onreadystatechange = function() {
	// 			if (script.readyState === "loaded" || script.readyState === "complete") {
	// 				script.onreadystatechange = null;
	// 				callback();
	// 			}
	// 		};
	// 	} else { // Others
	// 		script.onload = function() {
	// 			callback();
	// 		};
	// 	}
	// 	script.src = url;
	// 	script.id = scriptId;
	// 	document.getElementsByTagName("head")[0].appendChild(script);
	// };
	/*学习中心地图结束*/

	/*返回顶部开始*/
	$('#goBack').click(function(){
		// 直接设置为0，是没有过渡效果的
		// document.documentElement.scrollTop = 0;
		// document.body.scrollTop = 0;

		// 4. 用定时器做返回顶部的滚动效果
		var dsj = setInterval(function(){
			var distance = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			distance -= 220;
			if(distance <= 220){
				//如果滚动的距离 <= 0 时，清除掉定时器，否则点击图标滚动到顶部后，不能往下拉，一拉就又滚动到顶部
				distance = 0;
				clearInterval(dsj);
				document.documentElement.scrollTop = distance;
			}else{
				document.documentElement.scrollTop = distance;
				document.body.scrollTop = distance;
			}
		},10);
	})

	/*返回顶部结束*/
	$.getScript("http://crm.yunduocrm.com/resources/js/outer/yxutils.js", function () {
		YxUtils.init("#yxmg_5cf643a4da726f71bd305803");
	});
})
