/*
 * @Author: 梁杰
 * @Date: 2020-01-09 14:03:39
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-13 14:34:36
 * @Description: 翻牌
 */
require('./open.js')
const changeStatus = require('./changeStatus.js');
const posStatus = require('./status.js');
const { pos1 } = require('./pos.js');
const showErrorTip =require('./errorTip.js');
const boxlottery = '/api/activity/boxLottery';
const $card = $('.card-inner');
const $cardLi = $card.find('li');
const $warm = $('.warmTip-yellow');
const $prizeTan = $('.prize-tan');
const $mask = $('.mask');
const $warmTip = $('.warmTip');
posStatus();
for (let i = 0; i < $cardLi.length; i++) {
    $($cardLi[i]).on('click', () => {
        if(!$.getStorage('infor')['user_sign']){
            $('.login-container').show();
            $('#emilevent').off('click').one('click', function(){
               boxlo(i)
            })
         }else{
             boxlo(i)
         }
    })
}
/**
 * 翻牌
 * @param {*} num 
 */
function boxlo(num) {
    $.sendReq(boxlottery, 'POST', {
        ac_id: 28,
        platform: 2,
        user_sign: $.getStorage('infor')['user_sign'] || '',
        click_pos: num + 1
    }, (res) => {
        let { code, data, msg } = res;
        if (code === 0 || code === 400001646) {
            $($cardLi[num]).unbind("click"); //移除click
            c($cardLi[num])
            setTimeout(() => {
                if(code === 0){
                    posStatus();
                    let money = data['prize_content'];
					let mey = money.replace(/[^0-9]/ig,"");
                    $prizeTan.find('.prize-tan-inner').html(
                        `
                        <div class="mey">${mey}</div>
                        <p>恭喜您！获得了${mey}元助学金。</p>
                        `
                    )
                    setTimeout(() => {
                        $prizeTan.show();
                        $mask.show();
                    },200)
                }
                if(code === 400001646){
                    $($cardLi[num]).html(pos1())
                }
            }, 1000)
        } else if (code === 400001680) {
            //活动已结束
            $('.over').show();
            $mask.show();
        } else if (code === 400001681) {
            //活动未开始
            $warmTip.show();
            $mask.show();
            $warm.html(
                `
                <div class="warmTip-err">
                    <p>活动正在准备中</p>
                    <p>请耐心等待活动开始~</p>
                </div>
                <div class="warmTip-img">
                    <img src="../assets200208/img/err5.png" alt="">
                </div>
                `
            )
        } else if (code === 400001918) {
            //点击速度太快了
            $warmTip.show();
            $mask.show();
            $warm.html(
                `
                <div class="warmTip-err">
                    <p>您的点击速度太快了</p>
                    <p>歇会再来吧~</p>
                </div>
                <div class="warmTip-img">
                    <img src="../assets200208/img/err3.png" alt="">
                </div>
                `
            )
        } else if (code === 400001914) {
            //未报名缴费
            $warmTip.show();
            $mask.show();
            $warm.html(
                `
                <div class="warmTip-err">
                    <p>本活动仅限</p>
                    <p>未报名缴费的用户参与哦~</p>
                </div>
                <div class="warmTip-img">
                    <img src="../assets200208/img/err2.png" alt="">
                </div>
                `
            )
        } else if (code === 400001326 || code === 400001306) {
            //登陆超时
            $.removeLocalStorage('infor');
            changeStatus()
            $('.login-container').show();
            $('#emilevent').off('click').one('click', function () {
                boxlo(num)
            })
        } else if(code === 400001684){
            //库存不足
            $warmTip.show();
            $mask.show();
            $warm.html(
                `
                <div class="warmTip-err warm1">
                    <p>太受欢迎了，奖品已经被抽光啦</p>
                    <p>工作人员正在飞速补货，请过会再来抽奖吧~</p>
                </div>
                <div class="warmTip-img">
                    <img src="../assets200208/img/err4.png" alt="">
                </div>
                `
            )
        }else {
            showErrorTip(msg);
        }
    },(err) => {
        //服务器正在开小差
        $warmTip.show();
        $mask.show();
        $warm.html(
            `
            <!-- <div class="warmTip-err">
                <p>服务器正在开小差</p>
                <p>请稍后再试~</p>
            </div>
            <div class="warmTip-img">
                <img src="../assets200208/img/err1.png" alt="">
            </div> -->
            `
        )
    })
}
/**
 * 翻牌角度
 * @param {*} ele 
 */
function c(ele) {
    $(ele).find('.front').css({
        "transform": "rotateY(720deg)", "-webkit-transform": "rotateY(720deg)",
        "-moz-transform": "rotateY(720deg)",
        "-ms-transform": "rotateY(720deg)",
        "-o-transform": "rotateY(720deg)",
        "z-index": "2"
    });
    $(ele).find('.back').css({
        "transform": "rotateY(540deg)", "-webkit-transform": "rotateY(540deg)",
        "-moz-transform": "rotateY(540deg)",
        "-ms-transform": "rotateY(540deg)",
        "-o-transform": "rotateY(540deg)",
        "z-index": "1"
    });
}