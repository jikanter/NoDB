/*==================================================
 *  WebDev.TabulatorToolboxWidget
 *==================================================
 */
WebDev.TabulatorToolboxWidget = function(containerElmt, uiContext) {
    this._containerElmt = containerElmt;
    this._uiContext = uiContext;
    this._settings = {};
    this._customExporters = [];
    
    this._hovering = false;
    this._initializeUI();
};

WebDev.TabulatorToolboxWidget._settingSpecs = {
    "itemID": { type: "text" }
};

WebDev.TabulatorToolboxWidget.create = function(configuration, containerElmt, uiContext) {
    var widget = new WebDev.TabulatorToolboxWidget(
        containerElmt,
        Exhibit.UIContext.create(configuration, uiContext)
    );
    WebDev.TabulatorToolboxWidget._configure(widget, configuration);
    
    widget._initializeUI();
    return widget;
};

WebDev.TabulatorToolboxWidget.createFromDOM = function(configElmt, containerElmt, uiContext) {
    var configuration = WebDev.getConfigurationFromDOM(configElmt);
    var widget = new WebDev.TabulatorToolboxWidget(
        containerElmt != null ? containerElmt : configElmt, 
        Exhibit.UIContext.createFromDOM(configElmt, uiContext)
    );
    
    WebDev.SettingsUtilities.collectSettingsFromDOM(configElmt, WebDev.TabulatorToolboxWidget._settingSpecs, widget._settings);
    WebDev.TabulatorToolboxWidget._configure(widget, configuration);
    
    widget._initializeUI();
    return widget;
};

WebDev.TabulatorToolboxWidget._configure = function(widget, configuration) {
    WebDev.SettingsUtilities.collectSettings(configuration, WebDev.TabulatorToolboxWidget._settingSpecs, widget._settings);
};

WebDev.TabulatorToolboxWidget.prototype.dispose = function() {
    this._containerElmt.onmouseover = null;
    this._containerElmt.onmouseout = null;
    
    this._dismiss();
    this._settings = null;
    this._containerElmt = null;
    this._uiContext = null;
};

WebDev.TabulatorToolboxWidget.prototype.addExporter = function(exporter) {
    this._customExporters.push(exporter);
};

WebDev.TabulatorToolboxWidget.prototype._initializeUI = function() {
    var self = this;
    this._containerElmt.onmouseover = function(evt) { self._onContainerMouseOver(evt); };
    this._containerElmt.onmouseout = function(evt) { self._onContainerMouseOut(evt); };
};

WebDev.TabulatorToolboxWidget.prototype._onContainerMouseOver = function(evt) {
    if (!this._hovering) {
        var self = this;
        var coords = SimileAjax.DOM.getPageCoordinates(this._containerElmt);
        var docWidth = document.body.offsetWidth;
        var docHeight = document.body.offsetHeight;
        
        var popup = document.createElement("div");
        popup.className = "WebDev-TabulatorToolboxWidget-popup screen";
        popup.style.top = coords.top + "px";
        popup.style.right = (docWidth - coords.left - this._containerElmt.offsetWidth) + "px";
        
        this._fillPopup(popup);
        
        document.body.appendChild(popup);
        popup.onmouseover = function(evt) { self._onPopupMouseOver(evt); };
        popup.onmouseout = function(evt) { self._onPopupMouseOut(evt); };
        
        this._popup = popup;
        this._hovering = true;
    } else {
        this._clearTimeout();
    }
};

WebDev.TabulatorToolboxWidget.prototype._onContainerMouseOut = function(evt) {
    if (WebDev.TabulatorToolboxWidget._mouseOutsideElmt(WebDev.TabulatorToolboxWidget._getEvent(evt), this._containerElmt)) {
        this._setTimeout();
    }
};

WebDev.TabulatorToolboxWidget.prototype._onPopupMouseOver = function(evt) {
    this._clearTimeout();
};

WebDev.TabulatorToolboxWidget.prototype._onPopupMouseOut = function(evt) {
    if (WebDev.TabulatorToolboxWidget._mouseOutsideElmt(WebDev.TabulatorToolboxWidget._getEvent(evt), this._containerElmt)) {
        this._setTimeout();
    }
};

WebDev.TabulatorToolboxWidget.prototype._setTimeout = function() {
    var self = this;
    this._timer = window.setTimeout(function() { self._onTimeout(); }, 200)
};

WebDev.TabulatorToolboxWidget.prototype._clearTimeout = function() {
    if (this._timer) {
        window.clearTimeout(this._timer);
        this._timer = null;
    }
};

WebDev.TabulatorToolboxWidget.prototype._onTimeout = function() {
    this._dismiss();
    this._hovering = false;
    this._timer = null;
};

