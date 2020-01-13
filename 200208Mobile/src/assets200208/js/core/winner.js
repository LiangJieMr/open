/*
 * @Author: 梁杰
 * @Date: 2020-01-08 17:33:48
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-13 13:48:56
 * @Description: 奖品名单内容
 */
const winners = require('./winners.js');
const winnerList = '/api/activity/winnerList';
module.exports = (time) => {
    if(time == 1 || time == 2){
        $.sendReq(winnerList,'GET',{'ac_id': 28},function(res){
            let {code, data, msg} = res;
            if(code === 0){
                let inn = '';
                data['list'].forEach(function(item, index, array){
                    if(item['price'] === null){
                        item['price'] = 100;
                    }
                    inn += `<li><span class="list_phone">${item['phone']}</span><span class="list_text">获得了${parseInt(item['price'])}元助学金</span></li>`;
                });
                $('.list_div').html(`<ul id="demo1">${inn}</ul><div id="demo2"></div>`)
            }else{
                $('.list_div').html(
                    `<ul id="demo1">
                        <li><span class="list_phone">135*****7867</span><span class="list_text">获得了300元助学金</span></li>
                        <li><span class="list_phone">135*****7867</span><span class="list_text">获得了300元助学金</span></li>
                        <li><span class="list_phone">135*****7317</span><span class="list_text">获得了300元助学金</span></li>
                        <li><span class="list_phone">135*****1827</span><span class="list_text">获得了300元助学金</span></li>
                        <li><span class="list_phone">135*****1827</span><span class="list_text">获得了300元助学金</span></li>
                        <li><span class="list_phone">135*****7867</span><span class="list_text">获得了300元助学金</span></li>
                        <li><span class="list_phone">135*****1827</span><span class="list_text">获得了300元助学金</span></li>
                        <li><span class="list_phone">135*****7867</span><span class="list_text">获得了300元助学金</span></li>
                        <li><span class="list_phone">135*****1827</span><span class="list_text">获得了300元助学金</span></li>
                        <li><span class="list_phone">135*****7867</span><span class="list_text">获得了300元助学金</span></li>
                        <li><span class="list_phone">135*****7537</span><span class="list_text">获得了300元助学金</span></li>
                        <li><span class="list_phone">135*****7637</span><span class="list_text">获得了300元助学金</span></li>
                        </ul>
                        <div id="demo2"></div>
                    `
                    )
            }
            winners();  
        })
    }else{
        $('.list_div').html('<p>暂未揭晓</p>')
    }
}