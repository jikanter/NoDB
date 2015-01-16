/*==================================================
 *  Simile Tabulator API
 *
 *  Include Tabulator in your HTML file as follows:
 *    <script src="http://localhost:7888/Tabulator/api-2.0/Tabulator-api.js" type="text/javascript"></script>
 *
 *==================================================
 */
(function() {
  var offlineP = false;
  if (!offlineP) {
    if (document.location.search.length > 0) { 
      var params = document.location.search.substr(1).split("&");
      for (var i = 0; i < params.length; i++) { 
        if (params[i] == "Tabulator-use-local-resources" || params[i] == "SimileAjax-use-local-resources") { 
          var useLocalResources = true;
        }
        if (params[i] == "Tabulator-use-chrome-resources") { 
          var useChromeResources = true;
        }
      } 
    }
  }
  var defaultPrefix = "http://";
  var consoleUtilities = [];
  var useLocalResources = true;
  var loadMe = function() {
    if (typeof window.Tabulator != "undefined") {
      return;
    }
//    document.writeln("window");
    window.Tabulator = {
      loaded:     false,
      params:     { bundle: !useLocalResources, autoCreate: true, safe: false },
      namespace: "http://jordankanter.com/tabulator#",
      dataNamespaces: { 
          freebase: "http://freebase.com/view#",
          simile: "http://simile.mit.edu/2006/11/Simile#",
          twitter: "http://twitter.com#",
          apple: "http://www.apple.com#",
          google: "http://google.com#",
          rfc: "http://rfc-editor.org#",
          datagov: "http://data.gov#",
          mashable: "http://mashable.com#",
          w3c: "http://www.w3.org#"
      },
      freebaseNamespace: function() {  return window.Tabulator.dataNamespaces["freebase"]; },
      simileNamespace:   function() {  return window.Tabulator.dataNamespaces["simile"]; },
      datagovNamespace:  function() {  return window.Tabulator.dataNamespaces["datagov"]; },
      importers:  {},
      locales:    [ "en" ]
    }
    var javascriptFiles = [
      "../../../tabulator/ajaw/js/util.js",
      "../../../tabulator/ajaw/js/configuration.js",
      "../../../tabulator/ajaw/js/uri.js",
      "../../../tabulator/ajaw/js/webdav.js",
      "../../../tabulator/ajaw/js/rdf/term.js",
      "../../../tabulator/ajaw/js/rdf/match.js",
      "../../../tabulator/ajaw/js/rdf/rdfparser.js",
      "../../../tabulator/ajaw/js/rdf/n3parser.js",
      "../../../tabulator/ajaw/js/rdf/identity.js",
      "../../../tabulator/ajaw/js/rdf/query.js",
      //"../../../tab/ajaw/js/rdf/sources.js",
      "../../../tabulator/ajaw/js/labeler.js",
      "../../../tabulator/ajaw/js/rdf/remote.js",
      "../../../tabulator/ajaw/js/rdf/serialize.js",
      "../../../tabulator/ajaw/js/log.js",
      "../../../tabulator/ajaw/js/preferences.js",
      "../../../tabulator/ajaw/js/updateCenter.js",
      "../../../tabulator/ajaw/js/userinput.js",
      "../../../tabulator/ajaw/js/outline.js",
      "../../../tabulator/ajaw/js/tabulate.js",
      "../../../tabulator/ajaw/js/internalKnowledge.js",
      "../../../tabulator/ajaw/js/sparqlUpdate.js",
      "../../../tabulator/ajaw/js/sorttable.js",
      "../../../tabulator/ajaw/js/mapView.js",
      "../../../tabulator/ajaw/js/addView.js",
      "../../../tabulator/ajaw/js/calView.js",
      "../../../tabulator/ajaw/js/calView/timeline/api/timeline-api.js",
      "../../../tabulator/ajaw/js/calView/timeline/api/timelineView.js",
      "../../../tabulator/ajaw/js/tabviews.js",
      "../../../tabulator/ajaw/js/rdf/sparql.js",
      "../../../tabulator/ajaw/js/sparqlView.js",
      "../../../tabulator/ajaw/js/calView/calView.js",
      "../../../tabulator/ajaw/js/tableView.js"
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
                    Tabulator.locales.push(segments[0]);
                }
                Tabulator.locales.push(locale);
            }
        }

        var paramTypes = { bundle:Boolean, js:Array, css:Array, autoCreate:Boolean, safe:Boolean };
        if (typeof Tabulator_urlPrefix == "string") {
            Tabulator.urlPrefix = Tabulator_urlPrefix;
            if ("Tabulator_parameters" in window) {
                SimileAjax.parseURLParameters(Tabulator_parameters,
                                              Tabulator.params,
                                              paramTypes);
            }
        } else {
            var url = SimileAjax.findScript(document, "/tabulator-api.js");
            if (url == null) {
                Tabulator.error = new Error("Failed to derive URL prefix for Simile Tabulator API code files");
                return;
            }
            Tabulator.urlPrefix = url.substr(0, url.indexOf("Tabulator-api.js"));
        
            SimileAjax.parseURLParameters(url, Tabulator.params, paramTypes);
        }
        
        if (useLocalResources) {
            Tabulator.urlPrefix = "http://dev.jordankanter.com/";
        }

        if (Tabulator.params.locale) { // ISO-639 language codes,
            // optional ISO-3166 country codes (2 characters)
            if (Tabulator.params.locale != "en") {
                var segments = Tabulator.params.locale.split("-");
                if (segments.length > 1 && segments[0] != "en") {
                    Tabulator.locales.push(segments[0]);
                }
                Tabulator.locales.push(Tabulator.params.locale);
            }
        }
        if (Tabulator.params.gmapkey) {
            includeMap = true;
        }
        if (Tabulator.params.views) {
            var views = Tabulator.params.views.split(",");
            /*for (var j = 0; j < views.length; j++) {
                var view = views[j];
                if (view == "timeline") {
                    includeTimeline = true;
                } else if (view == "map") {
                    includeMap = true;
                }
            }*/ /* this does not apply for the tabulator utilities */
        }

        var scriptURLs = Tabulator.params.js || [];
        var cssURLs = Tabulator.params.css || [];
      
                
        /*
         *  Core scripts and styles
         */
        if (Tabulator.params.bundle) {
            scriptURLs.push(Tabulator.urlPrefix + "tabulator-bundle.js");
            cssURLs.push(Tabulator.urlPrefix + "tabulator-bundle.css");
        } else {
            SimileAjax.prefixURLs(scriptURLs, Tabulator.urlPrefix + "scripts/", javascriptFiles);
            SimileAjax.prefixURLs(cssURLs, Tabulator.urlPrefix + "styles/", cssFiles);
        }
        
        /*
         *  Localization
         */
        for (var i = 0; i < Tabulator.locales.length; i++) {
            scriptURLs.push(Tabulator.urlPrefix + "locales/" + Tabulator.locales[i] + "/locale.js");
        };
        
        if (Tabulator.params.callback) {
            window.SimileAjax_onLoad = function() {
                eval(Tabulator.params.callback + "()");
            }
        } else if (Tabulator.params.autoCreate) {
            scriptURLs.push(Tabulator.urlPrefix + "scripts/create.js");
        }

        /*
         *  Extensions (for backward compatibility)
         */
        /*if (includeTimeline) {
            scriptURLs.push(useLocalResources ?
              "http://localhost:7888/Tabulator/extensions/time/time-extension.js":
               // "chrome://net/media/Tabulator/extensions/time/time-extension.js" :
                "http://static.simile.mit.edu/Tabulator/extensions-2.0/time/time-extension.js");
        }
        if (includeMap) {
            scriptURLs.push(useLocalResources ?
              "http://localhost:7888/Tabulator/extensions/map/map-extension.js" : 
              // "chrome://net/media/Tabulator/extensions/map/map-extension.js"
                "http://static.simile.mit.edu/Tabulator/extensions-2.0/map/map-extension.js");
        }*/
        
        SimileAjax.includeJavascriptFiles(document, "", scriptURLs);
        SimileAjax.includeCssFiles(document, "", cssURLs);
        Tabulator.loaded = true;
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
                       : "http://dev.jordankanter.com/ajax/api/simile-ajax-api.js") 
                       : "http://jordankanter.com/ajax/api-2.0/simile-ajax-api.js");
            
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
