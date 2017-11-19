const verifyAgeScriptSheet = require('../mappingScript.js');
var expect = require('chai').expect
var input = require('../mappingScript.js')

describe('checkingAge', function(){

// not finished 
	it('returns false because user turns 21 today and we dont have a more precise measurment', function(){ //date may need to be updated at later tests
		var inputStart = '';
		var inputFinish = '';

		var output = input.calculateAndDisplayRoute(directionsService, directionsDisplay, inputStart, inputFinish);
		expect(output).to.equal(false);
	});
});


/*
Tests to implement for mapping:

creating 

(base line) my location 5000 radius: functions normally 
No liquor stores in the search area: result alert suggests expanding the radius

either google cannot find the device location or permision to give the website the user's location is denied. 
(will implement that the map will not be created until a value is entered to specify where the user is)

user clicks on every single marker 


radius
*enter the minimum radius 500
*enter the maximum radius 100,000
* enter a number above the max radius
* find no nodes at the max radius: Alert the user that there are no liquor stores in their area   
*/