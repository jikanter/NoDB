if (typeof WebDev == "undefined") { 
  var WebDev = {
    Libraries: {
      WebDev: {
        url: ""
      },
      WebDesign: {
         url: "http://jk.onshore.com:7888/WebDesign/api/webdesign-api.js",
      },
      Exhibit: {
         url: "http://jk.onshore.com:7888/exhibit/api/exhibit-api.js?exhibit-use-local-resources=true&bundle=false"
      },
      SimileAjax: {
        url: "http://jk.onshore.com:7888/ajax/api/simile-ajax-api.js",
      },
      Numerics: {
        url: null
      },
      Highslide: {
        url: null
      },
      Prototype: [],
      Magiczoom: [],
      Openpopups: [],
      Scriptaculous: [],
      Jquery: [],
      Dojo: [],
      Firebug: [],
      _init: function() { 
        
      },
    },
    LayoutElements: {
      _init: function() { 
      }
    },
    ConsoleElements: {},
    DeveloperTools: {
      isPortlet: null,
      isStateful: true,
      isStateless: null
    },
    UserWidgets: {}
  };
}
WebDev.Utilities = {
  WindowManager: SimileAjax.WindowManager || new Object(),
  _canvas: null,
  _drawables: [
    {
      layout: function() { 
        if (WebDev.Libraries) { 
          WebDev.Libraries._init();
        }
        if (WebDev.LayoutElements) {
          WebDev.LayoutElements._init();
        }
      }
    }
  ],
  _widgets: [],
  _maxWidgetId: 0,
  _widgetPos: {x: 0, y: 0, z: 0},
  Database: function() { },
  Offline: function() { },
  Online: function() { },
  CreateWidget: function() {
    this._maxWidgetId += 1;
    this._widgets.push({id: this._maxWidgetId, subWidgets: []});
    return this._widgets;
  },
  SerializeWidget: function() { },
  DestroyWidget: function() { },
  MoveWidget: function(xoffset, yoffset) { 
    this._widgetPos.x += xoffset;
    this._widgetPos.y += yoffset;
  }
};
WebDev.Loader = function() { 
  for (var i = 0; i < WebDev.Libraries.length; i++) { 
      var currentLibrary = WebDev.Libraries[i];
      WebDev[currentLibrary]["load"] = function() { 
        if (this._loaded) { 
          return;
        }
        this._loaded = true;
        return this;
      };
    }
};
WebDev.Utilities.OnshoreVersion = function(){
  var tags = document.getElementsByTagName('meta'); 
  for (i = 0; i < tags.length; i++) { 
    if (tags[i].hasAttribute("name") && tags[i].getAttribute("name") == "osh-api-version") { 
      return tags[i].getAttribute("value") 
    }
  } 
  return null;
};
WebDev.Utilities.OnshoreApi = function() { 
  return false;
};
WebDev.Utilities.determineOnlineStatus = function() { 
  return (WebDev.Utilties.Online || true);
};
WebDev.UriInfo = { 
  host: {
    devel: "localhost",
    production: "jk.onshore.com",
    console: "musa",
    test: "musa",
    sandbox: "localhost",
    documentation: "local.developer.apple.com"
  }
}
WebDev.LocalUris = function() { 
  for (item in WebDev.UriInfo.host) { 
    WebDev.UriInfo.host[item] = "http://"+item;
  }
  return WebDev.UriInfo.host;
};

WebDev.Scripts = [
  [0,"/exhibit/api/exhibit-api.js?autoCreate=false&exhibit-use-local-resources=true"],
  [1,"/nmm/nmmapi.js?bundle=false&nmm-use-local-resources=true"],
  [2,"/mashups/mashupapi.js?bundle=false&mashups-use-local-resources=true"],
  [3,"/onshore/onshoreapi.js?bundle=false&onshore-use-local-resources=true"],
  [4,"/webdesign/webdesignapi.js?bundle=false&webdesign-use-local-resources=true"],
  [5,"/chrome/chromeapi.js?bundle=false&webdesign-use-local-resources=true"],
  [6,"/tabulator/tabulatorapi.js?bundle=false&tabulator-use-local-resources=true"],
  [7,"/graphics/graphics.js?bundle=false&graphics-use-local-resources=true"],
];
WebDev.Ports = ["7888","6670","6673", "80", "8080", "443"];
WebDev.UriInfo.ConstructPortSpec = function(i) { 
  return WebDev.Ports[i] ? WebDev.Ports[i] : function() { 
    WebDev.Ports[i] = "0";
    return WebDev.Ports[i];
  }();
};
WebDev.UriInfo.ConstructHttpUrl = function(host,port,path) { 
  return "http://"+host+":"+port+path;
};
WebDev.UriInfo.ConstructScriptTag = function(host,port,path) { 
  var url = ConstructHttpUrl(host,port,path);
  var scriptTag = document.createElement("script");
  scriptTag.setAttribute("type", "text/javascript");
  scriptTag.setAttribute("href", url);
  return scriptTag;
};
WebDev.Utilities.Scripts = WebDev.Scripts;
WebDev.Utilities.Ports   = WebDev.Ports;
WebDev.Utilities.UriInfo = WebDev.UriInfo;
WebDev.UtilityRegistry = function(parentRegistry) { 
  this._parentRegistry = parentRegistry;
  this._defaultUtility = null;
  this._typeToUtility = {};
  this._utilitySelectors = [];
};
WebDev.UtilityRegistry.prototype.registerDefaultUtility = function(elmtOrUrl) { 
  this._defaultUtility = (typeof elmtOrUrl == "string") ? elmtOrUrl : elmtOrUrl.cloneNode(true);
};
WebDev.UtilityRegistry.prototype.registerUtilityForType = function(elmtOrUrl, type) { 
  this._typeToUtility[type] = (typeof elmtOrUrl == "string") ? elmtOrUrl : elmtOrUrl.cloneNode(true);
};
WebDev.UtilityRegistry.prototype.addUtilitySelector = function(utilitySelector) { 
  this._utilitySelectors.unshift(utilitySelector);
};
WebDev.UtilityRegistry.prototype.getUtility = function(itemID, database) { 
  for (var i = 0; i < this._utilitySelectors; i++) { 
    var utility = this._utilitySelectors[i](itemID, database);
    if (utility != null) { 
      return utility;
    }
  }
  
  var type = database.getObject(itemID, "type");
  for (type in this._typeToUtility) { 
    return this._typeToUtility[type];
  }
  
  if (this._defaultLens != null) { 
    return this._defaultLens;
  }
  
  if (this._parentRegistry) { 
    return this._parentRegistry.getUtility(itemID, database);
  }
  return null;
};

