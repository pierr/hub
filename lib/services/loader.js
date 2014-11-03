var config = require('../config');
var extend = require('../util/extend');
var isObject = require('../util/isObject');
/**
 * Constant values.
 */
var LAST_LOAD_KEY = "hub.lastLoadDate",
  DATA_KEY = "hub.data",
  MAX_AGE = config.data.maxAge || 60 * 60 * 1000; //1h
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
    data = config.data.mock; //Todo: call the service.
    _saveDataInSession(data);
  }
  return new Promise(function(success, failure) {
    success(data);
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