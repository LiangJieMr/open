let MyMar = null;

module.exports = (flage)=>{
    var speed =50;
    var demoScrollTop = $("#demo").scrollTop();
    var demo1OffsetHeight = $("#demo1").height();
    var demohtml= $("#demo1").html();
    $("#demo2").html(demohtml);
    let Marquee = ()=> {
         if (demoScrollTop >= demo1OffsetHeight) {
            demoScrollTop = 0;
        } else {
           demoScrollTop = demoScrollTop + 1;  
        }
        $("#demo").scrollTop(demoScrollTop);
    }
    if(MyMar) clearInterval(MyMar);
    MyMar = setInterval(Marquee, speed);
    if(flage){
		if(MyMar) clearInterval(MyMar);
	}
//  $("#demo").mouseover(function(){
//      clearInterval(MyMar);
//  })
//  $("#demo").mouseout(function(){
//      MyMar = setInterval(Marquee, speed);
//  })
     
}