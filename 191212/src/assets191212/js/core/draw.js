/*抽奖-开始*/
const getInfor = require('./getInfor.js');
const login = require('./login.js');
const showErrorTip = require('./errorTip');
const singularTip = require('./singularTip');
const awardTip = require('./awardTip.js');
const myPrice = require('./myPrice.js');
const changeLogin = require('./changeLogin.js');
const lattery = require('./lattery.js');
let isClick = true;

let result = (priceNum,prizeTitle) =>{
	const rotateAngle = lattery(priceNum);
	$('#latteryHeart').rotate({
		duration: 7000,
	    animateTo: rotateAngle, 
	    callback: ()=>{
	    	if(parseInt(priceNum) >= 1 && parseInt(priceNum) <= 4){
	    		awardTip(priceNum,prizeTitle);
	    		myPrice();
	    	}else{
	    		singularTip(`<dt class="sorry"><img src="./assets191212/img/cry.png" alt="" /></dt><dd>哎呀太遗憾了，你和奖品仅差0.1厘米~</dd>`);
	    	}
	    	isClick = true;
	    }
	});
};

let commonprize =() =>{
	isClick = false;
	$.ajax({
		url:'/api/activity/commonprize',
		type: 'post',
		data:{
			user_sign:getInfor(),
			ac_id:22,
			platform:1
		},
		dataType: 'json',
		timeout:10*1000,
		success:(res)=>{
			isClick = true;
			const {code,data,msg} = res;
			if(code == 0){ //正常抽奖
				isClick = false;
				const { prize_degree,prize_title } = data;
				result(prize_degree ? prize_degree.toString() : '',prize_title);
			}else if(code == 400001684){//哎呀太遗憾了，你和奖品仅差0.1厘米~
				result('5');
			}else if(code == 400001681){//活动正在准备中，请耐心等待活动开始
				singularTip(`<dt>${msg}</dt>`);
			}else if(code == 400001916){//非常抱歉，您的首期学费未缴纳完全，请补全首期学费后再来参与抽奖哦~
//				singularTip(`<dt>非常抱歉，您的首期学费未缴纳完全,请</dd><dd>补全首期学费后再来参与抽奖哦~</dd>`);
				singularTip(`<dt>非常抱歉，您只缴纳了定金，</dd><dd>请补全首期学费后再来参与抽奖哦~</dd>`);
			}
			else if(code == 400001914){ //未在规定日期内缴费的情况
				singularTip(`<dt>非常抱歉，本活动仅限</dt><dd>${$.trim($("#ruleDate").text()) || '2019年12月11日-12月13日'}期间</dd><dd>报名并缴纳首期学费的学员参与哦~</dd>`);
			}else if(code == 400001646){//您已经获得过奖品啦！不可重复抽奖哦~
				singularTip(`<dt>您已经成功参加了抽奖活动，</dt><dd>请不要重复提交信息了哦！</dd>`);
			}else if(code == 400001649){//您的点击速度太快啦，歇会儿再来吧~
				singularTip(`<dt>${msg}</dt>`);
			}else if(code == 400001917){//本活动仅限在官网报名或者在学习中心扫码报名的学员参与哦~
//				singularTip(`<dt>本活动仅限在官网报名或者</dt><dd>在学习中心扫码报名的学员参与哦~</dd>`);
				singularTip(`<dt>系统检测到您未通过官网</dt><dd>或者学习中心老师二维码扫码</dd><dd>进行报名缴费,所以不可参与抽奖哦~</dd>`);
			}else if(code == 400001680){//活动已结束
				singularTip(`<dt>${msg}</dt>`);
			}else if(code == 400001653){//在籍学员不可参与本活动哦！更多活动敬请期待~
				singularTip(`<dt>在籍学员不可参与本活动哦！</dt><dd>更多活动敬请期待~</dd>`);
			}
			else if(code == 400001919){//您已经参与过别的优惠活动啦
				singularTip(`<dt>您已经参与过别的优惠活动啦,</dt><dd>抽奖活动与其他优惠活动不可同时参加哦~</dd>`);
			}
			else if(code == 400001306){
				$.removeLocalStorage('infor');
				changeLogin();
				showErrorTip(msg);
				login();
				$("div#hideEvent")
				.off('click')
				.one('click',()=>{
					commonprize();
				});
			}
			else{
				singularTip(`<dt>${msg}</dt>`);
			}
		},
		error:(err)=>{
			isClick = true;
			singularTip('<dt><span class="iconfont error-icon">&#xe724;</span>服务器正在开小差，请稍后再试</dt>');
		}
	});
};

$('body').on('click','#lattery .point',(event)=>{
	const textVal =  $(event.target).text();
	if(textVal.indexOf('查看奖品') > -1){
		$(window).scrollTop($('#myPrice').offset().top);
		return false;
	}
	if(!isClick){
		return false;
	}
	const userSign = getInfor();
	if(userSign){
		commonprize();
	}else{
		login();
		$("div#hideEvent")
		.off('click')
		.one('click',()=>{
			commonprize();
		});
	}
});
/*抽奖-结束*/
