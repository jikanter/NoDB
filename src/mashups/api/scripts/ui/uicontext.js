/*
 * WebDev.UIContext
 */
WebDev.UIContext = function() { 
  this._assets = [];
  this._platforms = [];
  this._controllers = [];
  this._designContexts = {};
  this._listenerContexts = {};
  this._sprites = {};
  this._displayables = [];
  this._configurations = [];
  this._parameters = [];
};

WebDev.UIContext.viewController = function() { 
  WebDev.UIContext.controllerType = "view";
};

WebDev.UIContext.designController = function() { 
  WebDev.UIContext.controllerType = "design";
};

WebDev.UIContext.listenerController = function() { 
  WebDev.UIContext.controllerType = "listener";
};

WebDev.UIContext.createController = function(kind) { 
  if (kind == null || kind == "undefined") { kind = "view"; };
  if (kind == "view") { 
    WebDev.UIContext.viewController();
  }
  if (kind == "design") { 
    WebDev.UIContext.designController();
  }
  if (kind == "listener") { 
    WebDev.UIContext.listenerController();
  }
  return WebDev.UIContext.controllerType;
};

WebDev.UIContext.prototype.registerController = function(type) {
  this._controllers.push(WebDev.UIContext.createController(type));
};

WebDev.UIContext.prototype.disposeControllers = function() { 
  if (this._controllers.length > 0) { 
    this._controllers = [];
  }
  return this._controllers;
};

WebDev.UIContext.registerUtility = function(configuration, elmt, uiContext) {
  return new Exhibit.Lens(configuration, uiContext.getLensRegistry());
};
WebDev.UIContext.registerWidget  = function(configuration, elmt, uiContext) {
  return new Exhibit.Lens(configuration, uiContext.getLensRegistry());
};
WebDev.UIContext.registerModel = function(configuration, elmt, uiContext) {
  var model = new Object();
  model.configuration = configuration;
  model.element = elmt;
  model.context = uiContext;
  model.views = uiContext.getLensRegistry();
  return model;
};
WebDev.UIContext.prototype.registerPlatform = function(configuration, elmt, uiContext) {
  return uiContext;
};

WebDev.UIContext.prototype.registerAsset = function(asset) {
  return asset;
};