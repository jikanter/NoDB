/*
 * @fileoverview A simple data access controller. Simple middleware methods.
 * @copyright Copyright (C) 2015 Boomshaka Design. All rights reserved
 */
var DATAACCESSKINDS = {FLATFILE: 0, RDB: 1, REDIS: 2, LOCALSTORAGE: 3};
var DataAccess = function() {
  this.init = function(kind, location) { 
    this.kind = kind || DATAACCESSKINDS.FLATFILE;
    this.location = location || "/mashups/app/dataset.json";
    this.elements = [];
    return this;
  };
  this.fetchOne = function(id) { 
  };
  this.fetchAll = function() { 
  };
};

