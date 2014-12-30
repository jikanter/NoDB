/**
 * @fileoverview general purpose display controller. 
 * @type Object
 * outputs display from independent datasets
 */
var Display = {
  type: "pdf",
  outputTo: self ? self : new Object()
};

Display.config = function() { 
  var name = this.type;
  var side = this.outputTo == self ? "client" : "server";
  var _config = {
    version: 1.4,
    encoding: "utf-8"
  };
  return {name: name, side: side, conf: _config};
};
Display.Timer = function() { 
  this.now = Date.now();
  this.tick = 100;
  this.march = function(cont) { setTimeout(cont(), this.tick); };
}