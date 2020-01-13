/*
 * @Author: 梁杰
 * @Date: 2020-01-08 19:34:37
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-10 11:23:43
 * @Description: 奖品设置
 */
require('./open.js')
const giftList = '/api/activity/giftList';
const $prize = $('.prize-p');
$.sendReq(giftList,'GET',{'ac_id': 28},function(res){
    let {code, data, msg} = res;
    if(code === 0){
        data.forEach((item, index, array) => {
            if(item['prize_degree'] == 1){
                $prize.find('.prize-top').html(`<div>${item['prize_price']}</div><p>${item['prize_price']}元助学金</p>`)
               // $prize.find('.prize-top').html(`<img src="../assets200208/img/300m.png" alt=""><p>${ item['prize_price']}元助学金</p>`)
            }
            if(item['prize_degree'] == 2){
                $prize.find('.prize-left').html(`<div>${item['prize_price']}</div><p>${item['prize_price']}元助学金</p>`)
              //  $prize.find('.prize-left').html(`<img src="../assets200208/img/200m.png" alt=""><p>${ item['prize_price']}元助学金</p>`)
            }
            if(item['prize_degree'] == 3){
                $prize.find('.prize-right').html(`<div>${item['prize_price']}</div><p>${item['prize_price']}元助学金</p>`)
               // $prize.find('.prize-right').html(`<img src="../assets200208/img/100m.png" alt=""><p>${ item['prize_price']}元助学金</p>`)
            }
        });
    }else{
        $prize.html(`<div class="prize-top">
                        <img src="../assets200208/img/300m.png" alt="">
                        <p>300元助学金</p>
                    </div>
                    <div class="prize-bot">
                        <div class="prize-left">
                            <img src="../assets200208/img/200m.png" alt="">
                            <p>200元助学金</p>
                        </div>
                        <div class="prize-right">
                            <img src="../assets200208/img/100m.png" alt="">
                            <p>100元助学金</p>
                        </div>
                    </div>`)
    }
})