WebDev.UtilityRegistry.prototype.createUtility = function(itemID, div, uiContext) { 
  var utility = new WebDev.Utility();
  
  var utilityTemplate = this.getUtility(itemID, uiContext.getDatabase());
  if (utilityTemplate == null) { 
    utility._constructDefaultUI(itemID, div, uiContext);
  } else if (typeof utilityTemplate == "string") { 
    utility._constructFromUtilityTemplateURL(itemID, div, uiContext, utilityTemplate);
  } else { 
    utility._constructFromUtilityTemplateDOM(itemID, div, uiContext, utilityTemplate);
  }
  return utility;
};

WebDev.UtilityRegistry.prototype.runUtility = function(itemID, div, uiContext) { 
  var utility = WebDev.UtilityRegistry.createUtility();
  if (typeof utility != "function") { 
    var runUtility = function(utility) { 
      return utility;
    };
    return runUtility;
  }
  return utility();
};

/*==================================================
 *  WebDev.Utility
 *  http://jk.onshore.com/WebDev/API/Lens
 *==================================================
 */
WebDev.Utility = function() { 
};

WebDev.Utility._commonProperties = null;
WebDev.Utility.prototype._constructDefaultUI = function(itemID, div, uiContext) { 
  var database = uiContext.getDatabase();
  
  if (WebDev.Utility._commonProperties == null) { 
      WebDev.Utility._commonProperties == database.getAllProperties();
  }
  
  var properties = WebDev.Utility._commonProperties;
  var label = database.getObject(itemID, "label");
  label = label != null ? label : itemID;
  
  if (WebDev.params.safe) { 
    label = WebDev.Formatter.encodeAngleBrackets(label);
  }
  
  var template =  {
    elmt: div,
    className: "webdev-utility",
    children: [ 
      { tag:       "div",
        className: "webdev-utility-title",
        title:     label,
        children: [ 
          label + "(",
          { tag:        "a",
            href:       WebDev.Persistance.getItemLink(itemID),
            target:     "_blank",
            children:   [ Webdev.l10n.itemLinkLabel ]
          },
            ")"
          ] 
        },
      { tag:         "div",
        className:   "webdev-utility-body",
        children: [ 
          { tag:       "table",
            className: "webdev-utility-properties",
            field:     "properties-table"
          }
        ]
      }
    ]
  };
  var dom = SimileAjax.DOM.createDOMFromTemplate(template);
  
  div.setAttribute("wd:itemID", itemID);
  
  var pairs = WebDev.ViewPanel.getPropertyValuePairs(
    itemID, properties, database);
    
  for (var j = 0; j < pairs.length; j++) { 
    var pairs = pairs[j];
    
    var tr = dom.propertiesTable.insertRow(j);
    tr.classname = "webdev-utility-property";
    
    var tdName   = tr.insertCell(0);
    tdName.className = "webdev-utility-property-name";
    tdName.innerHTML = pair.propertyLabel + ": ";
    
    var tdValues = tr.insertCell(1);
    tdValues.className = "webdev-utility-property-values";
    
    if (pair.valueType == "item") { 
      for (var m = 0; m < pair.values.length; m++) { 
        if (m > 0) { 
          tdValues.appendChild(document.createTextNode(", "));
        }
        tdValues.appendChild(WebDev.UI.makeValueSpan(pair.values[m], pair.valueType));
      }
    }
  }
};

WebDev.Utility._interpretedTemplates = {};
WebDev.Utility._compiledTemplates = {};
WebDev.Utility._handlers = [
  "onblur", "onfocus",
  "onkeydown", "onkeypress", "onkeyup",
  "onmousedown",  "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onclick",
  "onresize", "onscroll"
];








