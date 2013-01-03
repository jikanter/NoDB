/**================================================
 * WebDev.PdfDisplayWidget
 * ================================================ 
 */
 
WebDev.PdfDisplayWidget = function(containerElmt, uiContext) {
  this._containerElmt = containerElmt;
  this._uiContext = uiContext;
  this._settings = {};
  this._exportedData = "";
  
  this._serializedDisplayElements = "";
  this._initializePDF();
};

WebDev.PdfDisplayWidget.prototype._initializeUI = function() { 
  var self = this;
  this._containerElmt.onclick = function(evt) { self._onContainerMouseClick(evt); };
};

WebDev.PdfDisplayWidget.prototype._initializePrintDriver = function() { 
  // all browser specific print code goes below.
  return null;
};

WebDev.PdfDisplayWidget.prototype._onContainerMouseClick = function(evt) { 
  var self = this;
  var coords = SimileAjax.DOM.getPageCoordinates(this._containerElmt);
  var docWidth = document.body.offsetWidth;
  var docHeight = document.body.offsetHeight;
  
  var pdf = this._initializePrintDriver();
};

