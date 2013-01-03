if (typeof Indexer == "undefined") { 
    var Indexer = new Object();
}
Indexer._indexer = new Object();
Indexer._location = document.location.href;
Indexer._exhibit = (typeof Exhibit != "undefined") ? Exhibit : null;
if (!Indexer._exhibit) { 
    var n_scripts = 2;
    var SimileAjax_onLoad = function() { 
        this.getHost = function() { 
            return Indexer._location;
        };
        this.localResource = function() { 
            return (Indexer._location.indexOf("file:") != -1 ? Indexer._location : null);
        };
        this.remoteResource = function() { 
            return (!this.localResource());
        };
        this.getScheme = function() { 
            return (Indexer._location.substring(Indexer._location.indexOf(':')));
        };
        this.Site = (typeof Site != "undefined") ? Site : new Object();
    };
}
function onLoad() { 
    var pens = [ 
        { url: "images/a.gif" ,
          screenshot: "images/a.gif" 
        },
        { url: "images/b.gif",
          screenshot: "images/b.gif" },
        { url: "images/c.gif",
          screenshot: "images/c.gif" }
    ];
    
    var carouselContent = document.getElementById("carousel-content");
    var tr = carouselContent.rows[0];
    
    var makePen = function(index) { 
        var pen = pens[index];
        
        var img = document.createElement("img");
        img.src = pen.screenshot;
        img.className = "pen-screenshot";
        img.onclick = function() { showPen(pens[index].url); };
        
        var td = tr.insertCell(index);
        td.appendChild(img);
    };
    
    for (var i = 0; i < pens.length; i++) { 
        makePen(i);
    }
    
    window.onresize = onWindowResize;
    carouselContent.style.left = "0px";
    carouselContent.style.display = "block";
}

function onWindowResize() { 
    var carousel = document.getElementById("carousel");
    var carouselContent = document.getElementById("carousel-content");
    
    carouselContent.style.left = 
        Math.max(
            Math.min(carouselContent.offsetLeft, 0),
            carousel.offsetWidth - carouselContent.offsetWidth
            ) + "px";
    
    showHideScrollButtons();
}

function onCarouselMouseOver() { 
    march = function() {}
    showHideScrollButtons();
}

function showHideScrollButtons() { 
    var carousel = document.getElementById("carousel");
    var carouselContent = document.getElementById("carousel-content");
    
    var scrollLeftButton = document.getElementById("scroll-left");
    var scrollRightButton = document.getElementById("scroll-right");
    scrollLeftButton.style.display = (carouselContent.offsetLeft < -1) ? "block" : "none";
    scrollRightButton.style.display = (carouselContent.offsetLeft + carouselContent.offsetWidth > carousel.offsetWidth) ? "block": "none";    
}

var animation = null;

function scrollToLeft() { 
    if (animation != null) { 
        animation.canceled = true;
    }
    
    var carousel = document.getElementById("carousel");
    var carouselContent = document.getElementById("carousel-content");
    
    var maxDistance = Math.floor(0.7 * carousel.offsetWidth);
    var from = carouselContent.offsetLeft;
    var to = Math.min(
        carouselContent.offsetLeft + maxDistance,
        0
    );
    
    animation = new Animation(
        function(current, change) { 
            carouselContent.style.left = current + "px";
        },
        from,
        to,
        500 + Math.round(1000 * (to - from) / maxDistance),
        function() { 
            animation = null;
            showHideScrollButtons();
        }
    );
    animation.run();
}

function scrollToRight() { 
    if (animation != null) { 
        animation.canceled = true;
    }
    var carousel = document.getElementById("carousel");
    var carouselContent = document.getElementById("carousel-content");
    
    var maxDistance = Math.floor(0.7 * carousel.offsetWidth);
    var from = carouselContent.offsetLeft;
    var to = Math.min(
        carouselContent.offsetLeft - maxDistance,
        carousel.offsetWidth - carouselContent.offsetWidth
    );
    
    animation = new Animation(
        function(current, change) { 
            carouselContent.style.left = Math.floor(current) + "px";
        },
        from,
        to,
        500 + Math.round(1000 * (from - to) / maxDistance),
        function() { 
            animation = null;
            showHideScrollButtons();
        },
        animation.run()
    );
}

function Animation(f, from, to, duration, cont) { 
    this.f = f;
    this.cont = (typeof cont == "function") ? cont : function() {};
    
    this.from = from;
    this.to = to;
    this.current = from;
    
    this.duration = duration;
    this.start = new Date().getTime();
    this.timePassed = 0;
    
    this.canceled = false;
};

Animation.prototype.run = function() { 
    var a = this;
    window.setTimeout(function() { a.step(); }, 50);
};

Animation.prototype.step = function() { 
    if (this.canceled) return;
    
    this.timePassed += 50;
    var timePassedFraction = this.timePassed / this.duration;
    var parameterFraction = 1 - Math.exp(-7 * timePassedFraction);
    var current = parameterFraction * (this.to - this.from) + this.from;
};