var MagicZoomDis = {};
var links = document.getElementsByTagName("a");
var images = document.getElementsByTagName("img");
MagicZoomDis.ua = MagicZoom_ua;
MagicZoomDis.findZooms = MagicZoom_findZooms;
MagicZoomDis.findSelectors = MagicZoom_findSelectors;
MagicZoomDis.stopZooms = MagicZoom_stopZooms;
MagicZoomDis.MagicZoomTop = MagicZoom_$;
MagicZoomDis.getStyle = MagicZoom_getStyle;
MagicZoomDis.stopEventPropagation = MagicZoom_stopEventPropagation;
MagicZoomDis.createMethodReference = MagicZoom_createMethodReference;
MagicZoomDis.withoutFirst = MagicZoom_withoutFirst;
MagicZoomDis.concat = MagicZoom_concat;

mzd = MagicZoomDis;
mz = MagicZoom;
//document.write(mz);
function MagicZoom(smallImageContId, smallImageId, bigImageContId, bigImageId, settings) {
  this.version = "2.2";
    this.recalculating = false;
    this.smallImageCont = MagicZoom_$(smallImageContId);
    this.smallImage = MagicZoom_$(smallImageId);
    this.bigImageCont = MagicZoom_$(bigImageContId);
    this.bigImage = MagicZoom_$(bigImageId);
    this.pup = 0;
    this.settings = settings;
    if (!this.settings.header) {
        this.settings.header = "";
    }
    this.bigImageSizeX = 0;
    this.bigImageSizeY = 0;
    this.smallImageSizeX = 0;
    this.smallImageSizeY = 0;
    this.popupSizeX = 20;
    this.popupSizey = 20;
    this.positionX = 0;
    this.positionY = 0;
    this.bigImageContStyleTop = "";
    this.loadingCont = null;
    if (this.settings.loadingImg != "") {
        this.loadingCont = document.createElement("DIV");
        this.loadingCont.style.position = "absolute";
        this.loadingCont.style.visibility = "hidden";
        this.loadingCont.className = "MagicZoomLoading";
        this.loadingCont.style.display = "block";
        this.loadingCont.style.textAlign = "center";
        this.loadingCont.innerHTML = this.settings.loadingText + "<br/><img border=\"0\" alt=\"" + this.settings.loadingText + "\" src=\"" + this.settings.loadingImg + "\"/>";
        this.smallImageCont.appendChild(this.loadingCont);
    }
    this.baseuri = "";
    this.safariOnLoadStarted = false;
    MagicZoom_zooms.push(this);
    this.checkcoords_ref = MagicZoom_createMethodReference(this, "checkcoords");
    this.mousemove_ref = MagicZoom_createMethodReference(this, "mousemove");
}
function MagicZoom_createMethodReference(object, methodName) {
     var args = MagicZoom_withoutFirst(arguments, 2);
     return function () {object[methodName].apply(object, MagicZoom_concat(args, arguments));};
}
MagicZoomDis._$ = function(id) { return document.getElementById(id); }
function MagicZoom_extendElement () {
    var args = arguments;
    if (!args[1]) {
        args = [this, args[0]];
    }
    for (var property in args[1]) {
        args[0][property] = args[1][property];
    }
    return args[0];
}


