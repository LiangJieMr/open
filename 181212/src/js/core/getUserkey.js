var api = {
	getUserkey:'/api/user/userkey'
};
function getUserkey(signCheck,showErrorTip){
	$.sendReq(api.getUserkey,'post',{},function(data){
		if(data.code == 0){
			signCheck.changeUserkey(data.data);
		}
		else{
			showErrorTip(data.msg);
		}
	});
};
module.exports = getUserkey;