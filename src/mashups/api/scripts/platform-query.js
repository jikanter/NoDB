/* query the platform via the SimileAjax api 
 * package: Webdev
 */
if (typeof WebDev == "undefined") { 
  var WebDev = new Object();
}
WebDev.PlatformQuery = function() { 
  var registered = [];
  var utils = [];
  var qResults = "";
  var qlLanguage = "sparql";
  var qlLanguagesSupported = [];
  return this;
};

WebDev.PlatformQuery.WindowManager = function() { 
  return (SimileAjax.WindowManager ? SimileAjax.WindowManager : new Object());
};

WebDev.PlatformQuery.Tools = {
  nameToFunctionName: function() { 
    /* convert a function name as an attribute into its name as a string. i.e. camelize */
    var parts = this.name.split("-");
    var capitalizedLetter = parts[1].charAt(0).toUpperCase();
    var fname = parts[0] + capitalizedLetter + parts[1].substring(1);
    return fname;
  },
  nameToMethods: function() { 
    /* convert a function name into its corresponding methods */
    this.fname = this.nameToFunctionName();
    this.methods = this.methods.split(",");
    for (var i = 0; i < this.methods.length; i++) { 
      this.fname[this.methods[i]] = this[this.methods[i]];
    }
    return this;
  },
  facetLogging: function() { 
    return { 
    name : "facet-logging",
    methods: "start,stop,print",
    start: function() { 
      if (!this.logging) { 
        this.logging = {};
      }
      this.logging.started = true;
      this.logging.level = 1;
    },
    stop: function() { 
      if (!this.logging) { 
        this.logging = {};
      }
      this.logging.started = false;
      this.logging.level = 0;
    },
    print: function() { 
      if (!this.logging) { 
        this.logging.started = false;
        this.logging = {}; 
        this.logging.level = 0;  
      }
      document.write(this.logging.level);
      }
    }
  },
  domLogging: function() { 
    return { 
    name: "dom-logging",
    methods: "start,stop",
    start: function() { 
      if (!this.logging) { 
        this.logging = {};
      }
      this.logging.started = true;
      this.logging.level = 1;
    },
    stop: function() { 
      if (!this.logging) { 
        this.logging = {};
      }
      this.logging.started = false;
      this.logging.level = 0;
      }
    }
  },
  transportLogging: function() { 
    return { 
    name: "transport-logging",
    methods: "start,stop",
    start: function() { 
      if (!this.logging) { 
        this.logging = {};
      }
      this.logging.started = true;
      this.logging.level = 1;
    },
    stop: function() { 
      if (!this.logging) { 
        this.logging = {};
      }
      this.logging.started = false;
      this.logging.level = 0;
      }
    }
  },
  chromeLogging: function() { 
    return { 
      name: "chrome-logging",
      methods: "start,stop",
      start: function() { 
        if (!this.logging) { 
          this.logging = {};
        }
        this.logging.started = true;
        this.logging.level = 1;
      },
      stop: function() { 
        if (!this.logging) { 
          this.logging = {};
        }
        this.logging.started = false;
        this.logging.level = 0;
      }
    }
  },
  tabLogging: function() { 
    return { 
      name: "tab-logging",
      methods: "start,stop",
      start: function() { 
        if (!this.logging) { 
          this.logging = {};
        }
        this.logging.started = true;
        this.logging.level = 1;
      },
      stop: function() { 
        if (!this.logging) { 
          this.logging = {};
        }
        this.logging.started = false;
        this.logging.level = 0;
      }
    }
  },
  facetRotate: function() { 
    return { 
    name: "facet-rotate",
    methods: "prev,next",
    facets: [],
    facetIndex: 0,
    prev: function() { 
      /* return the previous facet, unless we are at the beginning in which case we return the
       * last facet. together with F{next} implements a facet ring.
       */
      if (this.facetIndex == 0) { 
        this.facetIndex = this.facets.length;
      }
      return this.facetIndex;
    },
    next: function() { 
      /* return the next facet, unless we are at the end in which case we return
       * the first facet. together with F{prev} implements a facet ring.
       */
      if (this.facetIndex == this.facets.length) { 
        this.facetIndex = 0;
      }
      return this.facets[this.facetIndex];
      },
    }
  }
}