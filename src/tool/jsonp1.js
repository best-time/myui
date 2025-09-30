/**
 * Module dependencies
 */

// var debug = require('debug')('jsonp');

/**
 * Module exports.
 */

// module.exports = jsonp;

/**
 * Callback index.
 */

var count = 0;

/**
 * Noop function.
 */

function noop(){}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp(url, opts, fn){
    if ('function' == typeof opts) {
        fn = opts;
        opts = {};
    }
    if (!opts) opts = {};

    var prefix = opts.prefix || '__jp';

    // use the callback name that was passed if one was provided.
    // otherwise generate a unique name by incrementing our counter.
    var id = opts.name || (prefix + (count++));

    var param = opts.param || 'callback';
    var timeout = null != opts.timeout ? opts.timeout : 60000;
    var enc = encodeURIComponent;
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script;
    var timer;


    if (timeout) {
        timer = setTimeout(function(){
            cleanup();
            if (fn) fn(new Error('Timeout'));
        }, timeout);
    }

    function cleanup(){
        if (script.parentNode) script.parentNode.removeChild(script);
        window[id] = noop;
        if (timer) clearTimeout(timer);
    }

    function cancel(){
        if (window[id]) {
            cleanup();
        }
    }

    window[id] = function(data){
        // debug('jsonp got', data);
        cleanup();
        if (fn) fn(null, data);
    };

    // add qs component
    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
    url = url.replace('?&', '?');

    // debug('jsonp req "%s"', url);

    // create script
    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);

    return cancel;
}


/**
 jsonp(url, opts, fn)
 url (String) url to fetch
 opts (Object), optional
 param (String) name of the query string parameter to specify the callback (defaults to callback)
 timeout (Number) how long after a timeout error is emitted. 0 to disable (defaults to 60000)
 prefix (String) prefix for the global callback functions that handle jsonp responses (defaults to __jp)
 name (String) name of the global callback functions that handle jsonp responses (defaults to prefix + incremented counter)
 fn callback
 The callback is called with err, data parameters.

 If it times out, the err will be an Error object whose message is Timeout.

 Returns a function that, when called, will cancel the in-progress jsonp request (fn won't be called).
 */
