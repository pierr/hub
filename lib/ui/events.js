function toggleHub(domElement) {
  domElement = domElement || document;
  domElement.querySelector('[data-hub]');
  // body.classList.toggle('open');
  // appbarElement.classList.toggle('open');
  // navdrawerContainer.classList.toggle('open');
  // navdrawerContainer.classList.add('opened');
}

module.exports = {
  toggleHub: toggleHub
};