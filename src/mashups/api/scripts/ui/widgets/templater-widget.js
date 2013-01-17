(function() { 
  if (!theDocument || theDocument == null) { 
    var theDocument = document.documentElement;
  }
  theDocument.Templates = function() { 
      var kinds = [
        "application",
        "widget",
        "facet"
      ];
      var prefixes = [ 
        "native", 
        "webdev",
        "date",
        "library",
        "platform",
        "design"
      ];
      var appendNewPrefixedKind = function(kindOffset, prefixOffset) { 
        /* create a new kind by prepending a prefix at prefixOffset to 
         * a kind at kindOffset. Both prefixOffset and kindOffset are integers
         */
        kinds.push(prefixes[prefixOffset] + "-" + kinds[kindOffset]);
      };
      for (prefix in prefixes) { 
        appendNewPrefixedKind(0, prefix);
        appendNewPrefixedKind(1, prefix);
        appendNewPrefixedKind(2, prefix);
      }
      return kinds;
  }();
  theDocument.Templates.create = function(prefix, kind, domText) {
    if (theDocument.Templates[prefix + "-" + kind] == null) { 
      return null;
    }
    var tpl = new Object();
    tpl.kind = theDocument.Templates[prefix + "-" + kind];
    tpl.DOM = SimileAjax.DOM.createDOMFromString(domText);
    return tpl;
  };
  WebDev.UI.Templater = function() { 
    this._templates = theDocument.Templates;
    this._create = function(prefix, kind, domText) { 
      return this._templates.create(prefix, kind, domText);
    };
  };
})();