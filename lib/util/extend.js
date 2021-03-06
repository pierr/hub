var isObject = require('./isObject');
/**
 * Extend function.
 * @param  {object} objectToExtend - Object to extend.
 * @param  {object} objectPropertiesToAdd - Object with properties to add.
 * @return {object} The extended object
 */
module.exports = function(objectToExtend, objectPropertiesToAdd) {
  if (objectPropertiesToAdd && isObject(objectPropertiesToAdd)) {
    for (var pro in objectPropertiesToAdd) {
      objectToExtend[pro] = objectPropertiesToAdd[pro];
    }
  }
  return objectToExtend;
};