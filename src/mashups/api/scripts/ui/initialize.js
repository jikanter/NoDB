/* ======================
 * @package: WebDev.UI
 * WebDev.UI.createItem
 * ====================== */
WebDev.UI.createItem = function(item, kind) { 
  var item = null;
  switch(kind) { 
    case "option":
      item = WebDev.UI.createOptionItem(item);
    case "mode":
      item = WebDev.UI.createUiModeItem(item);
    default:
      item = WebDev.UI.createUiModeItem(item);
  }
  return item;
};

WebDev.UI._initialize = function() { 
    var createUiModeList = function(modes) { 
      if (modes == null || (typeof modes == "undefined")) { 
        /* create the ui mode list */
        var modes = ["lens", "facet", "coordinator", "coder", "viewPanel", "logo", "hiddenContent"];
      }
      var modeList = [];
      for (mode in modes) { 
        modeList.push(WebDev.UI.createItem(mode, "mode"));
      }
    };
    var createOptionList = function(views) { 
      if (views == null || (typeof views == "undefined")) { 
        /* create the option list */
        var views = ["infographic", "documentation", "compiled", "editor", "client", "storage"];
      }
      /* create the options list */
      var optionList = [];
      for (view in views) { 
        optionList.push(createItem(view, "option"));
      }
      return optionList;
    };
  };
  /*
   * create a simple exhibit view for the selector selector
   */
  var createSimpleExhibitView = function(selector) { 
    /* create a simple exhibit view and append it to the body of the document via the selector */
    return SimileAjax.DOM.createDOMFromString(
      "div",
      "<div id='exhibit-view-panel' ex:role='viewPanel'>"+
        "<table cellpadding='10' width='100%'>"+
          "<tr>"+
            "<td width='1'><span ex:content='"+selector+"' /></td>"+
          "</tr>"+
        "</table>"+
      "</div>"
    );
  };
  /* 
   * create a simple web development console
   */
  var createWebDevConsole = function() { 
    return SimileAjax.DOM.createDOMFromString(
      "tr",
      "<td width='1' style='margin: 1px;'><span wd:content='.currentVariables'>a,b,c</span></td>"+
      "<td width='1' style='margin: 1px;'><span wd:content='.currentCommand'>append</span></td>"+
      "<td width='1' style='margin: 1px;'><span wd:content='.lastCommand'>dispose</span></td>"+
      "<td width='1' style='margin: 1px;'><span wd:content='.commandHistory'>dispose,clear,a=1;b=2;c=3</span></td>"+
      "<td width='1' style='margin: 1px;'><span wd:content='.commandSelection'>null</span></td>"+
      "<td width='1' style='margin: 1px;'><span wd:content='.createReport'><a href='#'>createReport</a></span></td>"
    );
  };
  var createWebDevDesignUtility = function() { 
    var mkDesignTool = function(name) { return WebDev.Graphics.createDesignTool(name).elmt; };
    return SimileAjax.DOM.createDOMFromString(
      "table",
      "<thead>" + 
        "<th>images</th>" + 
        "<th>text</th>" + 
        "<th><a id='design-tool-tooltip' href='#'>?</a></th>" + 
      "</thead>" + 
      "<tbody>" +
       "<tr>" + 
        "<td>" + mkDesignTool("outlineImages") + "</td>" + 
       "</tr>" +  
       "<tr>" + 
         "<td>" + mkDesignTool("getImageMetadata") + "</td>" + 
         "<td>" + mkDesignTool("allCaps") + "</td>" + 
        "</tr>" +
        "<tr>" + 
          "<td>" + mkDesignTool("resizeImages") + "</td>" + 
          "<td>tool7</td>" +
          "<td>tool8</td>" + 
          "<td>tool9</td>" + 
         "</tr>" +
         "<tr>" + 
           "<td>" + mkDesignTool("concatenateImages") + "</td>" + 
           "<td>tool10</td>" + 
           "<td>tool11</td>" + 
           "<td>tool12</td>" + 
          "</tr>" +
          "<tr>" + 
            "<td>" + mkDesignTool("cropImages") + "</td>" +
          "</tr>" + 
          "<tr>" + 
            "<td>" + mkDesignTool("rotateImages") + "</td>" +
          "</tr>" + 
      "</tbody>" 
    );
  };
  /*
   * create a development console in the browser
   */
  var createConsole = function() { 
    var consoleTable = document.getElementById("webdev-console-table");
    if (consoleTable != null) { 
      var wdConsole = createWebDevConsole();
      consoleTable.appendChild(wdConsole.elmt);
      for (var i = 0; i < wdConsole.elmt.children.length; i++) { 
        try { 
          consoleTable.firstChild.appendChild(wdConsole.elmt.children[i]);
        } catch (e) { 
          // fall through
        }
      }
    }
    else { 
      consoleTable = document.getElementById("webdev-console-table");
      setTimeout('createConsole()');
    }
    var consoleObject = this;
    return consoleObject;
  };
  
  WebDev.Console = createConsole();
  
  /*
   * create the design utilities in the browser
   */
   var createDesignUtility = function() { 
     var designUtilityTable = document.getElementById("webdev-design-utility");
     if (designUtilityTable != null) { 
       var wdDesignUtility = createWebDevDesignUtility();
       designUtilityTable.appendChild(wdDesignUtility.elmt);
       for (var i = 0; i < wdDesignUtility.elmt.children.length; i++) { 
         try { 
          designUtilityTable.firstChild.appendChild(wdDesignUtility.elmt.children[i])
         } catch (e) { 
          // fall through
        }
      }
    }
    else { 
      designUtilityTable = document.getElementById("webdev-design-utility");
      setTimeout('createDesignUtility()');
    }
    var designUtilityObject = this;
    return designUtilityObject;
  };
  
WebDev.DesignUtility = createDesignUtility();

/* takes no arguments, and returns the xmlns: prefixes of a page without
   the xmlns prefixes as a list */
var xmlnsPrefixes = function() {
    var d = document.documentElement; 
    var c = []; 
    for (var i = 0; i < d.attributes.length; i++) { 
      c[i] = d.attributes[i].name.substring(d.attributes[i].name.indexOf("xmlns:"));
      // parse out the prefixes only
      c[i] = c[i].split(":")[1];
    } 
  return c;
};

/* takes no arguments, and returns the xmlns namespace as a dictionary 
  in which the keys are the namespaces, and the values are the urls of those namespaces */
var xmlnsNamespaces = function() { 
  var d = document.documentElement;
  var keys = xmlnsPrefixes();
  var h = {};
  for (var i = 0; i < d.attributes.length; i++) { 
    /* insert the data into the dictionary */
    h[keys[i]] = d.attributes[i].value;
  }
  return h;
};