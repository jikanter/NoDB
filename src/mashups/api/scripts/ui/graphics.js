/* 
 * @package: WebDev.Graphics
 */
if (typeof WebDev == "undefined") { 
  var WebDev = {};
}
/* Check for jQuery, and set it */
if (typeof jQuery != "undefined") {
  WebDev.jQuery = jQuery;
}
if (typeof jQuery == "undefined" && (typeof SimileAjax.jQuery != "undefined")) {
  /* SimileAjax defines jQuery, set jQuery to SimileAjax.jQuery */
  WebDev.jQuery = SimileAjax.jQuery;
}
if (WebDev.Graphics == null || WebDev.Graphics == "undefined") { 
  WebDev.Graphics = {}; 
}
WebDev.Graphics.DataSet = {};
WebDev.Graphics.Tools = {};

WebDev.Graphics._points = [
  [1,2],
  [3,4],
  [5,6],
  [7,8]
];

WebDev.Graphics.creatorSelectors = {
  "blob": ".blob",
  "widget": ".widget",
  "pixel": ".pixel",
  "transform": ".transform",
  "action": ".action"
};

WebDev.Graphics._designTool = function(name, uiContext) { 
  this._name = name;
  this._context = uiContext;
  this.elmt = "<a href='#'>" + this._name + "</a>";
};

WebDev.Graphics.Tools.attachCreators = function(selector) { 
  WebDev.jQuery("div").filter(selector).each(function() { 
    WebDev.jQuery(this).click(function() { 
      var e = document.createElement("div");
      e.setAttribute("class", "webdev-"+selector);
      WebDev.jQuery(this).appendChild(e);
      return jQuery;
    });
  });
};

WebDev.Graphics.PlotPixel = function(x, y, c) {
    var pixel = document.createElement('div');
    pixel.className = 'Ink';
    pixel.style.borderTopColor = c;
    pixel.style.left = x + 'px';
    pixel.style.top = x + 'px';
    parentObj.appendChild(pixel);  
};



WebDev.Graphics.DrawLine = function(points) { 
  var drawMatrix = function(n, matrix) { 
    var c = document.createElement('div');
    c.className = 'Ink';
    c.style.borderTopColor = "#f00";
    var setPos = function(node, l, r) { 
      node.style.left = l + 'px';
      node.style.right = r + 'px';
      return node;
    };
    var rows = matrix.length;
    for (var i = 0; i < matrix.length; i++) { 
      var p = document.createElement('div');
      p.className = 'Ink';
      p.style.borderTopColor = "#f00";
      setPos(p, matrix[i][0], matrix[i][1]);
    }
    return matrix;
  };
  var container = document.createElement('div');
  container.setAttribute('class', 'container');
  container.setAttribute('id', 'webdev-line-container');
  return drawMatrix(container, points);
};
WebDev.Graphics.Paint = function(n) { 
      if (!n || n == null) n = document.getElementsByTagName('body')[0];
      var c = document.createElement('div');
      c.className = 'Ink';
      c.style.borderTopColor = "#f00";
      c.style.left = '1' + 'px';
      c.style.right = '1' + 'px';
      var d = document.createElement('div');
      d.className = 'Ink';
      d.style.borderTopColor = "#f00";
      c.style.left = '2' + 'px';
      c.style.right = '2' + 'px';
      var e = document.createElement('div');
      e.className = 'Ink';
      e.style.borderTopColor = "#f00";
      e.style.left = '2' + 'px';
      e.style.right = '2' + 'px';
      c.appendChild(d);
      e.appendChild(c);
      n.appendChild(e);
      return n;
      var paintPainting = function() { 
        var canvas = document.getElementById("painting-container");
        canvas = Paint(canvas);
      };
      paintPainting();
};
WebDev.Graphics.PlaceWatermark = function() { 
    if (document.layers) { 
      document.watermark.pageX = (window.innerHeight - document.watermark.document.myImage.width) / 2;
      document.watermark.pageY = (window.innerHeight - document.watermark.document.myImage.width) / 2;
      document.watermark.visibility = 'visible';
    }
};

