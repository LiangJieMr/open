var clipboard = new ClipboardJS('.in_btn');
var showErrorTip = require('./errorTip');

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
	$('.fuzh').html('&#xe724;')
	showErrorTip('复制成功！')
    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});