function FS(doc, win) {
	  var docEl = doc.documentElement,
	    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	    recalc = function () {
	      var clientWidth = docEl.clientWidth;
	      if (!clientWidth) return;
	      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
	      // if (clientWidth > 750) {
	      //   docEl.style.fontSize = 50 + 'px';
	      // }
	    };
	  if (!doc.addEventListener) return;
	  win.addEventListener(resizeEvt, recalc, false);
	  doc.addEventListener('DOMContentLoaded', recalc, false);
	  $('body').css({'visibility':'visible'});
};
FS(document, window)