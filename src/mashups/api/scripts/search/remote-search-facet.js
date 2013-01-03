/**==================================================
  *  @file: remote-search-facet.js
  *  WebDev.RemoteSearchFacet
  *  Remote Search Implementation for javascript
  *==================================================
  */
WebDev.RemoteSearchFacet = function(containerElmt, uiContext) { 
  this._div = containerElmt;
  this._uiContext = uiContext;
  this._localSearch = new Exhibit.TextSearchFacet(containerElmt, uiContext);
  this._searchCache = new Exhibit.TextSearchFacet(containerElmt, uiContext);
  this._searchKb = new Exhibit.TextSearchFacet(containerElmt, uiContext);
  
  this._expressions  = [];
  this._text = null;
  
  this._settings = {};
  this._dom = null;
  this._timerID = null;
  
  var self = this;
  this._listener = {
    onRootItemsChanged: function() { 
      if ("_itemToValue" in self) { 
        delete self._itemToValue;
      }
    }
  };
  uiContext.getCollection().addListener(this._listener);
};

WebDev.RemoteSearchFacet._settingSpecs = {
  "facetLabel":      { type: "text" },
  "queryParamName":  { type: "text" },
  "requiresEnter":   { type: "boolean", defaultValue: false }
};

WebDev.RemoteSearchFacet.create = function(configuration, containerElmt, uiContext) { 
  var uiContext = Exhibit.UIContext.create(configuration, uiContext);
  var facet = new WebDev.RemoteSearchFacet(containerElmt, uiContext);
  
  WebDev.RemoteSearchFacet._configure(facet, configuration);
  
  facet._initializeUI();
  uiContext.getCollection().addFacet(facet);
  
  return facet;
};

WebDev.RemoteSearchFacet.createFromDOM = function(configElmt, containerElmt, uiContext) { 
  var configuration = Exhibit.getConfigurationFromDOM(configElmt);
  var uiContext = Exhibit.UIContext.createFromDOM(configElmt, uiContext);
  var facet = new WebDev.RemoteSearchFacet(
    containerElmt != null ? containerElmt : configElmt,
    uiContext
  );
  
  Exhibit.SettingsUtilities.collectSettingsFromDOM(configElmt, WebDev.RemoteSearchFacet._settingSpecs, facet._settings);
  
  try { 
      var s = Exhibit.getAttribute(configElmt, "expressions");
      if (s != null && s.length > 0) { 
        facet._expressions = Exhibit.ExpressionParser.parseSeveral(s);
      }
      
      var query = Exhibit.getAttribute(configElmt, "query");
      if (query != null && query.length > 0) { 
        facet._text = query;
      }
    } catch (e) { 
      SimileAjax.Debug.exception(e, "TextSearchFacet: Error processing configuration of list facet");
    }
    WebDev.RemoteSearchFacet._configure(facet, configuration);
    
    facet._initializeUI();
    uiContext.getCollection().addFacet(facet);
    
    return facet;
};

WebDev.RemoteSearchFacet._configure = function(facet, configuration) { 
  Exhibit.SettingsUtilities.collectSettings(configuration, WebDev.RemoteSearchFacet._settingSpecs, facet._settings);
  
  if ("expressions" in configuration) { 
    for (var i = 0; i < configuration.expressions.length; i++) { 
      facet._expressions.push(Exhibit.ExpressionParser.parse(configuration.expressions[i]));
    }
  }
  if ("selection" in configuration) { 
    var selection = configuration.selection;
    for (var i = 0; i < selection.length; i++) { 
      facet._valueSet.add(selection[i]);
    }
  }
  if ("query" in configuration) { 
    facet._text = configuration.query;
  }
  if ("queryParamName" in facet._settings) { 
    var params = SimileAjax.parseUrlParameters();
    if (facet._settings["queryParamName"] in params) { 
        facet._text = params[facet._settings["queryParamName"]];
    }
  }
  if (!("facetLabel" in facet._settings)) { 
    facet._settings.facetLabel = "";
  }
};

WebDev.RemoteSearchFacet.prototype.dispose = function() { 
  this._uiContext.getCollection().removeFacet(this);
  
  this._uiContext.getCollection().removeListener(this._listener);
  this._uiContext = null;
  
  this._div.innerHTML = "";
  this._div = null;
  this._dom = null;
  
  this._expressions = null;
  this._itemToValue = null;
  this._settings = null;
};

WebDev.RemoteSearchFacet.prototype.hasRestrictions = function() { 
  return this._text != null;
};

WebDev.RemoteSearchFacet.prototype.clearAllRestrictions = function() { 
  var restrictions = this._text;
  if (this._text != null) { 
    this._text = null;
    this._notifyCollection();
  }
  this._dom.input.value = "";
  
  return restrictions;
};

