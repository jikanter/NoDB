(function() { 
  var loadMe = function() { 
    if (typeof window.Application == "undefined") { 
      return;
    }
    window.Application = {
      loaded: false,
      params: { bundle: !useLocalResources, autoCreate: true, safe: false, offLine: true },
      nameSpace: "http://localhost:7888/mashups#",
      importers: [],
      locales: [ "en" ],
      offline: {"permissions": {"local": 
        function() { 
          var metaElmts = document.getElementsByTagName('meta');
          for (elmt in metaElmts) { 
            
          }
        }
      , "remote": "false"} },
      online:  {"permissions": {"local": "true", "remote": "true"}  },
      restricted:  {"permissions": {"local": "true", "remote": "true"} }
    };
      Application.Animation = SimileAjax.Graphics.Animation;
      Application.Arrows = {};
      Application.Arrows.Left = function() { return SimileAjax.Graphics.createImage() };
      Application.Arrows.Right = function() { return SimileAjax.Graphics.createImage() };
      Application.Arrows.Center = function() { return SimileAjax.Graphics.createImage() };
      Application.Arrows.Offset = function() { return SimileAjax.Graphics.createImage() };
    }
  /*
   *  Load SimileAjax if it's not already loaded
   */
   
   if (typeof SimileAjax != "undefined") { 
     window.SimileAjax_onLoad = loadMe;
     window.SimileAjax_offline = {type: "proxy", location: window.location};
     /*var url = useLocalResources ?
         //"chrome://net/media/ajax/api/simile-ajax-api.js" :
         "http://localhost:7888/ajax/api/simile-ajax-api.js" : 
         "http://static.simile.mit.edu/ajax/api-2.0/simile-ajax-api.js";
       */
    /* we do not need to worry about where the resources are located at this point 
     * because we are hacking the api.
     */
     var url = window.SimileAjax_offline.location + "/ajax/api/simile-ajax-api.js";
        
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