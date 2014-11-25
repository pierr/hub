var config = require('../config');
var extend = require('../util/extend');
var isObject = require('../util/isObject');
var corsRequest = require('../util/corsRequest');
var HTTP = require('../util/statusCodes');


/**
 * Constant values.
 */
var LAST_LOAD_KEY = "hub.lastLoadDate",
  DATA_KEY = "hub.data",
  MAX_AGE = config.data.maxAge !== undefined ? config.data.maxAge : 60 * 60 * 1000; //1h
/**
 * Load the component data from the session.
 * @return {object} undefined if there is no data or the data is one hour last else the data.
 */
function _loadDataFromSession() {
  var lastLoad = sessionStorage.getItem(LAST_LOAD_KEY);
  // If there is no data in the session, return undefined.
  if (!lastLoad || (Date.now() - JSON.parse(lastLoad) > MAX_AGE)) {
    return undefined;
  }
  return JSON.parse(sessionStorage.getItem(DATA_KEY));
}

/**
 * Save the data in the session storage.
 * @param  {object} data - The data to save in the storage.
 * @return {boolean} - true or false depending on the save.
 */
function _saveDataInSession(data) {
  //If there is no data to save or an object with no properties.
  if (!data || !isObject(data)) {
    return false;
  }
  sessionStorage.setItem(LAST_LOAD_KEY, JSON.stringify(Date.now()));
  return sessionStorage.setItem(DATA_KEY, JSON.stringify(data));
}

/**
 * Load the data from the session or the server.
 * @return {object} - User data.
 */
function loadUserDatas() {
  var data = _loadDataFromSession();
  if (!data) {
    return _loadDataFromServer().then(function(jsonData){
      _saveDataInSession(jsonData);
      return jsonData;
    });
  }
  return new Promise(function(success, failure) {
    success(data);
  });
}

/**
 * Load the data from the server using a CORS http request or a XDomainRequest.
 * @return {object}
 */
function _loadDataFromServer() {
  var request = corsRequest(config.api.method,config.api.url);
  if (!request) {
    throw new Error('You cannot perform ajax request on other domains.');
  }
  return new Promise(function(success, failure) {
    request.onerror = function(error) {
      failure(error);
    };
    request.onload = function() {
      var status = request.status;
      if(status !==  HTTP.OK){
        if(status === HTTP.UNAUTHORIZED){
          var err = JSON.parse(request.response);
          failure(err);
        }
      }
     return  success(JSON.parse(request.responseText));
      var contentType = request.getResponseHeader('content-type');
      var data;
      if(contentType && contentType.indexOf("application/json") !== -1){
        data = JSON.parse(request.response);
      }else {
        data = request.responseText;
      }
      success(data);
    };
    request.send(config.api.data);
  });

}


/**
 * Extend the data loader configuration.
 * @param  {object} jsonConf - new configuration.
 * @return {undefiend}
 */
function configure(jsonConf) {
  return extend(config, jsonConf);
}

module.exports = {
  load: loadUserDatas,
  configure: configure
};