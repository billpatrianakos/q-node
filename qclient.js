/**
 * QClient.js
 * ==========
 * Main module exported from this library.
 */

// Require our dependencies
var http    = require('http'),
    crypto  = require('crypto');

/**
 * QClient
 * -------
 * The main function exposed to your code.
 * QClient will take your client ID and token
 * and set up subsequent API calls.
 *
 * `clientId` [String] - The Client ID you are given when signing up for Q
 * `secretToken` [String] - The secret token you are given when signin up for Q
 */
function QClient(clientId, secretToken) {
  if (!(this instanceof QClient)) return new QClient(clientId, secretToken);

  this.setApiKey(clientId);
  this.setToken(secretToken);
}

QClient.prototype = {
  setApiKey: function(key) {
    if (key) this.clientId = key;
  },

  setToken: function(secret) {
    if (secret) this.secretToken = secret;
  },

  /**
   * Signature
   * ---------
   * Build a signature to send in the 
   * request header.
   */
  signature: function(endpoint, reqBody) {
    var hmac = crypto.createHmac('sha1', this.secretToken).setEncoding('hex');
    hmac.write(endpoint + reqBody);
    hmac.end();
    return hmac.read();
  },

  getSubsidy: function(state, zip, demographics) {
    var endpoint      = ['/plans', state, zip].join('/'),
        demographics  = JSON.stringify(demographics);

    var request = http.request({
      host: 'localhost',
      path: endpoint,
      port: 9292,
      method: 'POST',
      headers: { 'Authorization': [this.clientId, this.signature(endpoint, demographics)].join(':') }
    }, function(response) {
      var reply = '';
      response.on('data', function(chunk) {
        reply += chunk;
      });

      response.on('end', function() {
        console.log(reply);

        return reply;
      });
    });

    request.write(demographics);

    console.log(endpoint, [this.clientId, this.signature(endpoint, demographics)].join(':'));

    return request.end();
  }
};

module.exports = QClient;
