import "./index.scss";
import "../core/header.scss";

// banner
import "../core/banner.scss";

// 学历区别
import "../core/between.scss";

// 高校优惠信息
import "../core/universities.scss";

// 本科高新专业
import "../core/highnew.scss";

// 远程教育
import "../core/remote.scss";

// 常见问题
import "../core/question.scss";

// 备案信息
import "../core/footer.scss";

window.onload = function() {

    /*本科高薪专业选项卡--开始*/ 
    var nav = document.getElementById('nav');
    var oNav = nav.getElementsByTagName('li');

    var container = document.getElementById('container');
    var oDiv = container.getElementsByClassName('tab');
    for (var i = 0; i < oNav.length; i++) {
        oNav[i].index = i;
        oNav[i].onclick = function() {
            for (var i = 0; i < oNav.length; i++) {
                oNav[i].className = '';
                oDiv[i].style.display = "none";
            }
            this.className = 'act';
            oDiv[this.index].style.display = "block"
        }
        for (var m = 1; m < oNav.length; m++) {
            oNav[m].className = '';
            oDiv[m].style.display = "none";
        }
    }
    /*本科高薪专业选项卡--结束*/ 
	
	/*院校标题链接--开始*/
	var $name = document.getElementsByClassName('name');
	for(let i = 0; i < $name.length; i++) {
		$name[i].onclick=function() {
			switch(i){
				case 0:
					window.open("http://www.open.com.cn/major/?u=10141&l=3","_blank");
					break;
				case 1:
					window.open("http://www.open.com.cn/major/?u=10145&l=3","_blank");
					break;
				case 2:
					window.open("http://www.open.com.cn/major/?u=10613&l=3","_blank");
					break;
				case 3:
					window.open("http://www.open.com.cn/major/?u=21414&l=3","_blank");
					break;
				case 4:
					window.open("http://www.open.com.cn/major/?u=10002&l=3","_blank");
					break;
				case 5:
					window.open("http://www.open.com.cn/major/?u=11901&l=3","_blank");
					break;
				case 6:
					window.open("http://www.open.com.cn/major/?u=10730&l=3","_blank");
					break;
				case 7:
					window.open("http://www.open.com.cn/major/?u=10698&l=3","_blank");
					break;
				case 8:
					window.open("http://www.open.com.cn/major/?u=10032&l=3","_blank");
					break;
				case 9:
					window.open("http://www.open.com.cn/major/?u=10030&l=3","_blank");
					break;
				case 10:
					window.open("http://www.open.com.cn/major/?u=10200&l=3","_blank");
					break;
				case 11:
					window.open("http://www.open.com.cn/major/?u=10394&l=3","_blank");
					break;
				case 12:
					window.open("http://www.open.com.cn/major/?u=10173&l=3","_blank");
					break;
			}
			
		}
	}
	/*院校标题链接--结束*/

    /*小能聊天绑定事件--开始*/
    var $chats = document.getElementsByClassName('wechat');
    for(var i = 0; i < $chats.length; i++) {
        $chats[i].onclick=function() {
            _MEIQIA('showPanel');
        }
    }
    var $chats1 = document.getElementsByClassName('ziXun');
    for(var i = 0; i < $chats1.length; i++) {
        $chats1[i].onclick=function() {
            _MEIQIA('showPanel');
        }
    }
    /*小能聊天绑定事件--结束*/
	
	/*更多专业点击事件--开始*/
	var $bigbtn = document.getElementsByClassName('bigbtn');
	for(let i = 0; i < $bigbtn.length; i++) {
		$bigbtn[i].onclick=function() {
			switch(i){
				case 0:
					window.open("http://www.open.com.cn/major/?b=1&l=3","_blank");
					break;
				case 1:
					window.open("http://www.open.com.cn/major/?b=4&l=3","_blank");
					break;
				case 2:
					window.open("http://www.open.com.cn/major/?b=7&l=3","_blank");
					break;
				case 3:
					window.open("http://www.open.com.cn/major/?b=3&l=3","_blank");
					break;
				case 4:
					window.open("http://www.open.com.cn/major/?b=14&l=3","_blank");
					break;
				case 5:
					window.open("http://www.open.com.cn/major/?b=2&l=3","_blank");
					break;
			}
			
		}
	}
	/*更多专业点击事件--结束*/
};
