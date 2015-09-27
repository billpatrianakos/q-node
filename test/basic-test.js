// Basic tests
// ===========
// Basic library tests.

var expect  = require('chai').expect,
    QClient = require('../qclient'),
    config  = require('./config.js'),
    Q       = new QClient(config.clientId, config.clientSecret, config.options);

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

        expect(response).to.be.a('string');

        var parsed = JSON.parse(response);

        describe('#getLicenses -> response.licenses', function() {
          it('should have a status of "ok"', function() {
            expect(parsed.status).to.equal('ok');
          });

          it('should be an array', function() {
            expect(parsed.licenses).to.be.an('array');
          });

          it('should contain a collection of objects', function() {
            parsed.licenses.forEach(function(license) {
              expect(license).to.be.an('object');
            });

            describe('response.licenses', function() {
              it('should have expected keys', function() {
                expect(parsed.licenses[0]).to.have.all.keys(['state', 'number', 'issued_date', 'expiration_date', 'resident_status', 'loa', 'loa_code', 'last_updated']);
              });
            });
          });
        });
        done();
      });
    })
  });
});
