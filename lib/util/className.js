var contains = require('./contains');
/**
 * Toggle the class of a DOM element.
 * @param  {object} domElement - The dom element.
 * @param  {string} className - The css class Name.
 * @return {undefined}
 */
function toggleClassName(domElement, className){
  if(typeof domElement !== "object"){
    throw new Error('The DOM element should be an object.');
  }
  if(typeof className !== "string"){
    throw new Error('The className should be a string.');
  }
  if(domElement.classList){
    domElement.classList.toggle(className);
  }else{
    var originalClass = domElement.className;
    if(contains(originalClass, className)){
      domElement.className = originalClass.split(' '+className)[0];
    }else {
      domElement.className = originalClass + ' ' + className;
    }
  }
}

module.exports = {toggle: toggleClassName};
