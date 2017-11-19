//var chai = require('chai');
var assert = require('assert');
var first = require('../hashtable');


describe('HashTable', function(){
	it('should start empty', function(){
		var hashtable = new HashTable();
		assert.equal(hashtable._size, 0);
	});
	
	it('setting max', function(){
		var hashtable = new HashTable();
		hashtable.setMax(3);
		assert.equal(hashtable._max, 3);
	});
	
	it('hashcode should work', function(){
		var hashtable = new HashTable();
		assert.equal(1, hashtable.hashCode("peas"));
	});
	
	it('adding entries', function(){
		var hashtable = new HashTable();
		hashtable.setMax(3);
		hashtable.add("peas");
		assert.equal("peas", 1);
	});
	
	it('removing entries', function(){
		var hashtable = new HashTable();
		hashtable.setMax(3);
		hashtable.add("peas");
		hashtable.remove("peas");
		assert.equal(false, hashtable.ingredientsPresent[1]);
	});
	
	it('contains entry', function(){
		var hashtable = new HashTable();
		hashtable.setMax(3);
		hashtable.add("peas");
		assert.equal(true, hashtable.contains("peas"));
	});
});