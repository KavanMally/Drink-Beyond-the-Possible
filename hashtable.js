

function HashTable(){
	
	this.ingredientsPresent = [];
	//this.ingredient = [];
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
	this.ingredientsPresent[hash] = {flag:true, };
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

//todo parse to lowercase
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
	
	heavyLoad();
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

function heavyLoad(){
	var hashtable = new HashTable();
	hashtable.setMax(10);
	
	var set = [];
	
	hashtable.add("peas");
	console.log(hashtable.hashCode("peas"));
	set.push("peas");
	
	hashtable.add("carrot");
		console.log(hashtable.hashCode("carrot"));
			set.push("carrot");


	hashtable.add("apples");
		console.log(hashtable.hashCode("apples"));
			set.push("peas");


	hashtable.add("jordans");
		console.log(hashtable.hashCode("jordans"));
			set.push("peas");


	hashtable.add("plums");
		console.log(hashtable.hashCode("plums"));
			set.push("peas");


	hashtable.add("yingling");
		console.log(hashtable.hashCode("yingling"));
			set.push("peas");


	hashtable.add("potatoes");
		console.log(hashtable.hashCode("potatoes"));
			set.push("peas");


	hashtable.add("vodka");
		console.log(hashtable.hashCode("vodka"));
			set.push("peas");


	hashtable.add("chloroform");
		console.log(hashtable.hashCode("chloroform"));
			set.push("peas");


	//hashtable.add("methenfetamines");
		//console.log(hashtable.hashCode("methenfetamines"));


	console.log(hashtable.ingredientsPresent);
}


function assertequal(x, y){
	if(x == y){
		console.log("test successful!");
	}else{
		console.log("test unsuucessful!");
	}
}