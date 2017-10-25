
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
			
			//console.log("sanity check: " + ingredient);
			//checkbox.onclick = function(){checkboxHandler(checkbox.value);};
			checkbox.addEventListener("change", function(){
				if(this.checked){ addToArray(this.value); }
				else{ removeFromArray(this.value);  }
			});
			
			var label = document.createElement('label')
			label.htmlFor = ingredient;
			label.appendChild(document.createTextNode(ingredient));
			
			li.style.listStyle = "none";
			li.appendChild(checkbox);
			li.appendChild(label);
			
			//document.body.appendChild(checkbox);
			//document.body.appendChild(label);
		
			//document.body.appendChild(li);
			
			ul.appendChild(li);
		
		}
		
		div.appendChild(ul);
		
		
		//document.body.appendChild(ul);
		document.body.appendChild(div);

		
		
		/*
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "name";
		checkbox.value = "value";
		checkbox.id = "id";
		
		var label = document.createElement('label')
		label.htmlFor = "id";
		label.appendChild(document.createTextNode(data.drinks[0].strIngredient1));
		
		
		document.body.appendChild(checkbox);
		document.body.appendChild(label);
		*/
	});
	
}

/*
function createCookie(){
	
	var json_str = JSON.stringify(list);
	//createCookie('mycookie', json_str);
	
	var days = 2;
	
	var d = new Date();
	d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = "ingredients = " + json_str + ";" + expires + ";path=/";
	
	console.log("ingredients = " + json_str + ";" + expires + ";path=/");
}

function deleteCookie(){

	document.cookie = "ingredients=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	
}

function getCookie(){
		
	var cookie = document.cookie;
	console.log(cookie);
}
*/