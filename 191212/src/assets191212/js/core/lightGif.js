module.exports = ()=>{
	 const dt1 = $.Deferred();
	 const dt2 = $.Deferred();
	 const dt3 = $.Deferred();
	 
	 const img1 = new Image();
	 img1.src = './assets191212/img/latteryLight1.png';
	  
	 if(img1.complete) {
	 	dt1.resolve();
	 }
	 img1.onload = function () {
	 	dt1.resolve();
	 };
	 
	 const img2 = new Image();
	 img2.src = './assets191212/img/latteryLight2.png';
	  
	 if(img2.complete) {
	 	dt2.resolve();
	 }
	 img2.onload = function () {
	 	dt2.resolve();
	 };
	 
	 const img3 = new Image();
	 img3.src = './assets191212/img/latteryLight3.png';
	  
	 if(img3.complete) {
	 	dt3.resolve();
	 }
	 img3.onload = function () {
	   dt3.resolve();
	 };
	 
	 $.when(dt1,dt2,dt3).done(()=>{
	 	const $latteryOuter = $('#lattery').find('.outer img');
	 	let num = 1;
	 	setInterval(()=>{
	 		++num;
	 		if(num > 3){
	 			num = 1;
	 		}
	 		$latteryOuter.hide();
	 		$latteryOuter.eq(num - 1).show();
	 	},1000);
	 });
	 
};

	
