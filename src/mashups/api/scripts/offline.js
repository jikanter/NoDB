(function() { 
if (!Mashups.Offline) { 
  Mashups.Offline = new Object();
}
Mashups.Offline.Application = {
  Persistance : function() { 
    var _persist = null;
    try { 
     _persist = 'localStorage' in window && window['localstorage'] !== null ? 
                window.localstorage : 
                null;
    }
    catch (e) { 
      _persist = new WebDev.Persistance;
    }
    return _persist;
  }(),
  Importers : null,
  Animation : new Simile.Graphics.Animation(),
  Arrows : { 
    Top: function() { return SimileAjax.Graphics.createImage(); },
    Right: function() { return SimileAjax.Graphics.createImage(); },
    Bottom: function() { return SimileAjax.Graphics.createImage(); },
    Left: function() { return SimileAjax.Graphics.createImage(); }
  }
}
})();