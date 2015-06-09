/**
 * QClient.js
 * ==========
 * Main module exported from this library.
 */

// Require our dependencies
var https    = require('https'),
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
 * `options` [Object] - Options object. DO NOT USE THIS. For development only.
 */
function QClient(clientId, secretToken, options) {
  if (!(this instanceof QClient)) return new QClient(clientId, secretToken);
  var opts = (typeof options === 'undefined') ? {} : options;

  // Allow overriding options. Do not use this outside of development.
  this.host = (typeof opts.host === 'undefined') ? 'q.aploquote.com' : opts.host;
  this.port = (typeof opts.port === 'undefined') ? 443 : opts.host;

  this.setApiKey(clientId);
  this.setToken(secretToken);
}

QClient.prototype = {
  // API key setter method
  setApiKey: function(key) {
    if (key) this.clientId = key;
  },

  // Secret token setter
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

  /**
   * Get Subsidy
   * -----------
   * Returns a subsidy and an array of plans available
   * to the consumer based on their rating and demographic
   * info. Eligible plans already have cost sharing reductions
   * included.
   *
   * `state` [String] - 2 letter state abbreviation
   * `zip` [String, Number] - 5 digit zip code
   * `demographics` [Object] - Object containing rating information. See
   *    Q API docs for more on the structure of this object.
   * `cb` [Function] - Function called when response is available. Should take a 
   *    single String for arguments.
   */
  getSubsidy: function(state, zip, demographics, cb) {
    var endpoint      = ['/plans', state, zip].join('/');
        demographics  = JSON.stringify(demographics);

    var request = https.request({
      host: this.host,
      path: endpoint,
      port: this.port,
      method: 'POST',
      headers: {
        'Authorization': this.clientId + ':' + this.signature(endpoint, demographics),
        'Content-Type': 'application/json',
        'Content-Length': demographics.length
      }
    }, function(response) {
      var reply = '';
      response.on('data', function(chunk) {
        reply += chunk;
      });

      response.on('end', function() {
        return cb(reply); // TODO: Notify client of errors
      });
    });

    request.write(demographics);
    request.end();
  }
};

module.exports = QClient;
