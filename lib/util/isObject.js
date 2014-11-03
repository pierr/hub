/**
 * Check if a parameter is an object.
 * @param  {object} obj - Object to test.
 * @return {boolean}    - True if the parameter is an object, false else.
 */
module.exports = function(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};