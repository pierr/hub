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
  hubContent.classList.toggle('open');
  hubActivator.classList.toggle('open');
}

module.exports = {
  toggleHub: toggleHub
};