
//list of drink ids that match ingredientList
var listofdrinks = [];

//list of drinks with all ingredients present
var completeDrink = [];

var dfrd = $.Deferred();
var dfrd1 = $.Deferred();

var listCounter;

var ingLength;

//collection of drinkid and its counter
function DrinkNode(){
	
	this.drinkID = -1;
	this.counter = 0;
	this.drinkName = "";
	this.totalIngredients = 0;
}

DrinkNode.prototype.increaseCounter = function(){
	this.counter = this.counter + 1;
}

DrinkNode.prototype.setDrinkID = function(ID){
	this.drinkID = ID;
}

DrinkNode.prototype.setDrinkName = function(name){
	this.drinkName = name;
}

DrinkNode.prototype.setTotalIngredients = function(total){
	this.totalIngredients = total;
}

function search(ingredientList){
	
	
	
	//go through each ingredient in ingredient list
	
	$.when(tempMethod1(ingredientList)).then(function(){
		dfrd.resolve();
	});

	dfrd.done(function(){
		//printtestdrinklist();
		$(function(){getTotalIngredients();});
	});
}

function tempMethod1(ingredientList){
	
	listCounter = 0;
	ingLength = ingredientList.length;
	
	//for(var x = 0; x < ingredientList.length; x++){
	$.each(ingredientList, function(index, value){
		$(function(){
			getData(value);
		});
	});
	
		//console.log("Ingredient: " + ingredientList[x]);

		//getData(ingredientList[x]);
	//}
}

function getData(ingredient){
	
	//url manip
	var url = 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
	url = url.concat(ingredient);
	
	//console.log("outside getJSON");
	//console.log("outside getJSON: " + url);
	
	$.getJSON(url, function(data) {
		
		//console.log("running getData");
		//console.log("inside getJSON: " + url);
		
		
		//go through each drink returned for that ingredient
		for(var x = 0; x < data.drinks.length; x++){
			//drink name
			var temp = data.drinks[x].strDrink;
			var tempid = data.drinks[x].idDrink;
			
			var tempNode = idContains(tempid);
			
			
			//check if id is in listofdrinks
			//if yes increase counter
			if(tempNode != null){
				tempNode.increaseCounter();
			}
			//if not add to it and increase counter
			else{
				var y = new DrinkNode();
				y.setDrinkID(tempid);
				y.setDrinkName(temp);
				y.increaseCounter();
				listofdrinks.push(y);
				
				//get total ingredients
			}
		}
	}).done(function(){
		
		//console.log(listCounter);
		if(listCounter < ingLength - 1)
			listCounter++;
		else 
			return dfrd.resolve();
		
	});
	
}

function idContains(id){
	for(var x = 0; x < listofdrinks.length; x++){
		if(listofdrinks[x].drinkID == id){
			return listofdrinks[x];
		} 
	}
	return null;
}

function setCompleteList(){
	
	for(var x = 0; x < listofdrinks.length; x++){
		
		//if drinks used in all ingredients
		console.log(listofdrinks[x].counter == listofdrinks[x].totalIngredients)
		console.log(listofdrinks[x].counter);
		console.log(listofdrinks[x].totalIngredients);
		
		if(listofdrinks[x].counter == listofdrinks[x].totalIngredients){
			completeDrink.push(listofdrinks[x]);
		}
	}
	console.log("complete drink");
	console.log(completeDrink);
	
}

//get the total number of ingredients for drinks
function getTotalIngredients(){
	
	

	//need to call on setCompleteList after finishing each jquery
	
	//$.when(tempMethod()).then(function(){
	//	console.log("dfrd1 resolve();");
	//	dfrd1.resolve();
	//});
	
	tempMethod();
	
	
	/*
	dfrd1.done(function(){
		console.log("go to setCompleteList()");	
		console.log(listofdrinks.length);
		setCompleteList();
	});
	*/
}

function tempMethod(){
		
	
	
	console.log("tempMethod() call");
	console.log("list of drinks");
	console.log(listofdrinks);
	
	//jQuery.each(listofdrinks, function(index, value){
	/*
	for(var x = 0; x < listofdrinks.length; x++){
		console.log("loop through drinks");
		tempMethod2(x);
	}		
	*/
	$.each(listofdrinks, function(index, value){
		console.log("loop through drinks");
		tempMethod2(index);
	});	
	//}).promise().done(function(){
	//	dfrd1.resolve();
	//});
}


function tempMethod2(index){
	
	console.log("tempMethod2() call");
	
	var url = "";
	var base = "http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="
	
	url = base + value.drinkID;
	var value = listofdrinks[index];
		console.log("tempMethod get json of drink: " + value);
		$.getJSON(url, function(data){
				
				var arr = [];
				var iCounter = 0;
				
				console.log("in json");
				
				arr[0] = data.drinks[0].strIngredient1;
				arr[1] = data.drinks[0].strIngredient2;
				arr[2] = data.drinks[0].strIngredient3;
				arr[3] = data.drinks[0].strIngredient4;
				arr[4] = data.drinks[0].strIngredient5;
				arr[5] = data.drinks[0].strIngredient6;
				arr[6] = data.drinks[0].strIngredient7;
				arr[7] = data.drinks[0].strIngredient8;
				arr[8] = data.drinks[0].strIngredient9;
				arr[9] = data.drinks[0].strIngredient10;
				arr[10] = data.drinks[0].strIngredient11;
				arr[11] = data.drinks[0].strIngredient12;
				arr[12] = data.drinks[0].strIngredient13;
				arr[13] = data.drinks[0].strIngredient14;
				arr[14] = data.drinks[0].strIngredient15;

				console.log(arr);
				
				//get total ingredient size
				for(var y = 0; y < arr.length; y++){
					console.log("arr[y] == blank");
					console.log(arr[y] == "");
					if(arr[y] == ""){
						value.setTotalIngredients(iCounter);
						listofdrinks[index] = value;
						break;
					}else iCounter++;
				}
				
		//}).done(function() {
			
		//});
		});
	
}

//todo, noticing for gin there are blank ingrediant entries. 
//possible there are 15 slated and left blank if not? gotta check other ingredients
//and make sure to have a check to ignore if strIngredientxx:""
function runtest(){
	
	//gin and tonic, queen charlotte
	var x = ["Gin", "Tonic water", "Lime", "Red wine", "Grenadine", "Lemon-lime soda"];
	
	//$.when({search(x);}).done(function( ){printDrinks()});
	search(x);
	
	

}


function printDrinks(){
	//console.log("printing drinks");
	for(var drink in completeDrink){
		console.log(drink.drinkID);
	}
}

function printtestdrinklist(){
	for(var x = 0; x < listofdrinks.length; x++){
		console.log(listofdrinks[x].drinkName);
	}
}

function printtestdrinklist2(){
	for(var x = 0; x < completeDrink.length; x++){
		console.log(completeDrink[x].drinkName);
	}
}



