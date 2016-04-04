"use strict"
var url = require('url');

var noOptions = {};

function getCredentials() {
  if(process.env.MONGO_USER &&  process.env.MONGO_PASSWORD) {
    return process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD;
  }
  return "";
}

function getAuthenticatedConnectionString(baseMongoUrl, options) {

  var options = options || noOptions
  var userCredentials = getCredentials();
  var theUrl = url.parse(baseMongoUrl, true);

  var newUrl = {
    protocol: theUrl.protocol,
    host: theUrl.host,
    pathname: theUrl.pathname,
    slashes: true,
    query : Object.assign({}, theUrl.query, options),
    auth : userCredentials
  }

  return url.format(newUrl);
}

module.exports = {
  getAuthenticatedConnectionString
}
