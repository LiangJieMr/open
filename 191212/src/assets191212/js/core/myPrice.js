const getInfor = require('./getInfor.js');
const showErrorTip = require('./errorTip.js');
const changeLogin = require('./changeLogin.js');
const lattery = require('./lattery.js');

const $latteryPoint =$('#lattery .point');

module.exports = ()=>{
	const $myPrice = $('#myPrice');
	const $sliderPrice = $('#sliderPrice');
	const $priceBox = $myPrice.find('.box');
	
	$priceBox.html('');
	const userSign = getInfor();
	if(userSign){
		$.sendReq(
			'/api/activity/myPrize',
			'POST',
			{
				user_sign:userSign,
				ac_id:22
			},
			(res)=>{
				const {code,data,msg} = res;
				if(code == 0){
					const datas = data[0];
					if(datas){
					   const {prize_degree,prize_name,address_name,phone,address,scene_id,deliver_status} = datas;
				       const priceType = {
							'1':'特等奖',
							'2':'一等奖',
							'3':'二等奖',
							'4':'三等奖'
						}[prize_degree];
						
						const giftType = {
							'1':'1',
							'2':'11',
							'3':'01',
							'4':'10'
						}[prize_degree];
						
						const reg = /^(\d{3})\d{4}(\d{4})$/;
						
						const rotateAngle = lattery(prize_degree ? prize_degree.toString() : '');
						
						$('#latteryHeart').rotate(rotateAngle);
						
						if(!giftType) return false;
						
				        $priceBox.html(`<img class="price" src="./assets191212/img/gift${giftType}.png"/>
							<dl class="infor">
								<dt>【我的奖品】</dt>
								<dd class="type">
									${priceType}：${prize_name}
								</dd>
								<dd id="personName" data-val="${address_name}">
									姓名：${address_name}
								</dd>
								<dd id="personPhone" class="tel" data-val="${phone}">
									电话：${phone.replace(reg, "$1****$2")}
								</dd>
								<dd>
									<span>收货信息：</span>
									<em id="personAddr" class="${address ? 'has' : ''}" data-val="${address}">${address}</em>
									${deliver_status == 0 ? `<i class='repaireAddr' data-scene=${scene_id}>${address ? '修改收货信息' : '添加收货信息'}</i>` : ''}
								</dd>
							</dl>
							<p class="crossing"></p>
							<div class="attention">
								注意：奖品发货前可修改收货信息，奖品一旦发出，不可再修改发货信息，请填写准确的收货信息。
							</div>`
				        );
				        $latteryPoint.html(`<em>查看<br />奖品</em>`);
						$myPrice.slideDown();
						$sliderPrice.show();
					}else{
						$myPrice.slideUp();
						$sliderPrice.hide();
						$latteryPoint.html(`<i>GO</i>`);
					}
				}
				else if(code == 400001306){
					$.removeLocalStorage('infor');
					changeLogin();
					showErrorTip(msg);
					$myPrice.slideUp();
					$sliderPrice.hide();
					$latteryPoint.html(`<i>GO</i>`);
				}
				else{
					showErrorTip(msg);
					$myPrice.slideUp()
					$sliderPrice.hide();
					$latteryPoint.html(`<i>GO</i>`);
				}
			}
		)
		
	}else{
		$myPrice.slideUp();
		$sliderPrice.hide();
		$latteryPoint.html(`<i>GO</i>`);
	};
};

