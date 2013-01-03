Network.Domain = function() { 
  this.location = window.location;
  this.hiddenForm = document.createElement('form');
  this.hiddenIframe = document.createElement('iframe');
  this.platformQuery = this.platform;
  this.java = java;
  this._domainCache = {};
  return this;
};
Network.Domain.ProtocolFlags = function() {
  var flags = [];
  var flagTags = Network.jQuery("meta[@content='true']");
  for (var i = 0; i < flagTags.length; i++) {
    flags.push(flagTags[i].httpEquiv);
  }
  return flags;
};