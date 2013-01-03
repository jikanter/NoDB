/**
 * constructor
 */
WebDev.UI.ContentBox = function() { 
  this._content = "";
  this._element = 'div';
  this._nodes = [];
  this._scripts = [];
  this.elmt = document.createElement(this._element);
  this.elmt.appendChild(this._content);
};

