WebDev.Transport = function() { 
  this.description = null;
  this.name = 'HTTP';
  this.version = '1.0';
  this.nameString = this.name + '/' + this.version;
  this.nameString.addCRLF = function() { 
    return this.nameString + '\r\n';
  };
  return this;
};
WebDev.Transport.RFC = {};
WebDev.Transport.getRFC = function(id) { 
  return (WebDev.Trasnport.RFC[id] ? WebDev.Transport.RFC[id]: null);
};
WebDev.Transport.setRFCText = function(id, text) { 
  if (WebDev.Transport.RFC[id]) { 
    if (WebDev.Transport.RFC[id]["text"] && (typeof WebDev.Transport.RFC[id]["text"] == "object")) { 
      WebDev.Transport.RFC[id]["text"]["value"] = text;
    }
    WebDev.Transport.RFC = {id: {"text": null}};
  }
  WebDev.Transport.RFC[id]["text"] = {"value": text};
};
WebDev.Transport.getRFCLink = function(id, url) { 
  if (WebDev.Transport.RFC[id] && (!WebDev.Transport.RFC[id]["url"]["value"])) { 
    if (WebDev.Transport.RFC[id]["url"] && (typeof WebDev.Transport.RFC[id]["url"] == "object")) { 
      var a = document.createElement('a');
      a.setAttribute("href", url);
      a.value = url;
      WebDev.Transport.RFC[id]["url"]["value"] = a;
    }
  }
  return WebDev.Transport.RFC[id]["url"]["value"];
};
WebDev.Transport.HTTP = new Object();
// This is a list of XMLHttpRequest-creation factory functions to try
WebDev.Transport.HTTP._factories = [
    function() { return new XMLHttpRequest(); },
    function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
    function() { return new ActiveXObject("Microsoft.XMLHTTP"); }
];

// When we find a factory that works, store it here.
WebDev.Transport.HTTP._factory = null;

// Create and return a new XMLHttpRequest object.
//
// The first time we're called, try the list of factory functions until
// we find one that returns a non-null value and does not throw an
// exception. Once we find a working factory, remember it for later use.
//
WebDev.Transport.HTTP.newRequest = function() {
    if (WebDev.Transport.HTTP._factory != null) return HTTP._factory();

    for(var i = 0; i < WebDev.Transport.HTTP._factories.length; i++) {
        try {
            var factory = WebDev.Transport.HTTP._factories[i];
            var request = factory();
            if (request != null) {
                WebDev.Transport.HTTP._factory = factory;
                return request;
            }
        }
        catch(e) {
            continue;
        }
    }
    // If we get here, none of the factory candidates succeeded,
    // so throw an exception now and for all future calls.
    HTTP._factory 
 = function() {
        throw new Error("XMLHttpRequest not supported");
    }
    WebDev.Transport.HTTP._factory(); // Throw an error
};

WebDev.Transport.HTTP._getResponse = function(request) {
    // Check the content type returned by the server
    switch(request.getResponseHeader("Content-Type")) {
    case "text/xml":
        // If it is an XML document, use the parsed Document object.
        return request.responseXML;

    case "text/json":
    case "text/javascript":
    case "application/javascript":
    case "application/x-javascript":
        // If the response is JavaScript code, or a JSON-encoded value,
        // call eval() on the text to "parse" it to a JavaScript value.
        // Note: only do this if the JavaScript code is from a trusted server!
        return eval(request.responseText);

    default:
        // Otherwise, treat the response as plain text and return as a string.
        return request.responseText;
    }
};


WebDev.Transport.HTTP.get = function(url, callback, options) {
    var request = HTTP.newRequest();
    var n = 0;
    var timer;
    if (options.timeout)
        timer = setTimeout(function() {
                               request.abort();
                               if (options.timeoutHandler)
                                   options.timeoutHandler(url);
                           },
                           options.timeout);

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (timer) clearTimeout(timer);
            if (request.status == 200) {
                callback(WebDev.Transport.HTTP._getResponse(request));
            }
            else {
                if (options.errorHandler)
                    options.errorHandler(request.status,
                                         request.statusText);
                else callback(null);
            }
        }
        else if (options.progressHandler) {
            options.progressHandler(++n);
        }
    }

    var target = url;
    if (options.parameters)
        target += "?" + WebDev.Transport.HTTP.encodeFormData(options.parameters)
    request.open("GET", target);
    request.send(null);
};
/*
 * Web Developer UI
 */
WebDev.Transport.UI = new Object();
/*----------------------------------------------------------------------
 *  Component instantiation functions
 *----------------------------------------------------------------------
 */
WebDev.Transport.UI.create = function(configuration, elmt, uiContext) {
  return new WebDev.UI.create(configuration, elmt, uiContext);
};