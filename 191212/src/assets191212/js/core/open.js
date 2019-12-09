/**
 * Created by HSP on 2018/7/27.
 */
$.extend({
	//获取地址栏参数
	getParam: function(name) {
		var search = document.location.search;
		var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
		var matcher = pattern.exec(search);
		var items = null;
		if(null != matcher) {
			try {
				items = decodeURIComponent(decodeURIComponent(matcher[1]));
			} catch(e) {
				try {
					items = decodeURIComponent(matcher[1]);
				} catch(e) {
					items = matcher[1];
				}
			}
		}
		return items;
	},
	//ajax方法封装
	sendReq: function(url, type, data, success,error) {
		$.ajax({
			url: url + '?time=' + new Date().getTime(),
			type: type,
			asasync:false,
			dataType: 'json',
			data: data,
			success: function(data) {
				success(data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				error ? error() : '';
				var $errTip = $('.error-close');
				var $Infor = $errTip.find('.infor');
				$Infor.html('网络请求超时！');
				$errTip.css('margin-left', 0+'px')
				var wid = parseInt($errTip.outerWidth(true)/2);
				$errTip.css('margin-left', -wid+'px');
				$errTip.slideDown();
				var timer = setTimeout(function(){
					$errTip.fadeOut();
					clearTimeout(timer);
				},1000);
			}
		})
	},
	//存储数据(采用cookie存储)
	addCookie: function(name, value, time,path) {
        if(time && path){
            var strsec = time * 1000;
            var exp = new Date();
            exp.setTime(exp.getTime() + strsec * 1);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path="+path;
        }else if(time){
            var strsec = time * 1000;
            var exp = new Date();
            exp.setTime(exp.getTime() + strsec * 1);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        }else if(path){
            document.cookie = name + "=" + escape(value) + ";path="+path;
        }else{
            document.cookie = name + "=" + escape(value);
        }
    },
	getCookie: function(objName) { //获取指定名称的cookie的值
		var arr,reg = new RegExp("(^| )" + objName + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)){
            return unescape(arr[2]);
        }else{
            return null;
        }
	},
	delCookie: function(name) { //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
		var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        // 这里需要判断一下cookie是否存在
        var c = getCookie(name);
        if (c != null){
            document.cookie = name + "=" + c + ";expires=" + exp.toGMTString();
        }
	},
    setStorage: function(key, value) {
        var data = {
            value: value
        };
        localStorage[key] = encodeURIComponent(JSON.stringify(data));
    },
    getStorage: function(key) {
        var data = localStorage[key];
       	var items = null;
        if (!data || data === "null") {
            return null;
        }
        try {
				items = decodeURIComponent(decodeURIComponent(data));
			} catch(e) {
				try {
					items = decodeURIComponent(data);
				} catch(e) {
					items = data;
				}
			}
        return JSON.parse(items).value;
    },
    removeLocalStorage: function(key){
        localStorage.removeItem(key);
    },
    setSession: function(key, value) {
        var data = {
            value: value
        };
        sessionStorage[key] = encodeURIComponent(JSON.stringify(data));
    },
    getSession: function(key) {
        var data = sessionStorage[key];
        var items = null;
        if (!data || data === "null") {
            return null;
        }
	     try {
				items = decodeURIComponent(decodeURIComponent(data));
			} catch(e) {
				try {
					items = decodeURIComponent(data);
				} catch(e) {
					items = data;
				}
			}
        return JSON.parse(items).value;
    },
    removeSessionStorage: function(key){
        sessionStorage.removeItem(key);
    },
	//图片懒加载初始化
	lazyImg:function(flag) {
		$("img." + flag).lazyload({
			placeholder: "../assets191212/img/logoBd.svg",
			effect: "fadeIn",
			threshold: 200,
		});
	}
})