module.exports = (startTime,nowTime,endTime)=>{
	
	const startDate = new Date(startTime * 1000);
	const startYear = startDate.getFullYear();
	const startMonth = startDate.getMonth() + 1;
	const startDay = startDate.getDate();
	
	const endDate = new Date(endTime * 1000);
	const endYear = endDate.getFullYear();
	const endMonth = endDate.getMonth() + 1;
	const endDay = endDate.getDate();
	
	$("#activeTime")
	.text(`${startYear}.${startMonth}.${startDay}-${endYear}.${endMonth}.${endDay}`);
	$('#ruleDate')
	.text(`${startYear}年${startMonth}月${startDay}日-${endYear}年${endMonth}月${endDay}日`);
};
