/* 
 * @fileOverview: generic dataframe widget 
 * @package: WebDev.DataFrame
 */
 
WebDev.DataFrame = function(dataLocation, headerRow) { 
  this._dataContent = null;
  this._dataLocation = dataLocation || [0,0];
  this._headerRow = headerRow || 'A';
  this._display = function() { };
};
