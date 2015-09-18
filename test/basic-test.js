// Basic tests
// ===========
// Basic library tests.

var expect  = require('chai').expect,
    QClient = require('../qclient'),
    config  = require('./config.js');

describe('QClient', function() {
  describe('#getPlanInfo', function() {
    before('create a new instance of QClient', function() {
      this.Q = new QClient(config.clientId, config.clientSecret, config.options);
    });

    it('should return a JSON response containing data for a single plan', function(done) {
      this.Q.getPlanInfo('73836AK0750003', 'AK', 'Aleutians East', function(err, planInfo) {
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
});
