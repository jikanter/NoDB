/* Remote Data Generator 
 * fires a dataLoaded event when the data is loaded
 */
WebDev.DataGenerator = function() { 
  this.currentTemplate = {};
  this.templateList = [];
  this._dataSource = {"location": "remote"};
  window._dataDatabase._dataGenerator = this;
  
  SimileAjax.WindowManager._dataListener = function() { 
    onDataLoaded: function() {}
  };
  
  /* is this right? */
  SimileAjax.ListenerQueue.add(SimileAjax.WindowManager._dataListener);
};

WebDev.DataGenerator.prototype.expandTemplate = function() { 
  if (this._dataSource["location"] == "remote") { 
    if (this._dataSource["url"] == null) { 
      if (window.location.origin) {
        this._dataSource["url"] = window.location.origin + "?datasrc=data.js";
      }
      else { 
        this._dataSource["url"] = window.location.protocol + window.location.host + "?datasrc=data.js";
      }
    }
  }
};

WebDev.DataGenerator.prototype.expandTemplates = function() { 
  for (var i = 0; i < this.templateList.length; i++) { 
    WebDev.DataGenerator.expandTemplate(this.templateList[i]);
  }
};