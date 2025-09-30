function appendscript(src, text, reload, charset) {
    // var id = hash(src + text);
    // if (!reload && in_array(id, evalscripts)) return;
    // if (reload && $(id)) {
    //     $(id).parentNode.removeChild($(id));
    // }
    // evalscripts.push(id);
    var scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    scriptNode.charset = charset
        ? charset
        : BROWSER.firefox
            ? document.characterSet
            : document.charset;
    try {
        if (src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function() {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
            };
            scriptNode.onreadystatechange = function() {
                if (
                    (scriptNode.readyState == "loaded" ||
                        scriptNode.readyState == "complete") &&
                    !scriptNode.onloadDone
                ) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                }
            };
        } else if (text) {
            scriptNode.text = text;
        }
        document.getElementsByTagName("head")[0].appendChild(scriptNode);
    } catch (e) {}
}


const patrn  = /[^\x00-\xff]/

function cutstr(str, len) {
    let temp,
        icount = 0,
        strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
            if (patrn.exec(temp) == null) {
                icount = icount + 1
            } else {
                icount = icount + 2
            }
            strre += temp
        } else {
            break;
        }
    }
    return strre + "..."
}

function getViewSize() {
    var de = document.documentElement;
    var db = document.body;
    var viewW = de.clientWidth == 0 ? db.clientWidth : de.clientWidth;
    var viewH = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;
    return Array(viewW, viewH);
}

const format = (n) => {
    let num = n.toString();
    let len = num.length;
    if (len <= 3) {
        return num;
    } else {
        let temp = '';
        let remainder = len % 3;
        if (remainder > 0) { // 不是3的整数倍
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
        } else { // 3的整数倍
            return num.slice(0, len).match(/\d{3}/g).join(',') + temp;
        }
    }
}



export {
    appendscript
    ,cutstr
    ,getViewSize
    ,format
}
