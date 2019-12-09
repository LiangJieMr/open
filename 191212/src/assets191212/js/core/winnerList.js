const showErrorTip = require('./errorTip.js');
const beginRoll = require('./scrollBar.js');
module.exports = (isStart)=>{
	const $winnerList = $('#winnerList');
	if(!isStart){
		$winnerList.html(`<li class="nostart">暂未揭晓</li>`);
		beginRoll(true);
	}else{
		$.sendReq(
			'/api/activity/winnerList',
			'GET',
			{
				ac_id:22
			},
			(res)=>{
				const {code,data,msg} = res;
				if(code == 0){
					const { list } = data;
					const priceGrade = {
						'一等奖':'特等奖',
						'二等奖':'一等奖',
						'三等奖':'二等奖',
						'四等奖':'三等奖'
					};
					$winnerList.html('');
					for(let i = 0;i<list.length;i++ ){
						var priceType = list[i]['prize_grade'];
						var str = `
							<li class="clearfix">
								<i>${list[i]['phone']}</i>
								<em>获得${priceType ? priceGrade[priceType]: 'xxx'}</em>
							</li>
						`;
						$winnerList.append(str);
					}
					beginRoll();
				}
				else{
					showErrorTip(msg);
				}
			}
		)
	}
};
	
