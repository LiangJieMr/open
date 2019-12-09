var timer = null;
var scrollBar = function (ele){
		if(timer){
			clearInterval(timer);
		}
		var children = ele.children;
		if(children.length == 0 || children.length == 1){
			return false;
		}
		var height = children[0].offsetHeight;
		var num = 0;
		timer = setInterval(function(){
			ele.style.top = (num--) + 'px';
			if(num <= -height){
				ele.style.top = "0px";
				ele.appendChild(ele.children[0]);
				scrollBar(ele);
//				setTimeout(function(){
//					scrollBar(ele)
//				},2000)
			}
		},50)
	}
module.exports = scrollBar;