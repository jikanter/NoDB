var scopeDepth = 0;
var recursionDepth = 0;
var fName = null;
var stack = [];
var name = "eval";
var TOKENS = ['eval','function',')','(','{','}'];
try {
  load("mz.js");
} catch(e) {
  throw(e);
}

var recursiveParse = function() { 
  var items = [];
  var nextTokenAvailable = function() { };
  var parseNextToken = function(){};
  var renderable = null;
  var step = function() { 
    if (nextTokenAvailable()) { 
      parseNextToken();
    }
  }
};


