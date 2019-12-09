/*登陆注册开始*/
/*倒计时*/
function countDown() {
    //定义变量 d,h,m,s保存倒计时的时间  
    var d,h,m,s;
    t-= 1000;
    if (t >= 0) {  
         d = Math.floor(t/1000/60/60/24);  
         h = Math.floor(t/1000/60/60%24);  
         m = Math.floor(t/1000/60%60);  
         s = Math.floor(t/1000%60);                    
    }  else {
    	ajax(activityObj);
    	clearInterval(st);
    } 
    d = d<10? '0' + d: d || '00';
    h = h<10? '0' + h: h || '00';
    m = m<10? '0' + m: m || '00';
    s = s<10? '0' + s: s || '00';
    surplus(d, h, m, s);
}
/*获取短信验证码*/
function setTime() {
	var time = 59;
	var el = getByClassName('getcode')[0] ;
	el.disabled= 'disabled';
	el.innerText = time + '(s)';
	timer = setInterval(function() {
		time--;
		el.innerText = time + '(s)';
		if(time <= 0) {
			el.innerText = "获取验证码";
			el.disabled = false;
			clearInterval(timer);
		}
	}, 1000)
}
/*倒计时*/
/*登陆注册结束*/