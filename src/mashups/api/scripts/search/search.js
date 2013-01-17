/**
 * @file: Search.js
 * @fileoverview: Basic search javascript search module. Differs from L{Exhibit.TextSearchFacet} in that it 
 * queries generically rather than just querying exhibit database elements.
 * 
 */
WebDev.Search = function() { 
  var base = {};
  var QueryString = {};
  var Results = {};
  var qjsLoaded = false; /* Is querystring.js loaded yet */
  var searchWidgets = {};
};

WebDev.Search._SimpleQuery = function(query, appendTo) { 
  if ((appendTo == null) || (appendTo == '')) { appendTo = document.body; }
  var q = function(query, appendResultsTo) {
    var htmlEscape = function(s) { 
      s = s.replace(/&amp;/g, '&amp;amp;');
      s = s.replace(/&gt;/g, '&amp;gt;');
      s = s.replace(/&lt;/g, '&amp;lt;');
      return s
    };
    
    var attrQuoteEscape = function(s) { 
      s = s.replace(/&amp;/g, '&amp;amp;');
      s = s.replace(/&quot;/g, '&amp;quot;');
      return s;
    };
    var n = 0;
    if (query != null) { 
      query = query.toLowerCase();
      var resultsContainer = document.createElement('div');
      resultsContainer.setAttribute("id", "searchResults");
      var z = document.links;
      for (var i = 0; i < z.length; ++i) { 
        if ((z[i].innerHTML & z[i].innerHTML.toLowerCase().indexOf(query) != -1) || z[i].href.toLowerCase().indexOf(query) != -1) { 
          // build the search result and result container. Append it to the results container
          var resultItemContainer = document.createElement('span');
          resultItemContainer.setAttribute('class', 'searchResult');
          var resultItem = document.createElement('a');
          resultItem.setAttribute('href', attrQuoteEscape(z[i].href));
          resultItem.appendChild(document.createTextNode(z[i].innerHTML || htmlEscape(z[i].href)));
          resultItemContainer.appendChild(resultItem);
          resultsContainer.appendChild(resultItemContainer);
        }
      }
    }
    appendTo.appendChild(resultsContainer);
    return resultsContainer;
  };
  return q(query, appendTo);
};
/* 
 * @name: WebDev.Search.Query
 * 
 */
WebDev.Search.Query = function(query, appendResultsTo, facetSearch, uiContext) {
  /*
   * @param facetSearch: the L{Webdev.RemoteSearchFacet} containerElmt to pass.
   */
  // check to see if it is a facet search, and if so, do a simple query
  // if it is a facetSearch, the facetSearch parameter 
  // contains the parentElement of the uiContext with which to do the search
  self.Results = {0: null};
  if ((facetSearch == null) || ((typeof uiContext == 'undefined') || (uiContext == null))) { 
    self.Results[0] = WebDev.Search._SimpleQuery(query, appendResultsTo);
  }
  else { 
    self.Results[0] = new WebDev.RemoteSearchFacet(facetSearch, uiContext);
  }
  return self.Results;
};