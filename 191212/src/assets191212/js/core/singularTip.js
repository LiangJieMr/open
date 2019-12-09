const $singularTip = $('.singular-tip');
function singularTip(cont){
	const $outer = $singularTip.find('.outer');
	const $content = $singularTip.find('.content');
	
	$content.html('');
	$content.html(cont);
	
	$singularTip.show();
	
	const height = parseInt($outer.outerHeight(true)/2);
	$outer.css('margin-top', - height + 'px');
	$singularTip.find('button')
	.off('click')
	.on('click',()=>{
		$singularTip.hide();
	});
};
module.exports = singularTip;
