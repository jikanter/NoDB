/** Simple event adding, inspired by ppk's usable forms */
var addEvent = function(obj,type,fn) { 
  if (obj.addEventListener) { 
    obj.addEventListener(type,fn,false);
  }
  else if (obj.attachEvent) { 
    obj.attachEvent("on"+type,fn);
  }
};

addEvent(window,"load",prepareDatabase);

/* fetch a record and load it up */
var prepareDatabase = function() {
  var db = WebDev.Database.get();
  if (arguments && (!activeRecord)) { 
    activeRecord = WebDev.Database.get(arguments[0]);
  }
  else if (!activeRecord) { 
    activeRecord = WebDev.Database.get("_sentinel");
  }
  window.ActiveRecord = activeRecord;
  return activeRecord;
};

