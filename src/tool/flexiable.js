(function(doc, win, baseW) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);


    // 设置data-dpr属性，留作的css hack之用
    var dpr = ( ( window.devicePixelRatio * 1 ).toFixed(2) || 1 ) * 1;
    dpr = window.appDpr = dpr === Math.ceil(dpr) ? Math.ceil(dpr) : dpr;
    docEl.setAttribute('data-dpr', dpr);

    var recalc = function(){
        var clientWidth = docEl.clientWidth;
        if(!clientWidth) return;
        clientWidth = clientWidth >= baseW ? baseW : clientWidth;
        let fontSize = window.rootFontSize = 100 * ( clientWidth / baseW);
        docEl.style.fontSize = fontSize + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window, 750);
