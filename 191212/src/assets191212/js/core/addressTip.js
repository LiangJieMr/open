const getInfor = require('./getInfor.js');
const showErrorTip = require('./errorTip.js');
const myPrice = require('./myPrice.js');
const changeLogin = require('./changeLogin.js');
const login = require('./login.js');
const singularTip = require('./singularTip');

 let addressTip =()=>{
	const $addressBox = $('#addressBox');
	const $msg = $addressBox.find('.msg');
	const regExpPhone = /^1[3456789]\d{9}$/;
	const regExpName = /^([\u4e00-\u9fa5\·\.]{2,16})$/;
	
	const $myPrice = $('#myPrice');
	
	const nameVal = $myPrice.find('#personName').data('val');
	const phoneVal = $myPrice.find('#personPhone').data('val');
	const addrVal = $myPrice.find('#personAddr').data('val');
	
	const $addrName = $addressBox.find("#addrName");
	const $addrPhone = $addressBox.find("#addrPhone");
	const $addrPost = $addressBox.find("#addrPost");
	
	$addrName.val(nameVal);
	$addrPhone.val(phoneVal);
	$addrPost.val(addrVal);
	
	$addressBox.show();
	
	$addressBox.find('button')
	.off('click')
	.on('click',()=>{
		
		const addrNameVal = $.trim($addrName.val());
							
		const addrPhoneVal =  $.trim($addrPhone.val());
							
		const addPostVal =  $.trim($addrPost.val());
							
		if(addrNameVal.length == 0){
			$msg
			.text('*请输入真实姓名！');
		}else if(!regExpName.test(addrNameVal)){
			$msg
			.text('*请输入真实姓名！');
		}else if(addrPhoneVal.length == 0){
			$msg
			.text('*请输入手机号码！');
		}else if(!regExpPhone.test(addrPhoneVal)){
			$msg
			.text('*请输入正确的手机号码！');
		}else if(addPostVal.length == 0){
			$msg
			.text('*请输入收货地址！');
		}
		else{
			$.sendReq(
				'/api/activity/addPrizeBase',
				'POST',
				{
					user_sign:getInfor(),
					name:addrNameVal,
					phone:addrPhoneVal,
					address:addPostVal,
					scene_id:$('.repaireAddr').data('scene')
				},
				(res)=>{
					const {code,
					   data,
					   msg} = res;
						   
					if(code == 0){
						
						myPrice();
						
						$addressBox.hide();
			
						$addressBox.find('input,textarea')
						.val('');
						
						$msg.text('');
						singularTip(`<dt>信息已提交成功,奖品将在15个工作日</dt><dd>内安排发放,电话请保持畅通</dd>`);
					}else if(code == 400001306){
						$.removeLocalStorage('infor');
						changeLogin();
						showErrorTip(msg);
						$addressBox.hide();
						$addressBox.find('input,textarea')
						.val('');
						$msg.text('');
						login();
					}
					else{
						showErrorTip(msg);
					}
					
				}
			);
		}
	});
	
	$addressBox.find('.close')
	.off('click')
	.on('click',()=>{
		$addressBox.hide();
		
		$addressBox.find('input,textarea')
		.val('');
		
		$msg.text('');
		
	});
};
module.exports = addressTip;