/*
 * Miscellaneous logging utilities for mashing up data
 */
WebDev.Logging = function() { 
  this._level = null; /* log level. set to a number > 0 for any real logging. */
  this.content = "Miscellaneous Utilities for Offline Web Applications, Api Mashups and Web Design.";
  this.createLog = function() { 
    this.startLog();
  };
  this.startLog = function(what) { 
    if (!(what == "facet" || what == "dom" || what == "configuration")) { 
      return null;
    }
    var _fl = {};
    var _timer = { 
      start: 0,
      end: 1000,
      step: function() { 
        var e = params[evt] ? params[evt] : null;
        return e;
      }
    };
    _fl.timer = _timer;
    _fl.step();
    return _fl;
  };
  this.logAtLevel = function(level) { 
    this._level = level;
  };
  this.logFacet = function() { 
    return this.startLog("facet");
  };
  this.logDom = function() { 
    return this.startLog("dom");
  };
  this.logConfiguration = function() { 
    return this.startLog("configuration");
  };
  this.init = function() { 
    var doStep = function() { 
      return this.logFacet.step;
    };
    return doStep;
  };
  return {
    attributes: {
      logConfiguration: this.logConfiguration,
      logFacet: this.logFacet,
      logDom: this.logDom,
      init: this.init,
      isiLevel: 3,
      debugLevel: 100,
      _console: {},
      w: this,
      p: function() { return params ? params : null },
      transport: function() { 
        var message = console && console(params[message]);
        return message;
      }
    }
  };
};
