/**
 * String contains function.
 * @param  {string} string - The string to test.
 * @param  {[type]} pattern - The pattern tt test.
 * @return {[type]}
 */
module.exports = function contains(string, pattern){
  if(typeof string !== "string"){
    throw new Error('String should be a string');
  }
  if(typeof pattern !== "string"){
    throw new Error('String should be a pattern');
  }
  return string.indexOf(pattern) !== -1;
}