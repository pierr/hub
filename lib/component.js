var defaultConfig = require('./config');


//Dependencies.
var dataLoader = require('./services/loader');
var extend = require('./util/extend');
var events = require('./ui/events');
var HTTP_STATUS = require('./util/statusCodes');
var requireCSS = require('./util/requireCSS');
//Templates.
var template = {
  nav: require('./templates/nav'),
  activation: require('./templates/activation'),
  unautenticated: require('./templates/unautenticated'),
  error: require('./templates/error')
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
    if (this.config.cssUrl) {
      requireCSS(this.config.cssUrl);
    }
    this.el = this.config.ui.element || document.createElement(this.config.ui.tagName);
    this.el.className = this.config.ui.className;
    var hub = this;
    this.load().then(function(s) {
      hub.render();
    }).catch(function(err) {
      console.log(err);
      if (err.statusCode === HTTP_STATUS.UNAUTHORIZED) {
        if (!(err === undefined || err.action === undefined || err.SAMLRequest === undefined)) {
          err.RelayState = document.URL;
          return hub.renderAutentication(err);
        }
      }
      return hub.renderError(err);
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
   * @return {object}
   */
  Hub.prototype.registerEvents = function() {
    var component = this;
    var actionButtons = this.el.querySelectorAll(this.config.ui.activatorSelector);
    [].forEach.call(actionButtons, function(btn) {
      btn.addEventListener('click', events.toggleHub, false);
      btn.addEventListener('dragstart', events.hubActivatorDragStart, false);
      btn.addEventListener('dragend', events.hubActivatorDragStop, false);
    });

    var hubActivator = this.el.querySelector('[data-hub-activator]');
    hubActivator.addEventListener('dragstart', events.hubActivatorDragStart, false);
    hubActivator.addEventListener('dragend', events.hubActivatorDragStop, hubActivator);

    return this;
  };

  /**
   * [render description]
   * @return {object}
   */
  Hub.prototype.render = function() {
    this.el.innerHTML = template.activation() + template.nav(this.data);
    this.registerEvents();
    return this;
  };

  Hub.prototype.renderAutentication = function(errorData) {
    this.el.innerHTML = template.activation() + template.unautenticated(errorData);
    this.registerEvents();
    var hub = this;
    /*setTimeout(function() {
      var form = hub.el.querySelector("form[name='loginform']");
      if (form) {
        form.submit();
      }
    }, 10);*/
    return this;
  };

  /**
   * Render the error page of the hub inside it.
   * @type {object}
   */
  Hub.prototype.renderError = function(errorData) {
    this.el.innerHTML = template.activation() + template.error(errorData);
    this.registerEvents();
    var hub = this;
    return this;
  };



  return Hub;

})();

module.exports = Hub;