WebDev.TabulatorToolboxWidget.prototype._fillPopup = function(elmt) {
    var self = this;
    
    var exportImg = WebDev.UI.createTranslucentImage("images/liveclipboard-icon.png");
    exportImg.className = "WebDev-TabulatorToolboxWidget-button";
    SimileAjax.WindowManager.registerEvent(
        exportImg, 
        "click", 
        function(elmt, evt, target) {
            self._showExportMenu(exportImg);
        }
    );
    
    elmt.appendChild(exportImg);
};

WebDev.TabulatorToolboxWidget.prototype._dismiss = function() {
    if (this._popup) {
        document.body.removeChild(this._popup);
        this._popup = null;
    }
};

WebDev.TabulatorToolboxWidget._mouseOutsideElmt = function(evt, elmt) {
    var eventCoords = SimileAjax.DOM.getEventPageCoordinates(evt);
    var coords = SimileAjax.DOM.getPageCoordinates(elmt);
    return ((eventCoords.x < coords.left || eventCoords.x > coords.left + elmt.offsetWidth) ||
        (eventCoords.y < coords.top || eventCoords.y > coords.top + elmt.offsetHeight));
};

WebDev.TabulatorToolboxWidget._getEvent = function(evt) {
    return (evt) ? evt : ((event) ? event : null);
};

WebDev.TabulatorToolboxWidget.prototype._showExportMenu = function(elmt) {
    var self = this;
    var popupDom = WebDev.UI.createPopupMenuDom(elmt);
    
    var makeMenuItem = function(exporter) {
        popupDom.appendMenuItem(
            exporter.getLabel(),
            null,
            function() {
                var database = self._uiContext.getDatabase();
                var text = ("itemID" in self._settings) ?
                    exporter.exportOne(self._settings.itemID, database) :
                    exporter.exportMany(
                        self._uiContext.getCollection().getRestrictedItems(), 
                        database
                    );
                WebDev.TabulatorToolboxWidget.createExportDialogBox(text).open();
            }
        );
    }
    
    var exporters = WebDev.getExporters();
    for (var i = 0; i < exporters.length; i++) {
        makeMenuItem(exporters[i]);
    }
    for (var i = 0; i < this._customExporters.length; i++) {
        makeMenuItem(this._customExporters[i]);
    }
    
    if ("getGeneratedHTML" in this) {
        makeMenuItem({ 
            getLabel:   function() { return Exhibit.l10n.htmlExporterLabel; },
            exportOne:  this.getGeneratedHTML,
            exportMany: this.getGeneratedHTML
        });
    }
    
    /*if (generatedContentElmtRetriever != null) {
        popupDom.appendMenuItem(
            WebDev.l10n.htmlExporterLabel,
            null,
            function() {
                WebDev.UI.createCopyDialogBox(
                    generatedContentElmtRetriever().innerHTML
                        //.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\&/g, "&amp;")
                ).open();
            }
        );
    }*/
    
    popupDom.open();
};

WebDev.TabulatorToolboxWidget.createExportDialogBox = function(string) {
    var template = {
        tag:        "div",
        className:  "WebDev-copyDialog WebDev-ui-protection",
        children: [
            {   tag:        "button",
                field:      "closeButton",
                children:    [ Exhibit.l10n.exportDialogBoxCloseButtonLabel ]
            },
            {   tag:        "p",
                children:   [ Exhibit.l10n.exportDialogBoxPrompt ]
            },
            {   tag:        "div",
                field:      "textAreaContainer"
            }
        ]
    };
    var dom = SimileAjax.DOM.createDOMFromTemplate(template);
    dom.textAreaContainer.innerHTML = 
        "<textarea wrap='off' rows='15'>" + string + "</textarea>";
        
    dom.close = function() {
        document.body.removeChild(dom.elmt);
    };
    dom.open = function() {
        dom.elmt.style.top = (document.body.scrollTop + 100) + "px";
        
        document.body.appendChild(dom.elmt);
        dom.layer = SimileAjax.WindowManager.pushLayer(function() { dom.close(); }, false);
        
        var textarea = dom.textAreaContainer.firstChild;
        textarea.select();
        
        SimileAjax.WindowManager.registerEvent(
            dom.closeButton, 
            "click", 
            function(elmt, evt, target) { SimileAjax.WindowManager.popLayer(dom.layer); },
            dom.layer
        );
        SimileAjax.WindowManager.registerEvent(
            textarea, 
            "keyup", 
            function(elmt, evt, target) {
                if (evt.keyCode == 27) { // ESC
                    SimileAjax.WindowManager.popLayer(dom.layer);
                }
            }, 
            dom.layer
        );
    };
    
    return dom;
};
