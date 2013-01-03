/*==================================================
 *  Simile WebDev API
 *
 *  Include WebDev in your HTML file as follows:
 *    <script src="http://localhost:7888/WebDev/api-2.0/WebDev-api.js" type="text/javascript"></script>
 *
 *==================================================
 */
(function() {
  var onshoreApplicationP = false;
  var serverApplicationP  = false;
  var desktopApplicationP = false;
  var nmmApplicationP     = false;
  var dsApplicationP      = false;
  var iisApplicationP     = false;
  var fmApplicationP      = false;
  var developerModeP      = false;
  var profilingP          = false;
  var canaryP             = false;
  var headlessP           = false;
  var offlineP            = false;
  var browserP            = false;
  var editorP             = false;
  var cont                = {};
  var getStatesOrMode = function() { 
    if (this["offline"]) { return offlineP; }
    if (this["online"])  { return !offlineP; }
    if (this["developer"]) { return developerModeP; }
    if (this["profiling"]) { return profilingP; }
    if (this["canary"]) { return canaryP; }
    if (this["headless"]) { return headlessP; }
    if (this["browser"]) { return browserP; }
    if (this["editor"]) { return inline; }
    return false;
  };
  var getApplication = function() { 
    if (this.modal || this.stateful) { 
      return getStatesOrMode;
    }
    return false;
  }
  if (!offlineP) {
    if (document.location.search.length > 0) { 
      var params = document.location.search.substr(1).split("&");
      for (var i = 0; i < params.length; i++) { 
        if (params[i] == "Webdev-use-local-resources" || params[i] == "SimileAjax-use-local-resources" 
            || params[i] == "Network-use-local-resources" ) { 
          var useLocalResources = true;
        }
        if (params[i] == "Webdev-use-chrome-resources") { 
          var useChromeResources = true;
        }
      } 
    }
  }
  var defaultPrefix = "http://";
  var consoleUtilities = [];
  var useLocalResources = true;
  var loadMe = function() {
    if (typeof window.WebDev != "undefined") {
      return;
    }
//    document.writeln("window");
    window.WebDev = {
      loaded:     false,
      params:     { bundle: !useLocalResources, autoCreate: true, safe: false },
      namespace: "http://jk.jordankanter.selfip.net:7888/webdesign#",
      dataNamespaces: {},
      getNamespace: function(namespace) { return window.document.documentElement.getAttribute(namespace); },
      importers:  {},
      locales:    [ "en" ]
    }
    var javascriptFiles = [
        "webdev.js",
        "persistence.js",
        "create.js",
        "util-library.js",
        
        
        "log/logger.js",
        
        "platform-query.js",
        "offline.js",
        
        "loadable/loadable-utilities.js",
        
        "search/search.js",
        "search/remote-search-facet.js",
        
        "data/database.js",
        "data/utilities.js",
        
        "network/scripts/network-platform.js",
        "network/scripts/network-view.js",
        "network/scripts/dom.js",
        "network/scripts/domain.js",
        "network/scripts/transport-library.js",
        "network/scripts/protocol.js",
        
        "ui/ui.js",
        "ui/initialize.js",
        "ui/graphics.js",
        "ui/uicontext.js",
        "ui/content_box.js",
        "ui/popups.js",
        "ui/widgets/tabulator-toolbox-widget.js"
        
        ];
        var cssFiles = [
        ];
        
        var includeMap = false;
        var includeTimeline = false;
        
      var defaultClientLocales = ("language" in navigator ? navigator.language : navigator.browserLanguage).split(";");
        for (var l = 0; l < defaultClientLocales.length; l++) {
            var locale = defaultClientLocales[l];
            if (locale != "en") {
                var segments = locale.split("-");
                if (segments.length > 1 && segments[0] != "en") {
                    WebDev.locales.push(segments[0]);
                }
                WebDev.locales.push(locale);
            }
        }

        var paramTypes = { bundle:Boolean, js:Array, css:Array, autoCreate:Boolean, safe:Boolean };
        if (typeof WebDev_urlPrefix == "string") {
            WebDev.urlPrefix = WebDev_urlPrefix;
            if ("WebDev_parameters" in window) {
                SimileAjax.parseURLParameters(WebDev_parameters,
                                              WebDev.params,
                                              paramTypes);
            }
        } else {
            var url = SimileAjax.findScript(document, "/webdev-api.js");
            if (url == null) {
                WebDev.error = new Error("Failed to derive URL prefix for Simile WebDev API code files");
                return;
            }
            WebDev.urlPrefix = url.substr(0, url.indexOf("WebDev-api.js"));
        
            SimileAjax.parseURLParameters(url, WebDev.params, paramTypes);
        }
        
        if (useLocalResources) {
            //WebDev.urlPrefix = "http://sleepy.newmediameltdown.com:9089/net/media/WebDev/api/";
            //WebDev.urlPrefix = "chrome://net/media/WebDev/api";
            WebDev.urlPrefix = "http://jk.jordankanter.selfip.net:7888/webdesign/api/";
        }

        if (WebDev.params.locale) { // ISO-639 language codes,
            // optional ISO-3166 country codes (2 characters)
            if (WebDev.params.locale != "en") {
                var segments = WebDev.params.locale.split("-");
                if (segments.length > 1 && segments[0] != "en") {
                    WebDev.locales.push(segments[0]);
                }
                WebDev.locales.push(WebDev.params.locale);
            }
        }
        if (WebDev.params.gmapkey) {
            includeMap = true;
        }
        if (WebDev.params.views) {
            var views = WebDev.params.views.split(",");
            /*for (var j = 0; j < views.length; j++) {
                var view = views[j];
                if (view == "timeline") {
                    includeTimeline = true;
                } else if (view == "map") {
                    includeMap = true;
                }
            }*/ /* this does not apply for the webdev utilities */
        }

        var scriptURLs = WebDev.params.js || [];
        var cssURLs = WebDev.params.css || [];
      
                
        /*
         *  Core scripts and styles
         */
        if (WebDev.params.bundle) {
            scriptURLs.push(WebDev.urlPrefix + "webdev-bundle.js");
            cssURLs.push(WebDev.urlPrefix + "webdev-bundle.css");
        } else {
            SimileAjax.prefixURLs(scriptURLs, WebDev.urlPrefix + "scripts/", javascriptFiles);
            SimileAjax.prefixURLs(cssURLs, WebDev.urlPrefix + "styles/", cssFiles);
        }
        
        /*
         *  Localization
         */
        for (var i = 0; i < WebDev.locales.length; i++) {
            scriptURLs.push(WebDev.urlPrefix + "locales/" + WebDev.locales[i] + "/locale.js");
        };
        
        if (WebDev.params.callback) {
            window.SimileAjax_onLoad = function() {
                eval(WebDev.params.callback + "()");
            }
        } else if (WebDev.params.autoCreate) {
            scriptURLs.push(WebDev.urlPrefix + "scripts/create.js");
        }

        /*
         *  Extensions (for backward compatibility)
         */
        /*if (includeTimeline) {
            scriptURLs.push(useLocalResources ?
              "http://localhost:7888/WebDev/extensions/time/time-extension.js":
               // "chrome://net/media/WebDev/extensions/time/time-extension.js" :
                "http://static.simile.mit.edu/WebDev/extensions-2.0/time/time-extension.js");
        }
        if (includeMap) {
            scriptURLs.push(useLocalResources ?
              "http://localhost:7888/WebDev/extensions/map/map-extension.js" : 
              // "chrome://net/media/WebDev/extensions/map/map-extension.js"
                "http://static.simile.mit.edu/WebDev/extensions-2.0/map/map-extension.js");
        }*/
        
        SimileAjax.includeJavascriptFiles(document, "", scriptURLs);
        SimileAjax.includeCssFiles(document, "", cssURLs);
        WebDev.loaded = true;
    };

    /*
     *  Load SimileAjax if it's not already loaded
     */
    if (typeof SimileAjax == "undefined") {
        window.SimileAjax_onLoad = loadMe;
        var url = ( useLocalResources ?
            //"chrome://net/media/ajax/api/simile-ajax-api.js" :
                     ( useChromeResources ?  
                        "chrome://net/media/ajax/api/simile-ajax-api.js" 
                       : "http://localhost:7888/ajax/api/simile-ajax-api.js") 
                       : "http://jk.jordankanter.selfip.net:7888/ajax/api-2.0/simile-ajax-api.js");
            
        var createScriptElement = function() {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.language = "JavaScript";
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
        if (document.body == null) {
            try {
                document.write("<script src='" + url + "' type='text/javascript'></script>");
            } catch (e) {
                createScriptElement();
            }
        } else {
            createScriptElement();
        }
    } else {
        loadMe();
    }

})();