function MagicZoom_findZooms() {
    var loadingText = "Loading Zoom";
    var loadingImg = "";
    var iels = window.document.getElementsByTagName("IMG");
    for (var i = 0; i < iels.length; i++) {
        if (/MagicZoomLoading/.test(iels[i].className)) {
            if (iels[i].alt != "") {
                loadingText = iels[i].alt;
            }
            loadingImg = iels[i].src;
            break;
        }
    }
    var aels = window.document.getElementsByTagName("A");
    for (var i = 0; i < aels.length; i++) {
        if (/MagicZoom/.test(aels[i].className)) {
            while (aels[i].firstChild) {
                if (aels[i].firstChild.tagName != "IMG") {
                    aels[i].removeChild(aels[i].firstChild);
                } else {
                    break;
                }
            }
            if (aels[i].firstChild.tagName != "IMG") {
                throw "Invalid MagicZoom invocation!";
            }
            var rand = Math.round(Math.random() * 1000000);
            aels[i].style.position = "relative";
            aels[i].style.display = "block";
            aels[i].style.outline = "0";
            aels[i].style.textDecoration = "none";
            MagicZoom_addEventListener(aels[i], "click", function (event) {if (MagicZoom_ua != "msie") {this.blur();}MagicZoom_stopEventPropagation(event);return false;});
            if (aels[i].id == "") {
                aels[i].id = "sc" + rand;
            }
            if (MagicZoom_ua == "msie") {
                aels[i].style.zIndex = 0;
            }
            var smallImg = aels[i].firstChild;
            smallImg.id = "sim" + rand;
            var bigCont = document.createElement("DIV");
            bigCont.id = "bc" + rand;
            re = new RegExp(/opacity(\s+)?:(\s+)?(\d+)/i);
            matches = re.exec(aels[i].rel);
            var opacity = 50;
            if (matches) {
                opacity = parseInt(matches[3]);
            }
            re = new RegExp(/thumb\-change(\s+)?:(\s+)?(click|mouseover)/i);
            matches = re.exec(aels[i].rel);
            var thumb_change = "click";
            if (matches) {
                thumb_change = matches[3];
            }
            re = new RegExp(/zoom\-width(\s+)?:(\s+)?(\w+)/i);
            var zoomWidth = -1;
            matches = re.exec(aels[i].rel);
            bigCont.style.width = "300px";
            if (matches) {
                bigCont.style.width = matches[3];
                zoomWidth = matches[3];
            }
            re = new RegExp(/zoom\-height(\s+)?:(\s+)?(\w+)/i);
            var zoomHeight = -1;
            matches = re.exec(aels[i].rel);
            bigCont.style.height = "300px";
            if (matches) {
                bigCont.style.height = matches[3];
                zoomHeight = matches[3];
            }
            re = new RegExp(/zoom\-position(\s+)?:(\s+)?(\w+)/i);
            matches = re.exec(aels[i].rel);
            var position = "right";
            if (matches) {
                switch (matches[3]) {
                  case "left":
                    position = "left";
                    break;
                  case "bottom":
                    position = "bottom";
                    break;
                  case "top":
                    position = "top";
                    break;
                  case "custom":
                    position = "custom";
                    break;
                  case "inner":
                    position = "inner";
                    break;
                  default:;
                }
            }
            re = new RegExp(/drag\-mode(\s+)?:(\s+)?(true|false)/i);
            matches = re.exec(aels[i].rel);
            var drag_mode = false;
            if (matches) {
                if (matches[3] == "true") {
                    drag_mode = true;
                }
            }
            re = new RegExp(/always\-show\-zoom(\s+)?:(\s+)?(true|false)/i);
            matches = re.exec(aels[i].rel);
            var bigImage_always_visible = false;
            if (matches) {
                if (matches[3] == "true") {
                    bigImage_always_visible = true;
                }
            }
            bigCont.style.overflow = "hidden";
            bigCont.className = "MagicZoomBigImageCont";
            bigCont.style.zIndex = 100;
            bigCont.style.visibility = "hidden";
            if (position != "custom") {
                bigCont.style.position = "absolute";
            } else {
                bigCont.style.position = "relative";
            }
            var bigImg = document.createElement("IMG");
            bigImg.id = "bim" + rand;
            bigImg.src = aels[i].href;
            bigCont.appendChild(bigImg);
            if (position != "custom") {
                aels[i].appendChild(bigCont);
            } else {
                MagicZoom_$(aels[i].id + "-big").appendChild(bigCont);
            }
            var settings = {bigImage_always_visible: bigImage_always_visible, drag_mode: drag_mode, header: aels[i].title, opacity: opacity, thumb_change: thumb_change, position: position, loadingText: loadingText, loadingImg: loadingImg, zoomWidth: zoomWidth, zoomHeight: zoomHeight};
            if (position == "inner") {
                aels[i].title = "";
            }
            var zoom = new MagicZoom(aels[i].id, "sim" + rand, bigCont.id, "bim" + rand, settings);
            aels[i].mzextend = MagicZoom_extendElement;
            aels[i].mzextend({zoom: zoom});
            zoom.initZoom();
            MagicZoom_findSelectors(aels[i].id, zoom);
        }
    }
}
function MagicZoom_findSelectors(id, zoom) {
    var aels = window.document.getElementsByTagName("A");
    for (var i = 0; i < aels.length; i++) {
        if (aels[i].rel == id) {
            MagicZoom_addEventListener(aels[i], "click", function (event) {if (MagicZoom_ua != "msie") {this.blur();} else {window.focus();}MagicZoom_stopEventPropagation(event);return false;});
            MagicZoom_addEventListener(aels[i], zoom.settings.thumb_change, MagicZoom_createMethodReference(zoom, "replaceZoom", aels[i]));
            aels[i].style.outline = "0";
            aels[i].mzextend = MagicZoom_extendElement;
            aels[i].mzextend({zoom: zoom, selectThisZoom: function () {this.zoom.replaceZoom(null, this);}});
            var img = document.createElement("IMG");
            img.src = aels[i].href;
            img.style.position = "absolute";
            img.style.left = "-10000px";
            img.style.top = "-10000px";
            document.body.appendChild(img);
            img = document.createElement("IMG");
            img.src = aels[i].rev;
            img.style.position = "absolute";
            img.style.left = "-10000px";
            img.style.top = "-10000px";
            document.body.appendChild(img);
        }
    }
}

