function getInfor(){
	return  $.getStorage('infor') ? $.getStorage('infor').userSign ? $.getStorage('infor').userSign : '' : '';
};
module.exports = getInfor;