var defaultConfig = require('./config');


//Dependencies.
var dataLoader = require('./services/loader');
var extend = require('./util/extend');
//Templates.
var template =  {
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
    this.el.className = this.config.ui.className
  }

  /**
   * Load the data of the component.
   * @return {undefined}
   */
  Hub.prototype.load = function() {
    dataLoader.load();
  };

  /**
   * Register all the dom events needed by the component.
   * @return {this}
   */
  Hub.prototype.registerEvents = function() {};

  /**
   * [render description]
   * @return {this}
   */
  Hub.prototype.render = function() {
    this.el.innerHTML = template.activation();
    return this;
  };

  return Hub;

})();

module.exports = Hub;