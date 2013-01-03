/*
 * Web Developer UI
 */
WebDev.UI = new Object();

/*----------------------------------------------------------------------
 *  Component instantiation functions
 *----------------------------------------------------------------------
 */
WebDev.UI.create = function(configuration, elmt, uiContext) { 
  if (configuration == null || configuration.length == 0) {
    var configuration = {role: "utility"};
  }
  WebDev.UI.Configuration = function() { return configuration; }
  WebDev.UI.Process = function() { 
    var cont = function() {};
    return cont;
  };
  
  if ("headlessP" in configuration) { 
    var headless = configuration.headless;
  }
  if ("offlineP" in configuration) { 
    var offline = configuration.offline;
   }
  if ("developerModeP" in configuration) { 
    var developer = configuration.developer;
  }
  if ("role" in configuration) { 
    var role = configuration.role;
    /* support both the exhibit role definitions and the webdev role definitions */
    if (role != null && (role.startsWith("webdev-") || role.startsWith("exhibit-"))) { 
      if (role.startsWith("webdev-")) { 
        role = role.substr("webdev-".length);
      }
      if (role.startsWith("exhibit-")) { 
        role = role.substr("exhibit-".length);
      }
    }
  
  
  switch (role) { 
    case "view":
      WebDev.UI.createView(configuration, elmt, uiContext);
    case "utility":
      WebDev.UIContext.registerUtility(configuration, elmt, uiContext);
      return null;
    case "widget":
      WebDev.UIContext.registerWidget(configuration, elmt, uiContext);
      return null;
    case "model":
      WebDev.Model.registerModel(configuration, elmt, uiContext);
      return null;
    case "platform":
      WebDev.Platform.registerPlatform(configuration, elmt, uiContext);
      return null;
    case "asset":
      WebDev.Asset.registerAsset(configuration, elmt, uiContext);
      return null;
    }
  }
  
  return null;
};
/*
 * WebDev.UI
 */
WebDev.UI.createUtility = function(configuration, elmt, uiContext) { 
  var utilityClass = "utilityClass" in configuration ? configuration.utilityClass : WebDev.nullUtility;
  if (utilityClass) { 
    if (typeof utilityClass == "string") { 
      utilityClass = WebDev.UI.utilityClassNameToUtilityClass(utilityClass);
    }
    return utilityClass.create(configuration, elmt, uiContext);
  }
  else { 
    setTimeout('WebDev.ui.createUtility()', 15);
  }
};

WebDev.UI.createView = function(configuration, elmt, uiContext) { 
  var viewClass = "viewClass" in configuration ? configuration.viewClass : Exhibit.TileView;
  if (viewClass) { 
    if (typeof viewClass == "string") { 
      viewClass = Exhibit.UI.viewClassNameToViewClass(viewClass);
    }
    return viewClass.create(configuration, elmt, uiContext);
  }
  else { 
    setTimeout('Exhibit.UI.createView()', 15);
  }
};

WebDev.UI.createWidget = function(configuration, elmt, uiContext) { 
  var widgetClass = "widgetClass" in configuration ? configuration.widgetClass : WebDev.BlankWidget;
  if (widgetClass) { 
    if (typeof widgetClass == "string") { 
      widgetClass = WebDev.UI.widgetClassNameToWidgetClass(widgetClass);
    }
    return widgetClass.create(configuration, elmt, uiContext);
  }
  else { 
    setTimeout('WebDev.UI.createWidget()', 15);
  }
};

WebDev.UI.viewClassNameToViewClass = function(name) { 
  if (name != null && name.length > 0) { 
    try { 
      return Exhibit.UI._stringToObject(name, "View");
    } catch (e) { 
      SimileAjax.Debug.warn("Unknown viewClass " + name);
    }
  }
  return Exhibit.TileView;
};

WebDev.UI.utilityClassNameToUtilityClass = function(name) { 
  if (name != null && name.length > 0) { 
    try { 
      return Exhibit.UI._stringToObject(name, "Utility");
    } catch (e) { 
      SimileAjax.Debug.warn("Unknown utilityClass " + name);
    }
  }
  return WebDev.nullUtility;
};
/*
 * WebDev.UI page creation and page element creation functions
 */

WebDev.SimpleListFacet = function(containerElmt, uiContext) { 
  this._facet = new Exhibit.ListFacet(containerElmt, uiContext);
  this._sort = function(a, b) { return this.a.selectionLabel.localeCompare(b.selectionLabel); }
  this._combine = function(a, b) { return [].concat(a, b); }
  this.createDropDown = function(containerElmt, uiContext) {
    this.topElementContainer = document.createElement('div');
    this.topElementContainer.appendChild(containerElement);
  }
}; 

WebDev.UI.createInodePage = function(pageToLoad, insertionPoint, frameWidth, frameHeight) { 
   insertionPoint = insertionPoint || "frameInsertionPoint";
   frameWidth = (typeof frameWidth == "string") ? parseInt(frameWidth) : 800;
   frameHeight = (typeof frameHeight == "string") ? parseInt(frameHeight) : 400;
   var loader = document.createElement("iframe");
   loader.setAttribute("src", pageToLoad);
   loader.height = frameHeight;
   loader.width = frameWidth;
   document.getElementById(insertionPoint).appendChild(loader);
   return loader;
};

WebDev.UI.createOptionItem = function(item, prefix) { 
  prefix = prefix || "webdev";
  var h3 = document.createElement("h3");
  var a = document.createElement("a");
  a.setAttribute("href", prefix+".html?"+prefix+"-view-"+item);
  var anchor = document.createTextNode("Webdev."+item[0].toUpperCase()+item.slice(1,item.length));
  a.appendChild(anchor);
  h3.appendChild(a);
};

WebDev.UI.createModeItem = function(mode, namespace) { 
  if (namespace == "undefined" || namespace == null) { namespace = "ex" };
  if (mode == "undefined" || mode == null) { mode = "mode" };
  var modeItem = document.createElement("li");
  modeItem.setAttribute(namespace + ":" + mode, mode);
  return modeItem;
};

WebDev.UI.createDeveloperMode = function(mode) { 
  return WebDev.UI.createModeItem(mode, "wd");
};