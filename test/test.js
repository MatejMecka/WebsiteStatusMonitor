var chai = require('chai')
var Action = require('../server.js')
var chaiHttp = require('chai-http');

var expect = chai.expect;
chai.use(chaiHttp);

describe('Assistant Action', function() {
	describe('/version', function() {
		it('responds with status 200', function(done) {
			chai.request(app).end(function(err, res){
          		expect(res).to.have.status(200);
          		done();
        	});
		});
	});
});
