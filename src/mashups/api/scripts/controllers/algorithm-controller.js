/**
 * @fileoverview algorithm dispatch controller 
 * @copyright Copyright (C) 2013 New Media Meltdown Inc. All rights reserved.
 * @copyright Copyright (C) 2015 Boomshaka Design Inc. All rights reserved.
 */
var Algorithm = new Object();
Algorithm.Environment = {};
Algorithm.heapSort = function(a) { };
Algorithm.bubbleSort = function(array) { 
  for (var i = 1; i < array.length; ++i) { 
    for (var j = 0; j < array.length - i; ++j) { 
      if (array[j + 1] < array[j]) { 
        var tmp = array[j];
        array[j] = array[j + 1];
        array[j+1] = tmp;
      }
    }
  }
};
Algorithm.quickSort = function(){};/*function(a, p, r) { 
  var partition = function(sa, sp, sr) { 
    var x = sa[r];
    var i = sp - 1;
    for (j = sp; j <= sr - 1; j++) { 
      if (sa[j] <= x) { 
        i++;
        sa[i] = sa[j];
      }
    }
    sa[i+1] = sa[r];
    return i+1;
  };
  var q = null;
  if (p < r) { 
    q = partition(a, p, r);
  }
  quicksort(a,p,q-1);
  quicksort(a,q+1,r);
};*/
Algorithm.config = function() { 
  var name = "bubblesort";
  var side = "client";
  var timeout = 0;
  this.runSerializedAlgorithm = function(name, params) { 
    if (timeout == 0) { 
      // caution! Unsafe!
      JSON.parse(name + '(' + params.join(',') + ')');
    }
    else { 
      setTimeout(JSON.parse(name + '('+ params.join(',') + ')'), timeout);
    }
    return false;
  };
  var self = this;
  var runSerialized = function(params) { 
    self.applyAlgorithm(this.name, this.params);
  };
};
Algorithm.aStarSort = function(a) {};

Algorithm.prototype.apply = function(name, args, env) {
  Algorithm.Environment = env;
  Algorithm[name].apply(args[0], args.split(1, args.length));
};