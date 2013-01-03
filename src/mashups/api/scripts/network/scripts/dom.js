/*==================================================
 * WebDev.Network.DOM
 *==================================================
 */
Network.DOM = new Object();

Network.DOM.createDOMFromTemplate = function(template) { 
  var result = {};
  result.elmt = WebDev.Network.DOM._createDOMFromTemplate(template, result, null);
  
  return result;
};

Network.DOM._createDOMFromTemplate = function(templateNode, result, parentElmt) { 
  if (templateNode == null) { 
    /*
    var node = doc.createTextNode("--null--");
    if (parentElmt != null) {
        parentElmt.appendChild(node);
    }
    return node;
    */
    return null;
  } else if (typeof templateNode != "object") { 
    var node = document.createTextNode(templateNode);
    if (parentElmt != null) { 
      parentElmt.appendChild(node);
    }
    return node;
  } else { 
    var elmt = null;
    if ("tag" in templateNode) { 
      var tag = templateNode.tag;
      if (parentElmt != null) { 
        if (tag == "tr") { 
          elmt = parentElmt.insertRow(parentElmt.rows.length);
        } else if (tag == "td") { 
          elmt = parentElmt.insertCell(parentElmt.cells.length);
        }
      }
      if (elmt == null) { 
        elmt = tag == "input" ? 
          Exhibit.DOM.createInputElement(templateNode.type) : 
          document.createElement(tag);
          
        if (parentElmt != null) { 
          parentElmt.appendChild(elmt);
        }
      }
    } else { 
      elmt = templateNode.elmt;
      if (parentElmt != null) { 
        parentElmt.appendChild(elmt);
      }
    }
    
    for (var attribute in templateNode) { 
      var value = templateNode[attribute];
      
      if (attribute == "field") { 
        result[value] = elmt;
      
      } else if (attribute == "className") { 
        elmt.className = value;
      } else if (attribute == "id") { 
        elmt.id = value;
      } else if (attribute == "title") { 
        elmt.title = value;
      } else if (attribute == "type" && elmt.tagName == "input") { 
        // do nothing
      } else if (attribute == "style") { 
        for (n in value) { 
          var v = value[n];
          if (n == "float") { 
            n = Exhibit.Platform.browser.isIE ? "styleFloat" : "cssFloat";
          }
          elmt.style[n] = v;
        }
      } else if (attribute == "children") { 
        for (var i = 0; i < value.length; i++) { 
          WebDev.Network.DOM._createDOMFromTemplate(value[i], result, elmt);
        }
      } else if (attribute != "tag" && attribute != "elmt") { 
        elmt.setAttribute(attribute, value);
      }
    }
    return elmt;
  }
};