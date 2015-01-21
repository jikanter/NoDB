/**
 * /mashups/api/data/query.js 
 * Query
 */
if (typeof Mashups == "undefined") { 
  var Mashups = new Object();
}

// lifted from querystring.js
function Querystring(qs) { // optionally pass a querystring to parse 
    this.params = {};
    if (qs == null) { qs = location.search.substring(1, location.search.length); }
    if (qs.length == 0) { return; }
    // Turn <plus> back to <space>
    // See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
    qs = qs.replace(/\+/g, ' ');
    var args = qs.split('&'); // parse out the name/value pairs seperated via &

    // split out each name/value pair
    for (var i = 0; i < args.length; i++) {
	     var pair = args[i].split('=');
             var name = decodeURIComponent(pair[0]);

	      var value = (pair.length == 2) 
	       ? decodeURIComponent(pair[1])
	       : name;

         this.params[name] = value;
    }
}

Querystring.prototype.get = function(key, default_) {
    var value = this.params[key];
    return (value != null) ? value : default_;
};

Querystring.prototype.contains = function(key) {
    var value = this.params[key];
    return (value != null);
};

Mashups.Query = new Querystring();
Mashups.Query._debug = false;


Mashups.Query.getQueryFromDOM = function(replaceFrom, replaceTo) {
  /*
   * @param replaceFrom: beginning of the replacement match
   * @param replaceTo: end of the replacement match
   * @return the escaped query string for the query
   */
  if ((replaceFrom == null) || (replaceFrom == "undefined")) { replaceFrom = " "; }
  if ((replaceTo == null) || (replaceTo == "undefined")) { replaceTo = "_"; } 
  var query = escape(document.getElementById("query-string").value.toLowerCase().replace(replaceFrom,replaceTo));
  //if (Mashups.Query._debug) { console.log(query); }
  return query;
};


// generic query launcher --> pass the method and optional query into the 

Mashups.Query.doWikipediaQuery = function(method) { 
  if (method == null) { method = "window" };
  window.location = "http://www.wikipedia.org/wiki/" + Mashups.Query.getQueryFromDOM();
  return false;
};

Mashups.Query.doFoldocQuery = function(method) { 
  if (method == null) { method = "window" };
  window.location = "http://foldoc.org/" + Mashups.Query.getQueryFromDOM(null,"+");
  return false;
};

Mashups.Query.doGoogleQuery = function(method) { 
  if (method == null) { method = "window" };
  window.location = "http://www.google.com#sclient=psy-ab&hl=en&site=&source=hp&q="+Mashups.Query.getQueryFromDOM(null,"+")+"&btnK=Google+Search&pbx=1&oq=&aq=&aqi=&aql=&gs_sm=&gs_upl=&bav=on.2,or.r_gc.r_pw.,cf.osb&fp=3f5b713198d517eb&biw=1280&bih=391";
  return false;
};

Mashups.Query.doYoutubeQuery = function(method) { 
  if (method == null) { method = "window" };
  var query = Mashups.Query.getQueryFromDOM(null,"+");
  window.location =  "http://www.youtube.com/results?search_query="+query+"&oq="+query+"&aq=f&aqi=g10&aql=&gs_sm=3&gs_upl=2186l5128l0l5577l11l11l2l3l3l0l90l508l6l6l0";
  return false;
};

Mashups.Query.doFreebaseQuery = function(method) { 
    if (method == null) { method = "window" };
    var query = Mashups.Query.getQueryFromDOM();
    //Mashups.Query.getQueryFromDOM(arguments.callee.substring(arguments.callee.indexOf("do"), arguments.callee.length - 5), "window");
    window.location = "http://freebase.com/view/" + query;
    return false;
 };
 
 Mashups.Query.doDbPediaQuery = function(method) { 
   if (method == null) { method = "window" };
   var query = Mashups.Query.getQueryFromDOM();
   window.location = "http://dbpedia.org/page/" + query;
   return false;
 };

Mashups.Query.runQuery = function(queryType, queryMethod) {
  if (queryMethod == null) { queryMethod = "window"; }
  
  switch(queryType) { 
    case "Dbpedia":   Mashups.Query.doDbPediaQuery(queryMethod); break;
    case "Freebase":  Mashups.Query.doFreebaseQuery(queryMethod); break;
    case "Wikipedia": Mashups.Query.doWikipediaQuery(queryMethod); break;
    case "Google":    Mashups.Query.doGoogleQuery(queryMethod); break;
    case "Foldoc":    Mashups.Query.doFoldocQuery(queryMethod); break;
    case "Youtube":   Mashups.Query.doYoutubeQuery(queryMethod); break;
    default: 
         Mashups.Query.doGoogleQuery(queryMethod);
    }
};

Mashups.Query.doQuery = function(elmt) { 
  if (Mashups.Query._debug) { console.log("elmt.value = " + elmt.value); }
  Mashups.Query.runQuery(elmt.value);
};


var doQuery = Mashups.Query.doQuery;