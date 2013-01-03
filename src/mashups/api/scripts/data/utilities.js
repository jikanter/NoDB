WebDev.Utilities = function() { 
  this._utilities = {};
  this._serialized = {};
  this._transforms = {};
  this._serverNodes = null;
};

WebDev.UtilityStack = [];

WebDev.Utilities.appendWord = function(elmt, word) { 
  /* append word to the elements text node contained in elmt. return the element */
  var txt = elmt.innerText;
  txt = txt + " " + word;
  elmt.innerText = txt;
  return elmt;
};

WebDev.Utilities.prependWord = function(elmt, word) { 
  /* prepend word to the elements text node contained in elmt. return the element */
  var txt = elmt.innerText;
  txt = word + " " + txt;
  elmt.innerText = txt;
  return elmt;
};
