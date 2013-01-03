/**
 * @fileoverview general purpose display controller. outputs display independent datasets
 */
var Display = new Object();
Display.config = function() { 
  var name = "pdf";
  var side = "client";
  var _config = {
    version: 1.4,
    encoding: "utf-8"
  };
  return {name: name, side: side, conf: _config};
};