/**
 * @file video-widget.js
 * @fileoverview html5 and flash player utilities
 */
var lineDiv = function() {  
  return {"line": document.createElement('div') }; 
};

var playerActions = [
  "top",
  "bottom",
  "right",
  "left",
  "play",
  "pause",
  "stop",
  "fastforward",
  "rewind",
  "slow",
  "positionreadahead",
  "positionreadbehind",
  "positionstepbackward",
  "positionstepforward"
];

var PlayerWidgets = {};

for (var i = 0; i < playerActions.length; i++) { 
 PlayeWidgets[playerActions[i]] = lineDiv(); 
}

PlayerWidgets["positionreadahead"].seconds = 0;
PlayerWidgets["positionreadahead"].milliseconds = 0;
PlayerWidgets["positionreadahead"].frame = 0;

PlayerWidgets["positionreadbehind"].seconds = 0;
PlayerWidgets["positionreadbehind"].milliseconds = 0;
PlayerWidgets["positionreadbehind"].frame = 0;