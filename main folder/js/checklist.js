
var list = [];

function addToArray(item){
	list.push(item);
	console.log(getGlobalArray());
}

function removeFromArray(item){
	var index = list.indexOf(item);
	list.splice(index, 1);
	
	console.log(getGlobalArray());
}


function listContains(key){
	
	for(var i = 0; i < list.length; i++){
		if(list[i].toLowerCase() === key.toLowerCase()) 
			return true;
	}
	
	return false;
}



function printArray(){ console.log(list); }

function getGlobalArray(){ return list; }

function testEntries(){
	addToArray("sherry");
	addToArray("milk");
	addToArray("lime");
}


function createCheckList(){

	var url = 'http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

	$.getJSON(url, function(data) {
    //data is the JSON string
	
		//alert(data.drinks[0]);	
		//console.log(data.drinks[1].strIngredient1);
		
		//set hashtable size
		//setMax(data.drinks.length);
		//alert(data);
		//data.drinks.strIngredient1.sort();
		
		//
		var div = document.createElement('div');
		div.id = "checkboxes";
		
		var ul = document.createElement('ul');
		ul.id = "myul";
		
		
		//document.getElementById("myul").style.listStyle = "none";
		//ul.style.listStyle = "none";
		//ul.style = "list-style-type:none";
		
		
		for(var i = 0; i < data.drinks.length; i++){
		
			var li = document.createElement('li');
		
			var ingredient = data.drinks[i].strIngredient1;
		
			var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.value = ingredient;
			checkbox.id = ingredient;
			
			checkbox.addEventListener("change", function(){
				if(this.checked){ addToArray(this.value); }
				else{ removeFromArray(this.value);  }
			});
			
			
			//
			var label = document.createElement('label')
			label.htmlFor = ingredient;
			label.appendChild(document.createTextNode(ingredient));
			
			li.style.listStyle = "none";
			li.appendChild(checkbox);
			li.appendChild(label);
			
			ul.appendChild(li);
			
			
		
		}
		
		//
		div.appendChild(ul);
		document.getElementById('checkboxlist').appendChild(div);
		//document.body.appendChild(div);

		
	});
	
}
$(document).ready(function(){
	var items = $('#myul > li').get();
	items.sort(function(a,b){
	  var keyA = $(a).text();
	  var keyB = $(b).text();

	  if (keyA < keyB) return -1;
	  if (keyA > keyB) return 1;
	  return 0;
	});
	var ul = $('#myul');
	$.each(items, function(i, li){
	  ul.append(li);
	});
});


