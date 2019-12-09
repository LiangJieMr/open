import "../scss/zlcg191111.scss";
$(function(){
	const API = {
		boostList:'/api/activity/boostList'
	};
	
	require('./core/open.js');
	var globalMsg =require('./core/globalMsg.js');
	const phone = $.getSession('phone');
	$.sendReq(
		API.boostList,
		'GET',
		{
			phone:phone
		},
		function(res){
			const {code,data,msg} = res;
			if(code == 0){
				const {list} = data;
				$('#total').text(list.length);
				$("#assistanceList").html('');
				list.forEach(function(item){
					const str = `
					<li>
						<p class="time">${item['boost_date']}</p>
						<p class="infor">
							<img src="${item['headimgurl']}" alt="" />
							<span>${item['nickname']}</span>
						</p>
					</li>
					`;
					$("#assistanceList").append(str);
				});
			}
			else{
				globalMsg(msg);

			}
		}
	)
})
