const $priceSet = $('#priceSet');
$.sendReq(
	'/api/activity/giftList',
	'GET',
	{
		ac_id:22
	},
	(res)=>{
		const {code,data,msg} = res;
		if(code == 0){
			for(let i=0;i<data.length;i++){
				const {prize_name,prize_degree,prize_quota} = data[i];
				const $dl = $priceSet.find(`dl.gift${prize_degree}`);
				
				$dl.find('i').text(`${prize_name}`)
				$dl.find('label').text(`${prize_quota}名`)
			}
		}
		else{
			showErrorTip(msg);
		}
	}
)