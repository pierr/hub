var defaultConfig = require('./config');


//Dependencies.
var dataLoader = require('./services/loader');
var extend = require('./util/extend');
var events = require('./ui/events');
//Templates.
var template = {
  nav: require('./templates/nav'),
  activation: require('./templates/activation')
};

/**
 * Hub component.
 * @return {class} hub class.
 */
var Hub = (function() {
  /**
   * Hub constructor.
   * @param {object} config - Load the configuration.
   */
  function Hub(config) {
    this.config = extend(defaultConfig, config);
    this.el = this.config.ui.element || document.createElement(this.config.ui.tagName);
    this.el.className = this.config.ui.className;
    var hub = this;
    this.load().then(function(s){hub.render();}).catch(function(err) {
      console.error(err);
    });
  }

  /**
   * Load the data of the component.
   * @return {Promise}
   */
  Hub.prototype.load = function() {
    var hub = this;
    return dataLoader.load().then(function(data) {
      hub.data = data;
    });
  };

  /**
   * Register all the dom events needed by the component.
   * @return {this}
   */
  Hub.prototype.registerEvents = function() {
    var component = this;
    this.el.querySelector(this.config.ui.activatorSelector).addEventListener('click', events.toggleHub, false);
    return this;
  };

  /**
   * [render description]
   * @return {this}
   */
  Hub.prototype.render = function() {
    this.el.innerHTML = template.activation() + template.nav(this.data);
    this.registerEvents();
    return this;
  };

  return Hub;

})();

module.exports = Hub;