// Basic tests
// ===========
// Basic library tests.

var expect  = require('chai').expect,
    QClient = require('../qclient'),
    config  = require('./config.js'),
    Q       = new QClient(config.clientId, config.clientSecret, config.options),
    _       = require('lodash');

describe('QClient', function() {
  it('should set client ID and secret as properties during initialization', function() {
    expect(Q).to.have.property('clientId');
    expect(Q).to.have.property('secretToken');
  });

  describe('#getPlanInfo', function() {
    it('should return a JSON response containing data for a single plan', function(done) {
      Q.getPlanInfo('73836AK0750003', 'AK', 'Aleutians East', function(err, planInfo) {
        if (err) {
          done(err);
        }
        var plan = JSON.parse(planInfo);

        expect(plan.status).to.equal('ok');
        expect(plan.plan).to.have.all.keys(['coverage_type', 'state', 'county', 'metal_level', 'issuer', 'plan_id', 'plan_name', 'plan_type', 'rating_area', 'issuer_id', 'effective_date', 'expiration_date', 'tobacco_matters']);
        done();
      });
    });
  });

  describe('#getLicenses', function() {
    it('should return JSON containing licenses', function(done) {
      Q.getLicenses(config.npn, function(err, response) {
        if (err) done(err);

        describe('#getLicenses -> response.licenses', function() {
          it('should have a status of "ok"', function() {
            expect(response.status).to.equal('ok');
          });

          it('should be an array', function() {
            expect(response.licenses).to.be.an('array');
          });

          it('should contain a collection of objects', function() {
            response.licenses.forEach(function(license) {
              expect(license).to.be.an('object');
            });

            describe('response.license', function() {
              it('should have expected keys', function() {
                console.log('got here');
                expect(response.licenses[0]).to.have.all.keys(['state', 'number', 'issued_date', 'expiration_date', 'resident_status', 'loa', 'loa_code', 'last_updated']);
              });

              it('has at least two keys that are date objects', function() {
                expect(response.licenses[0].issued_date).to.be.a('date');
                expect(response.licenses[0].last_updated).to.be.a('date');
              })

              describe('license.expiration_date', function() {
                it('should have a value of "PERPETUAL" or be a valid date object', function() {
                  expect(response.licenses[0]).to.satisfy(function(license) {
                    if (_.isString(license.expiration_date)) {
                      return license.expiration_date === 'PERPETUAL';
                    } else {
                      return _.isDate(license.expiration_date);
                    }
                  });
                });
              });
            });
          });
        });
        done();
      });
    })
  });
});
