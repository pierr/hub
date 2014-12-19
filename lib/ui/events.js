var toggleClassName = require('../util/className').toggle;
/**
 * Toggle the hub component.
 * @param {event} event - The dom event.
 * @param  {object} domElement - The dom element on which
 * @return {undefined}
 */
function toggleHub(event, domElement) {
  domElement = domElement || document;
  var hubContent = domElement.querySelector('[data-hub-content]');
  if (!hubContent) {
    throw new Error('The hub should have and attribute: data-hub-content');
  }
  var hubActivator = domElement.querySelector('[data-hub-activator]');
  if (!hubActivator) {
    throw new Error('The hub should have and attribute: data-hub-activator');
  }
  var buttonClose = domElement.querySelector('[data-action="close"]');
  toggleClassName(hubContent, 'open');
  toggleClassName(hubActivator, 'open');
  toggleClassName(buttonClose, 'open');

  //hubContent.classList.toggle('open');
  //hubActivator.classList.toggle('open');
}

/**
 * drag start the hub component.
 * @param {event} event - The dom event.
 * @param  {object} domElement - The dom element on which
 * @return {undefined}
 */
function hubActivatorDragStart(event, domElement) {
}

/**
 * drag stop the hub component.
 * @param {event} event - The dom event.
 * @param  {object} domElement - The dom element on which
 * @return {undefined}
 */
function hubActivatorDragStop(event, domElement) {
  domElement = domElement || document;
  var position = (event.y * 100) / window.innerHeight;
  var hubActivator = domElement.querySelector('[data-hub-activator]');
  hubActivator.style.top = Math.round(position) + '%';

}

module.exports = {
  toggleHub: toggleHub,
  hubActivatorDragStart: hubActivatorDragStart,
  hubActivatorDragStop: hubActivatorDragStop
};