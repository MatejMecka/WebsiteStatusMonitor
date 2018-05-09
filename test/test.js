var chai = require('chai')
var action = require('../server')
var chaiHttp = require('chai-http');

var expect = chai.expect;
chai.use(chaiHttp)

describe('Assistant Action', function() {
	describe('/version', function() {
		it('responds with status 200', function(done) {
			chai.request(action).get('/version').end(function(err, res){
          		expect(res).to.have.status(200);
          		done();
        	});
		});
	});
});
