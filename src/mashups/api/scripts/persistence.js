/*======================================================================
 *  Persistence Utility Functions
 *======================================================================
 */
WebDev.Persistence = {};

WebDev.Persistence.getBaseURL = function(url) { 
  // HACK: for some unknown reason Safari keeps throwing
  //      TypeError: no default value
  // when this function is called from the RDFa importer. So I put a try catch here.
  try { 
    if (url.indexOf("://") < 0) { 
      var url2 = WebDev.Persistence.getBaseURL(document.location.href);
      if (url.substr(0,1) == "/") { 
        url = url2.substr(0, url2.indexOf("/", url2.indexOf("://") + 3)) + url;
      } else { 
        url = url2 + url;
      }
    }
    
    var i = url.lastIndexOf("/");
    if (i < 0) { 
      return "";
    } else { 
      return url.substr(0, i+1);
    }
  } catch (e) { 
    return url;
  }
};

WebDev.Persistence.resolveURL = function(url) { 
  if (url.indexOf("://") < 0) { 
    var url2 = WebDev.Persistence.getBaseURL(document.location.href);
    if (url.substr(0,1) == "/") { 
      url = url2.substr(0, url2.indexOf("/", url2.indexOf("://") + 3)) + url;
    } else { 
      url = url2 + url;
    }
  }
  return url;
};

WebDev.Persistence.getURLWithoutQueryAndHash = function() { 
  var url;
  /* shouldn't this be WebDev.Persistence ? */
  /*if ("_urlWithoutQueryAndHash" in WebDev) { */
  if ("_urlWithoutQueryAndHash" in WebDev.Persistence) { 
    url = WebDev.Persistence._urlWithoutQueryAndHash;
  } else { 
    url = document.location.href;
    
    var hash = url.indexOf("#");
    var question = url.indexOf("?");
    if (question >= 0) { 
      url = url.substr(0, question);
    } else if (hash >= 0) { 
      url = url.substr(0, hash);
    }
    
    WebDev.Persistence._urlWithoutQueryAndHash = url;
  }
  return url;
};

WebDev.Persistence.getURLWithoutQuery = function() { 
  var url;
  if ("_urlWithoutQuery" in WebDev.Persistence) { 
    url = WebDev.Persistence._urlWithoutQuery;
  } else { 
    url = document.location.href;
    
    var question = url.indexOf("?");
    if (question >= 0) { 
      url = url.substr(0, question);
    }
    
    WebDev.Persistence._urlWithoutQuery = url;
  }
  return url;
};

WebDev.Persistence.getItemLink = function(itemID) { 
  return WebDev.Persistence.getURLWithoutQueryAndHash() + "#" + encodeURIComponent(itemID);
};