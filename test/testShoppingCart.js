var chai = require('chai');
var assert = require('chai').assert;
var expect = require('chai').expect;
var request = require('request');
//var cart = require('../index.js');
describe('http response code for cocktaildb', function(done){
	it('should return 200', function(done){
		setTimeout(function(){
			try{
				request.get('http://www.thecocktaildb.com/api/json/v1/1/random.php', function(err, res, body){
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.equal('wrong header');
				done();
				});
			}
			catch(e){
				done(e);
			}
			
		
		});
	});
});