function MagicZoom_stopEventPropagation(e) {
    if (MagicZoom_ua == "gecko" ||
        MagicZoom_ua == "safari" || MagicZoom_ua == "opera") {
        e.cancelBubble = true;
        e.preventDefault();
        e.stopPropagation();
    } else if (MagicZoom_ua == "msie") {
        window.event.cancelBubble = true;
    }
}
function MagicZoom_addEventListener(obj, event, listener) {
    if (MagicZoom_ua == "gecko" ||
        MagicZoom_ua == "opera" || MagicZoom_ua == "safari") {
        try {
            obj.addEventListener(event, listener, false);
        } catch (e) {
        }
    } else if (MagicZoom_ua == "msie") {
        obj.attachEvent("on" + event, listener);
    }
}
function MagicZoom_withoutFirst(sequence, skip) {
    result = [];
    for (var i = skip; i < sequence.length; i++) {
        result.push(sequence[i]);
    }
    return result;
}
function MagicZoom_getBounds(e) {
    if (e.getBoundingClientRect) {
        var r = e.getBoundingClientRect();
        var wx = 0;
        var wy = 0;
        if (document.body &&
            (document.body.scrollLeft || document.body.scrollTop)) {
            wy = document.body.scrollTop;
            wx = document.body.scrollLeft;
        } else if (document.documentElement &&
            (document.documentElement.scrollLeft ||
            document.documentElement.scrollTop)) {
            wy = document.documentElement.scrollTop;
            wx = document.documentElement.scrollLeft;
        }
        return {left: r.left + wx, top: r.top + wy, right: r.right + wx, bottom: r.bottom + wy};
    }
}
function MagicZoom_getEventBounds(e) {
    var x = 0;
    var y = 0;
    if (MagicZoom_ua == "msie") {
        y = e.clientY;
        x = e.clientX;
        if (document.body &&
            (document.body.scrollLeft || document.body.scrollTop)) {
            y = e.clientY + document.body.scrollTop;
            x = e.clientX + document.body.scrollLeft;
        } else if (document.documentElement &&
            (document.documentElement.scrollLeft ||
            document.documentElement.scrollTop)) {
            y = e.clientY + document.documentElement.scrollTop;
            x = e.clientX + document.documentElement.scrollLeft;
        }
    } else {
        y = e.clientY;
        x = e.clientX;
        y += window.pageYOffset;
        x += window.pageXOffset;
    }
    return {x: x, y: y};
}
function MagicZoom_getStyle(el, styleProp) {
    if (el.currentStyle) {      
        var y = el.currentStyle[styleProp];
        y = parseInt(y) ? y : "0px";
    } else if (window.getComputedStyle) {
        var css = document.defaultView.getComputedStyle(el, null);
        var y = css ? css[styleProp] : null;
    }
    return y;
}
//W = mozilla/5.0 (x11; u; linux i686; en-us; rv:1.9.0.6) gecko/2009020911 ubuntu/8.10 (intrepid) firefox/3.0.6
function MagicZoom_getStyle(el, styleProp) {
    if (el.currentStyle) {
        var y = el.currentStyle[styleProp];
        y = parseInt(y) ? y : "0px";
    } else if (window.getComputedStyle) {
        var css = document.defaultView.getComputedStyle(el, null);
        var y = css ? css[styleProp] : null;
    }
    return y;
}
function MagicZoom_createMethodReference(object, methodName) {
    var args = MagicZoom_withoutFirst(arguments, 2);
    return function () {object[methodName].apply(object, MagicZoom_concat(args, arguments));};
}
function MagicZoom_concat() {
    var result = [];
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            result.push(arguments[i][j]);
        }
    }
    return result;
}
function MagicZoom_removeEventListener(obj, event, listener) {
    if (MagicZoom_ua == "gecko" ||
        MagicZoom_ua == "opera" || MagicZoom_ua == "safari") {
        obj.removeEventListener(event, listener, false);
    } else if (MagicZoom_ua == "msie") {
        obj.detachEvent("on" + event, listener);
    }
}
