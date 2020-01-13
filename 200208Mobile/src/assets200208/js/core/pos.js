/*
 * @Author: 梁杰
 * @Date: 2020-01-09 16:08:29
 * @LastEditors  : 梁杰
 * @LastEditTime : 2020-01-10 18:14:57
 * @Description: 抽奖没有机会内容显示
 */
let str = '';
let str1 = '';
let num1 = 0;
/**
 * 抽奖没有机会-开始
 * @param {*} num 
 */
function pos(num){
    if(num == 1){
        str =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z4.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">迎新春事事如意，接鸿福步步高升</p>
                    <p class="filp-gift">鼠年好运连连</p>
                </div>`
    }else if(num == 2){
        str =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z2.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">分秒充满朝气，刻刻圆满如意</p>
                    <p class="filp-gift">元宵团圆</p>
                </div>`
    }else if(num == 3){
        str =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z6.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">万事如意展宏图，心想事成兴伟业</p>
                    <p class="filp-gift">新岁五福临门</p>
                </div>`
    }else if(num == 4){
        str =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z1.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">年年顺景财源广，岁岁平安福寿多</p>
                    <p class="filp-gift">新年吉星高照</p>
                </div>`
    }else if(num == 5){
        str =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z5.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">一帆风顺年年好，万事如意步步高</p>
                    <p class="filp-gift">鼠年万事如意</p>
                </div>`
    }else if(num == 6){
        str =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z8.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">春风入喜财入户，岁月更新福满门</p>
                    <p class="filp-gift">新春大吉</p>
                </div>`
    }else if(num == 7){
        str =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z3.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">日日财源顺意来，年年福禄随春到 </p>
                    <p class="filp-gift">新年福喜盈门</p>
                </div>`
    }else{
        str =  `<div class="filp-div1">
                    <span>${num}</span>
                </div>`
    }
    return str;
   
}
/**
 * 抽奖没有机会-开始
 */
function pos1(){
    num1++;
    if(num1 == 1){
        str1 =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z4.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">迎新春事事如意，接鸿福步步高升</p>
                    <p class="filp-gift">鼠年好运连连</p>
                </div>`
    }else if(num1== 2){
        str1 =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z2.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">分秒充满朝气，刻刻圆满如意</p>
                    <p class="filp-gift">元宵团圆</p>
                </div>`
    }else if(num1 == 3){
        str1 =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z6.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">万事如意展宏图，心想事成兴伟业</p>
                    <p class="filp-gift">新岁五福临门</p>
                </div>`
    }else if(num1 == 4){
        str1 =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z1.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">年年顺景财源广，岁岁平安福寿多</p>
                    <p class="filp-gift">新年吉星高照</p>
                </div>`
    }else if(num1 == 5){
        str1 =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z5.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">一帆风顺年年好，万事如意步步高</p>
                    <p class="filp-gift">鼠年万事如意</p>
                </div>`
    }else if(num1 == 6){
        str1 =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z8.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">春风入喜财入户，岁月更新福满门</p>
                    <p class="filp-gift">新春大吉</p>
                </div>`
    }else if(num1 == 7){
        str1 =  `<div class="filp-div">
                    <p class="filp-p">您的翻福卡机会</p>
                    <p class="filp-over">已用完~</p>
                    <img class="filp-img" src="../assets200208/img/z3.png">
                    <p class="filp-gift">奥鹏教育祝您：</p>
                    <p class="filp-gift">日日财源顺意来，年年福禄随春到 </p>
                    <p class="filp-gift">新年福喜盈门</p>
                </div>`
    }
    return str1;
}
/*抽奖没有机会-结束*/
module.exports = { pos, pos1 };