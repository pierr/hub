/**
 * Include a css file from the server with a simple require.
 * @param  {string} href - The location of the css file.
 * @return {undefined}
 */
module.exports = function includeCSSfile(href) {
    var head_node = document.getElementsByTagName('head')[0];
    var link_tag = document.createElement('link');
    link_tag.setAttribute('rel', 'stylesheet');
    link_tag.setAttribute('type', 'text/css');
    link_tag.setAttribute('href', href);
    head_node.appendChild(link_tag);
};