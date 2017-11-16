/*const verifyAgeScriptSheet = require('../verifyAgeScriptSheet.js');
var expect = require('chai').expect
var input = require('../verifyAgeScriptSheet.js')

describe('checkingAge', function(){
	it('returns false because user is under 21', function(){
		var inputDate = '2012-10-10';
		var output = input.checkingAge(inputDate);
		expect(output).to.equal(false);
	});

	it('returns false because user is under 21 (also the year is more than 4 digits)', function(){
		var inputDate = '1354352345431-10-10';
		var output = input.checkingAge(inputDate);
		expect(output).to.equal(false);
	});

	it('returns false because user turns 21 today and we dont have a more precise measurment', function(){ //date may need to be updated at later tests
		var inputDate = '1996-26-10';
		var output = input.checkingAge(inputDate);
		expect(output).to.equal(false);
	});

	it('returns nothing because no date was entered', function(){
		var inputDate = '';
		var output = input.checkingAge(inputDate);
		expect(output).to.equal();
	});

	it('returns true because user is over 21 (by many years)', function(){
		var inputDate = '1900-10-10';
		var output = input.checkingAge(inputDate);
		expect(output).to.equal(true);
	});

	it('returns true because user is over 21 (by less than a year more than a month)', function(){ //date may need to be updated at later tests
		var inputDate = '1996-02-26';
		var output = input.checkingAge(inputDate);
		expect(output).to.equal(true);
	});

	it('returns true because user is over 21 (by less than a month more than a day)', function(){ //date may need to be updated at later tests
		var inputDate = '1996-10-10';
		var output = input.checkingAge(inputDate);
		expect(output).to.equal(true);
	});
});*/
