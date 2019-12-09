const config = {
	rotateAngle: 0,
	flag: true,
	data: [{
			a: 0,
			p: 0.1,
			t: 0
		},
		{
			a: 40,
			p: 0.1,
			t: 3
		},
		{
			a: 80,
			p: 0.1,
			t: 2
		},
		{
			a: 120,
			p: 0.1,
			t: 1
		},
		{
			a: 160,
			p: 0.1,
			t: 3
		},
		{
			a: 200,
			p: 0.1,
			t: 2
		},
		{
			a: 240,
			p: 0.1,
			t: 4
		},
		{
			a: 280,
			p: 0.1,
			t: 3
		},
		{
			a: 320,
			p: 0.1,
			t: 1
		}
	],
	type: 0,
	during: 3
};

let randomFrom = (lowerValue,upperValue)=>{
 	return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
};

module.exports = (priceNum)=>{
	/*
	 *randNum：用来判断的随机数，1-100
	 *resultIndex：最终要旋转到哪一块，对应config.data的下标
	 *startPos:判断的角度值起始位置
	 *endPos:判断的角度值结束位置
	 *randCircle：// 附加多转几圈，2-3
	 */
	
	let randNum;
	const priceOne= [2,7];
	const priceTwo = [5,8];
	const priceThree = [3,6,9];
	switch(priceNum){
		case '1':
		randNum = 1;
		break;
		case '2':
		randNum = priceOne[randomFrom(0,1)];
		break;
		case '3':
		randNum = priceTwo[randomFrom(0,1)];
		break;
		case '4':
		randNum = priceThree[randomFrom(0,2)];
		break;
		case '5':
		randNum = 4;
		break;
		default:
		randNum = 4;
		break;
	};
	
	const {
		data,
		rotateAngle,
		type,
		during
	} = config;
	
	let resultIndex = 1;
	let startPos = 0;
	let endPos = 0;
	const randCircle = Math.ceil(Math.random() * 2) + 1;

	for(let i in data) {
		startPos = endPos + 1; // 区块的起始值
		endPos = endPos + 10 * data[i].p; // 区块的结束值
		if(randNum >= startPos && randNum <= endPos) { // 如果随机数落在当前区块，那么获取到最终要旋转到哪一块
			resultIndex = i;
			break;
		}
	};
	
	config.rotateAngle = rotateAngle + randCircle * 360 + data[resultIndex].a - rotateAngle % 360 + 720;
	
	return config.rotateAngle;
	
}