WebDev.Graphics.CSS = {
    Rules: {},
    createRule: function(selector, pairs) { 
       var start = selector + "{\n";
       var end = "\n}";
       var rules = "";
       for (var i = 0; i < pairs.length; i++) { 
         property = pairs[i].pop();
         val = pairs[i].pop();
         rules += property + ":" + val + ";";
       }
       return start + rules + end;
     },
    parseRules: function(stringLine) { 
     rules = stringLine.slice(stringLine.indexOf("{"),stringLine.rindexOf("}"))
     ruleList = rules.split(";");
   },
  Tooltip : function(content) { 
     /* .tooltipShadow {
     *      background: url(shadow.png);  /* translucent shadow * /
     *   }
     *
     *   .tooltipContent {
     *      left: -4px; top: -4px;        /* how much of the shadow shows * /
     *      background-color: #ff0;       /* yellow background * /
     *      border: solid black 1px;      /* thin black border * /
     *      padding: 5px;                 /* spacing between text and border * /
     *      font: bold 10pt sans-serif;   /* small bold font * /
     *   }
     */
     this.tooltip = document.createElement('div');
     this.tooltipShadow = document.createElement('div');
     this.tooltipShadow.style = "background: url(shadow.png);";
     this.tooltipContent = document.createElement('div');
     this.tooltipContent.style.left = "-4px";
     this.tooltipContent.style.top  = "-4px";
     this.tooltipContent.style.backgroundColor = "#ff0";
     this.tooltipContent.style.border = "solid black 1px";
     this.tooltipContent.style.padding = "5px";
     this.tooltipContent.style.font = "bold 10pt sans-serif";
     this.tooltipContent.content = content;
     this.tooltip.appendChild(this.tooltipShadow);
     this.tooltip.appendChild(this.tooltipContent);
     return this.tooltip;
  },
  pngIsTranslucent: true,
  Carousel: function() { 
    var carousel = (typeof carousel != "undefined") ? carousel : document.getElementById("carousel");
    var carouselContent = document.getElementById("carousel-content");
    var screenshots = [];
    carousel.style.display = "none";
    
    var tr = carouselContent.rows[0];
    
    var isIE = (navigator.appName.toLowerCase().indexOf("microsoft") != -1);
    if (isIE) { 
      var parseVersionString = function(s) { 
        return parseInt(s.split(".")[0]);
      };
      var indexOf = function(s, sub, start) { 
        var i = s.indexOf(sub, start);
        return i >= 0 ? i : s.length;
      };
      var ua = navigator.userAgent.toLowerCase();
      var offset = ua.indexOf("msie ");
      if (offset >= 0) { 
        var majorVersion = parseVersionString(ua.substring(offset + 5, indexOf(ua, ";", offset)));
        this.pngIsTranslucent = (majorVersion > 6);
      }
    }
  },
  makeImage: function() { 
    return (this.pngIsTranslucent ? 
      function(url) { 
        elmt = document.createElement("img");
        elmt.setAttribute("src", url);
        return elmt;
      } : 
      function(url) { 
        elmt = document.createElement("img");
        elmt.style.width = "1px";
      });
  },
  SlideShow: {
    App: function() { 
      var Tiny = {};
      function dbid(i) {return document.getElementById(i)}
      function ep(e,p) {p=p||document; return p.getElementsByTagName(e)}
      Tiny.slideshow = function(n) {
        this.infoSpeed = this.imgSpeed = this.speed = 10;
        this.thumbOpacity = this.navHover = 70;
        this.navOpacity = 25;
        this.scrollSpeed = 5;
        this.letterbox = 25;
        this._d = function(i) { return dbid(i); };
        this._e = function(e,p) { return ep(e,p); };
      };
      return Tiny;
    },
    dbid: function(i) { return document.getElementById(i)},
    ep: function(e,p) { 
      p = p || document;
      return p.getElementsByTagName(e);
    },
    slideshow: function(n) { 
      this.infoSpeed = this.imgSpeed = this.speed = 10;
      this.thumbOpacity = this.navHover = 70;
      this.navOpacity = 25;
      this.scrollSpeed = 5;
      this.letterbox = 25;
      return this;
    }
  }
};

WebDev.Graphics.Imaging = {
 Transform: function(image) { 
   if (!WebDev.Graphics.pngIsTranslucent) { return false; }
   var transformImage = function(img, transform) { 
     img.style.left += transform.x;
     img.style.top += transform.y;
     return img;
   };
   return transformImage(image);
  }
};

WebDev.Widgets = function() { 
  var widgets = (this._widgets) ? this._widgets : new Object();
  widgets.names = [];
  widgets.kinds = [];
  widgets.initializers = [];
  widgets.frameworks = [];
  widgets.transforms = {};
  return widgets;
};

WebDev.Graphics.createDesignTool = function(name) { 
  return new WebDev.Graphics._designTool(name, new Exhibit.UIContext());
};