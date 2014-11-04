/**
 * Create a CORS request for ie.
 * @param  {string} method - GET /POST.
 * @param  {string} url    - The url you want to reach.
 * @return {object} an xml httpRequest or a domain request.
 */
module.exports = function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
};