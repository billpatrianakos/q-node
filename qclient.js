// QClient.js
// ==========
// Main module exported from this library.

// Require our dependencies
var https    = require('https'),
    crypto  = require('crypto');

// QClient
// -------
// The main function exposed to your code.
// QClient will take your client ID and token
// and set up subsequent API calls.
//
// `clientId` [String] - The Client ID you are given when signing up for Q
// `secretToken` [String] - The secret token you are given when signin up for Q
// `options` [Object] - Options object. DO NOT USE THIS. For development only.
function QClient(clientId, secretToken, options) {
  if (!(this instanceof QClient)) return new QClient(clientId, secretToken);
  var opts = (typeof options === 'undefined') ? {} : options;

  // Allow overriding options. Do not use this outside of development.
  this.host = (typeof opts.host === 'undefined') ? 'q.aplo.me' : opts.host;
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

  // Signature
  // ---------
  // Build a signature to send in the 
  // request header.
  //
  // `endpoint` [String] - The API endpoint (including dynamic params and query strings) that will be requested
  // `reqBody` [String] - The request body as a string
  //
  // returns [String] - the request signature as SHA1 HMAC
  signature: function(endpoint, reqBody) {
    var hmac = crypto.createHmac('sha1', this.secretToken).setEncoding('hex'),
        body = reqBody || '';

    hmac.write(endpoint + body);
    hmac.end();
    return hmac.read();
  },

  // Get Subsidy
  // -----------
  // Returns a subsidy and an array of plans available
  // to the consumer based on their rating and demographic
  // info. Eligible plans already have cost sharing reductions
  // included.
  //
  // `state` [String] - 2 letter state abbreviation
  // `zip` [String, Number] - 5 digit zip code
  // `demographics` [Object] - Object containing rating information. See
  //    Q API docs for more on the structure of this object.
  // `cb` [Function] - Function called when response is available. Should take a 
  //    single String for arguments.
  //
  // returns [Function] - Passes an Object to your callback containing the subsidy amount and array of plan objects
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
        return cb(null, reply);
      });

      response.on('error', function(err) {
        return cb(err, reply);
      });
    });

    request.write(demographics);
    request.end();
  },

  // Get licenses
  //
  // Get a list of valid health insurance licenses
  // for an agent based on their NPN number
  //
  // `npn` [Number] - The NPN number of the agent to use
  // `cb` [Function] - Function to call when response is ready (should accept error and body arguments)
  getLicenses: function(npn, cb) {
    var endpoint = ['/licenses', npn].join('/');

    https.get({
      host: this.host,
      path: endpoint,
      port: this.port,
      headers: {
        'Authorization': this.clientId + ':' + this.signature(endpoint),
        'Content-Type': 'application/json'
      }
    }, function(response) {
      var reply = '';

      response.on('data', function(data) {
        reply += data;
      })
      .on('end', function() {
        if (response.statusCode === 200) {
          var resultObj = JSON.parse(reply);

          resultObj.licenses.forEach(function(license) {
            license.issued_date = new Date(license.issued_date);

            if (license.expiration_date !== 'PERPETUAL')
              license.expiration_date = new Date(license.expiration_date);

            license.last_updated = new Date('license.last_updated');
          });
          return cb(null, resultObj);
        } else {
          return cb('Non-200 status returned', response.statusCode);
        }
      });
    }).on('error', function(err) {
      return cb('Unhandled exception', err.message);
    });
  },

  // Get Plan Info
  // -------------
  // Gets plan information for a single plan
  getPlanInfo: function(planId, state, county, cb) {
    var endpoint = ['/plans/info', planId, state, county.replace(/ /g, '_')].join('/');

    https.get({
      host: this.host,
      path: endpoint,
      port: this.port,
      headers: {
        'Authorization': this.clientId + ':' + this.signature(endpoint),
        'Content-Type': 'application/json'
      }
    }, function(response) {
      var reply = '';

      response.on('data', function(data) {
        reply += data;
      });

      response.on('end', function() {
        if (response.statusCode === 200) {
          return cb(null, reply);
        } else {
          return cb('Non-200 status returned', response.statusCode);
        }
      });

      response.on('error', function(err) {
        return cb(err, err.message);
      });
    });
  }
};

module.exports = QClient;
