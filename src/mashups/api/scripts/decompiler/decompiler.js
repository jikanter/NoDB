WebDev.Decompiler = function() { 
  if (this._hostEnv != "rhino") { 
    return null;
  } 
  this._decompiler = function() { 
    this._scopeStack = {};
    this._unravelStack = false;
    this._varStack = function() { 
      var variables = {};
      if (this._scopeStack._current) { 
        if (!this.variables[this._scopeStack._current]) { 
          this.variables[this._scopeStack._current] = {};
        }
        else { 
          return this.variables[this._scopeStack._current];
        }
      }
    }
  }
};