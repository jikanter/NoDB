/**
 * @fileoverview Network protocols and http extensions
 *
 */
var Network = function() {};
Network.Protocol = new Object();
Network.Protocol.create = function() { };
Network.Protocol.Inline = function() { 
  var dataSet = {
    "X-Offline-Application": "true; text/html; encoding=utf-8",
    "X-Application-Custom-Headers": "true",
    "X-Application-Custom-Headers-Inline": "true",
    "X-Application-Namespace": "Application:Offline",
    "X-Application-View-NamespaceP": "null",
    "X-Application-Model-NamespaceP": "null",
    "X-Mobile-ViewPort": "null",
    "X-Device-Optimize": "null",
    "X-Dataset-InlineP": "null",
    "X-Protocol-Inspector-Version": "0.1",
    "X-Protocol-Inspector-Type": "ip"
  };
  var createInlineProtocolElement = function(k, v) { 
    var elmt = document.createElement('meta');
    elmt.setAttribute('http-equiv', k);
    elmt.setAttribute('content', v);
    return elmt;
  };
  var tags = [];
  for (item in dataSet) { 
    tags.push(createInlineProtocolElement(item, dataSet[item]));
  }
  return tags;
};

/**
 * @class WebDev.Protocol
 * @documentation Protocols useful for web development
 */
WebDev.Protocol = {
  network: Network
};
WebDev.Protocol.initializeSockets = function() {};
WebDev.Protocol.Flags = function() {
  var flags = [];
  var flagTags = WebDev.jQuery("meta[@content='true']");
  for (var i = 0; i < flagTags.length; i++) {
    flags.push(flagTags.httpEquiv);
  }
  return flags;
};
WebDev.Protocol.Lookup = function(name) {
  if ((name == null) || (name == "undefined")) {
    name = "http";
  }
  WebDev['protocols'][name] = {};
  return name;
};
WebDev.Protocol.Describe = function() { 
  var flags = WebDev.Protocol.Flags();
  var ws = WebDev.Protocol.initializeSockets();
};