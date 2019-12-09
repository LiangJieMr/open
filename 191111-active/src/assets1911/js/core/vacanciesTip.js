var $vacanciesTip = $('.vacancies-tip');
function vacanciesTip(cont){
	$vacanciesTip.find('.content').html('');
	$vacanciesTip.find('.content').html(cont);
	$vacanciesTip.show();
}
$vacanciesTip.find('.sure').on('click',function(){
	$vacanciesTip.hide();
});
module.exports = vacanciesTip;
