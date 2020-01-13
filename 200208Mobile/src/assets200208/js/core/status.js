/*
 * @Author: 梁杰
 * @Date: 2020-01-09 16:03:27
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-13 11:07:13
 * @Description: 初始化抽奖单位状态
 */
require('./open.js')
const {pos} = require('./pos.js')
const posStutas = '/api/activity/posStatus';
const $card = $('.card-inner');
const $cardLi = $card.find('li');
/**
 * 初始化抽奖单位状态
 */
function posStatus() {
    if(!$.getStorage('infor')['user_sign']){
        return false;
    }
    $.sendReq(posStutas, 'POST', { ac_id: 28, user_sign: $.getStorage('infor')['user_sign'], pos_num: 9 }, (res) => {
        let { code, data, msg } = res;
        if (code === 0) {
            for (let index in data['pos_list']) {
                if (data['pos_list'][index]['status'] == 1 && parseInt(data['pos_list'][index]['price']) != 0) {
                    if (index == 1) {
                        $($cardLi[0]).unbind('click');
                        $($cardLi[0]).html(pos(parseInt(data['pos_list'][index]['price'])))
                    }
                    if (index == 2) {
                        $($cardLi[1]).unbind('click');
                        $($cardLi[1]).html(pos(parseInt(data['pos_list'][index]['price'])))
                    }
                    if (index == 3) {
                        $($cardLi[2]).unbind('click');
                        $($cardLi[2]).html(pos(parseInt(data['pos_list'][index]['price'])))
                    }
                    if (index == 4) {
                        $($cardLi[3]).unbind('click');
                        $($cardLi[3]).html(pos(parseInt(data['pos_list'][index]['price'])))
                    }
                    if (index == 5) {
                        $($cardLi[4]).unbind('click');
                        $($cardLi[4]).html(pos(parseInt(data['pos_list'][index]['price'])))
                    }
                    if (index == 6) {
                        $($cardLi[5]).unbind('click');
                        $($cardLi[5]).html(pos(parseInt(data['pos_list'][index]['price'])))
                    }
                    if (index == 7) {
                        $($cardLi[6]).unbind('click');
                        $($cardLi[6]).html(pos(parseInt(data['pos_list'][index]['price'])))
                    }
                    if (index == 8) {
                        $($cardLi[7]).unbind('click');
                        $($cardLi[7]).html(pos(parseInt(data['pos_list'][index]['price'])))
                    }
                    if (index == 9) {
                        $($cardLi[8]).unbind('click');
                        $($cardLi[8]).html(pos(parseInt(data['pos_list'][index]['price'])))
                    }
                }
                if (data['pos_list'][index]['status'] == 1 && data['pos_list'][index]['price'] == 0) {
                    if (index == 1) {
                        $($cardLi[0]).html(pos(index))
                    }
                    if (index == 2) {
                        $($cardLi[1]).html(pos(index))
                    }
                    if (index == 3) {
                        $($cardLi[2]).html(pos(index))
                    }
                    if (index == 4) {
                        $($cardLi[3]).html(pos(index))
                    }
                    if (index == 5) {
                        $($cardLi[4]).html(pos(index))
                    }
                    if (index == 6) {
                        $($cardLi[5]).html(pos(index))
                    }
                    if (index == 7) {
                        $($cardLi[6]).html(pos(index))
                    }
                    if (index == 8) {
                        $($cardLi[7]).html(pos(index))
                    }
                    if (index == 9) {
                        $($cardLi[8]).html(pos(index))
                    }
                }

            }
            $("div#emilevent").trigger('click');
        }
    })
}
module.exports = posStatus;