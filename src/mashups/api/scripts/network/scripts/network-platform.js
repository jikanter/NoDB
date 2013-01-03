/*==================================================
 * Network.Platform
 *==================================================
 */
 
/*  This must be called after our jQuery has been loaded 
     but before control returns to user-code.
*/
if (Network == null || typeof Network == "undefined") { 
  var Network = {
    Platform: {}
  };
}
Network.jQuery = WebDev.jQuery;
if (typeof window["$"] == "undefined") {
  window.$ = Network.jQuery;
}
Network.Platform.os = {
    isMac:    false,
    isWin:    false,
    isWin32:  false,
    isUnix:   false,
    isMobile: false,
};
Network.Platform.browser = {
    isIE:           false,
    isNetscape:     false,
    isMozilla:      false,
    isFirefox:      false,
    isOpera:        false,
    isSafari:       false,

    majorVersion:   0,
    minorVersion:   0
};

(function() {
    var an = navigator.appName.toLowerCase();
	var ua = navigator.userAgent.toLowerCase(); 
    
    /*
     *  Operating system
     */
	Network.Platform.os.isMac = (ua.indexOf('mac') != -1);
	Network.Platform.os.isWin = (ua.indexOf('win') != -1);
	Network.Platform.os.isWin32 = Network.Platform.isWin && (   
        ua.indexOf('95') != -1 || 
        ua.indexOf('98') != -1 || 
        ua.indexOf('nt') != -1 || 
        ua.indexOf('win32') != -1 || 
        ua.indexOf('32bit') != -1
    );
	Network.Platform.os.isUnix = (ua.indexOf('x11') != -1);
    
    /*
     *  Browser
     */
    Network.Platform.browser.isIE = (an.indexOf("microsoft") != -1);
    Network.Platform.browser.isNetscape = (an.indexOf("netscape") != -1);
    Network.Platform.browser.isMozilla = (ua.indexOf("mozilla") != -1);
    Network.Platform.browser.isFirefox = (ua.indexOf("firefox") != -1);
    Network.Platform.browser.isOpera = (an.indexOf("opera") != -1);
    Network.Platform.browser.isSafari = (an.indexOf("safari") != -1);
    
    var parseVersionString = function(s) {
        var a = s.split(".");
        Network.Platform.browser.majorVersion = parseInt(a[0]);
        Network.Platform.browser.minorVersion = parseInt(a[1]);
    };
    var indexOf = function(s, sub, start) {
        var i = s.indexOf(sub, start);
        return i >= 0 ? i : s.length;
    };
    
    if (Network.Platform.browser.isMozilla) {
        var offset = ua.indexOf("mozilla/");
        if (offset >= 0) {
            parseVersionString(ua.substring(offset + 8, indexOf(ua, " ", offset)));
        }
    }
    if (Network.Platform.browser.isIE) {
        var offset = ua.indexOf("msie ");
        if (offset >= 0) {
            parseVersionString(ua.substring(offset + 5, indexOf(ua, ";", offset)));
        }
    }
    if (Network.Platform.browser.isNetscape) {
        var offset = ua.indexOf("rv:");
        if (offset >= 0) {
            parseVersionString(ua.substring(offset + 3, indexOf(ua, ")", offset)));
        }
    }
    if (Network.Platform.browser.isFirefox) {
        var offset = ua.indexOf("firefox/");
        if (offset >= 0) {
            parseVersionString(ua.substring(offset + 8, indexOf(ua, " ", offset)));
        }
    }
    
    if (!("localeCompare" in String.prototype)) {
        String.prototype.localeCompare = function (s) {
            if (this < s) return -1;
            else if (this > s) return 1;
            else return 0;
        };
    }
})();

Network.Platform.getDefaultLocale = function() {
    return Network.Platform.clientLocale;
};