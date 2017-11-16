

function HashTable(){
	
	this.ingredientsPresent = [];
	this._size = 0;
	this._max = 0;
	
}

HashTable.prototype.setMax = function(Max){
	
	this._max = Max;
};

HashTable.prototype.add = function(key){
	
	hash = this.hashCode(key);
	//console.log(hash);
	//console.log("Hash of " + key + ": " + hash);
	this.ingredientsPresent[hash] = true;
	this._size = this._size + 1;
	
};

HashTable.prototype.remove = function(key){
	
	hash = this.hashCode(key);
	this.ingredientsPresent[hash] = false;
	this._size = this._size - 1;
		
};

HashTable.prototype.contains = function(key){
		
	hash = this.hashCode(key);
	return (this.ingredientsPresent[hash] == true);

};

//https://gist.github.com/alexhawkins/f6329420f40e5cafa0a4
HashTable.prototype.hashCode = function(key){
	var hash = 0;
	for (var i = 0; i < key.length; i++) {
		var letter = key[i];
		hash = (hash << 5) + letter.charCodeAt(0);
		hash = (hash & hash) % this._max;
	}
	return hash;
};


//test this stuff
function testHashtable(){
	
	/*
	var hashtable = new HashTable();
	hashtable.setMax(3);
	console.log(hashtable.hashCode("peas"));
	console.log("index: " + hashtable._max);
	hashtable.add("coffee");
	hashtable.add("tea");
	
	console.log(hashtable.contains("tea"));
	
	hashtable.remove("tea");
	console.log(hashtable.contains("tea"));
	console.log(hashtable.contains("dsaf"));
	*/
	
	testSize();
	testMax();
	testHashCode();
	testAdd();
	testRemove();
	testContaining();
}

function testSize(){
	var hashtable = new HashTable();
	console.log("size test");
	assertequal(hashtable._size, 0);
	
}

function testMax(){
	var hashtable = new HashTable();
	hashtable.setMax(3);
	//console.log(hashtable._max);
	console.log("max test");
	assertequal(hashtable._max, 3);
	
}

function testHashCode(){
	var hashtable = new HashTable();
	hashtable.setMax(3);
	console.log("hash test");
	//console.log(hashtable.hashCode("peas"));
	assertequal(1, hashtable.hashCode("peas"));
}


function testAdd(){
	var hashtable = new HashTable();
	hashtable.setMax(3);
	hashtable.add("peas");
	//console.log(hashtable.ingredientsPresent[1]);
	console.log("add test");
	assertequal(hashtable.ingredientsPresent[1], true);
}

function testRemove(){
	var hashtable = new HashTable();
	hashtable.setMax(3);
	hashtable.add("peas");
	hashtable.remove("peas");
	console.log("remove test");
	assertequal(false, hashtable.ingredientsPresent[1]);
}

function testContaining(){
	var hashtable = new HashTable();
	hashtable.setMax(3);
	hashtable.add("peas");
	console.log("containing test");
	assertequal(true, hashtable.contains("peas"));
}

function assertequal(x, y){
	if(x == y){
		console.log("test successful!");
	}else{
		console.log("test unsuucessful!");
	}
}