WebDev.RemoteSearchFacet.prototype.applyRestrictions = function(restrictions) { 
  Exhibit.TextSearchFacet.applyRestrictions(restrictions);
};

WebDev.RemoteSearchFacet.prototype.setText = function(text) { 
  Exhibit.TextSearchFacet.setText(text);
};

WebDev.RemoteSearchFacet.prototype.restrict = function(items) { 
  if (this._text == null) { 
    return items;
  } else { 
    this._buildMaps();
    
    var set = new Exhibit.Set();
    var itemToValue = this._itemToValue;
    var text = this._text.toLowerCase();
    
    items.visit(function(item) { 
      if (item in itemToValue) { 
        var values = itemToValue[item];
        for (var v = 0; v < values.length; v++) { 
          if (values[v].indexOf(text) >= 0) { 
            set.add(item);
            break;
          }
        }
      }
    });
    return set;
  }
};

WebDev.RemoteSearchFacet.prototype.update = function(items) { 
  /* nothing to do */
};

WebDev.RemoteSearchFacet.prototype._notifyCollection = function() { 
  this._uiContext.getCollection().onFacetUpdated(this);
};

WebDev.RemoteSearchFacet.prototype._initializeUI = function() { 
  var self = this;
  this._dom = WebDev.RemoteSearchFacet.constructFacetFrame(this._div, this._settings.facetLabel);
  
  if (this._text != null) { 
    this._dom.input.value = this._text;
  }
  
  SimileAjax.WindowManager.registerEvent(this._dom.input, "keyup", 
    function(elmt, evt, target) { self._onTextInputKeyUp(evt); });
};

WebDev.RemoteSearchFacet.constructFacetFrame = function(div, facetLabel) { 
  if (facetLabel !== "" && facetLabel !== null) { 
    return SimileAjax.DOM.createFromDOMFromString(
        div,
        "<div class='exhibit-facet-header'>" + 
          "<span class='exhibit-facet-header-title'>" + facetLabel + "</span>" + 
        "</div>" + 
        "<div class='exhibit-text-facet'><input type='text' id='input'></div>"
    );
  } else { 
    return SimileAjax.DOM.createFromDOMFromString(
        div,
        "<div class='exhibit-text-facet'><input type='text' id='input'></div>"
    );
  }
};

WebDev.RemoteSearchFacet.prototype._onTextInputKeyUp = function(evt) { 
  if (this._timerID != null) { 
    window.clearTimeout(this._timerID);
  }
  var self = this;
  if (this._settings.requireEnter == false) { 
      this._timerID = window.setTimeout(function() {  self._onTimeout(); }, 500);
  } else { 
    var newText = this._dom.input.value.trim();
    if (newText.length == 0 || evt.keyCode == 13) { // arbitrary
      this._timerID = window.setTimeout(function() { self._onTimeout(); }, 0);
    }
  }
};

WebDev.RemoteSearchFacet.prototype._onTimeout = function() { 
  this._timerID = null;
  
  var newText = this._dom.input.value.trim();
  if (newText.length == 0) { 
    newText = null;
  }
  
  if (newText != this._text) { 
    var self = this;
    var oldText = this._text;
    
    SimileAjax.History.addLengthyAction(
      function() { self.setText(newText); },
      function() { self.setText(oldText); },
      newText != null ? 
        String.substitute(
          Exhibit.FacetUtilities.l10n["facetTextSearchActionTitle"],
          [ newText ]) : 
        Exhibit.FacetUtilities.l10n["facetClearTextSearchActionTitle"]
    );
  }
}

WebDev.RemoteSearchFacet.prototype._buildMaps = function() { 
  if (!("_itemToValue" in this)) { 
    var itemToValue = {};
    var allItems = this._uiContext.getCollection().getAllItems();
    var database = this._uiContext.getDatabase();
    
    if (this._expressions.length > 0) { 
      var expressions = this._expressions;
      allItems.visit(function(item) { 
        var values = [];
        for (var x = 0; x < expressions.length; x++) { 
          var expression = expressions[x];
          expression.evaluateOnItem(item, database).values.visit(function(v) { values.push(v.toLowerCase()); });
        }
        itemToValue[item] = values;
      });
    } else { 
      var propertyIDs = database.getAllProperties();
      allItems.visit(function(item) { 
        var values = [];
        for (var p = 0; p < propertyIDs.length; p++) { 
          database.getObjects(item, propertyIDs[p]).visit(function(v) { values.push(v.toLowerCase()); });
        }
        itemToValue[item] = values;
      });
    }
    
    this._itemToValue = itemToValue;
  }
};