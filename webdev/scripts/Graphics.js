function onLoad() {
  jQuery(document).ready(function() { 
      var Graphics = {jQuery: (typeof jQuery != "undefined") ? jQuery : null };
      jQuery("div")
        .filter(".inkblob").each(function() { 
          jQuery(this).click(function() { 
            var e = document.createElement("div");
            e.setAttribute("class", "blob");
            jQuery(this).appendChild(e);
          });
        }).end();
      });
   
  function PlotPixel(x, y, c) {
    var pixel = document.createElement('div');
    pixel.className = 'Ink';
    pixel.style.borderTopColor = c;
    pixel.style.left = x + 'px';
    pixel.style.top = x + 'px';
    parentObj.appendChild(pixel);  
  }
  function DrawLine() {
    var matrix = [
      [1,2],
      [3,4],
      [5,6]
      [7,8]
    ];
    var c = document.createElement('div');
    c.className = 'Ink';
    c.style.borderTopColor = "#f00";
    c.style.left = '1' + 'px';
    c.style.right = '1' + 'px';
  }
  function DrawAccordingToMatrix(n, matrix) { 
    var c = document.createElement('div');
    c.className = 'Ink';
    c.style.borderTopColor = "#f00";
    function setPos(node, l, r) { 
      node.style.left = l + 'px';
      node.style.right = r + 'px';
      return node;
    }
    var rows = matrix.length;
    for (var i = 0; i < matrix.length; i++) { 
      var c = document.createElement('div');
      c.className = 'Ink';
      c.style.borderTopColor = "#f00";
      setPos(c, matrix[i][0], matrix[i][1]);
    }
  }
  function Paint(n) { 
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
  }
 function paintPainting() { 
    var canvas = document.getElementById("painting-container");
    canvas = Paint(canvas);
 }
 paintPainting();
}



