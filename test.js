

function testGlobalArray(){
	
	var x = getGlobalArray();
	printArray();
}


function unit_testing(){
	
	testCheckBoxes();
	testAdding();
	testRemoving();
	
}


//go through all checkboxes and check that the label matches id and value
function testCheckBoxes(){

	var unorderedlist = document.getElementById("myul");
	var listItem = unorderedlist.getElementsByTagName("li");
	
	for(var i = 0; i < listItem.length; i++){
		
		var x = listItem[i].childNodes;
		if(x[0].value !== x[1].innerHTML) //check that checkbox's value matches label's label
			console.log("Error! Label not the same as value!");
	}
	
	console.log("Checkboxes created successfully!");
	
}


//goes through all checkboxes and checks that for each check, its value is added to list
function testAdding(){
	
	var unorderedlist = document.getElementById("myul");
	var listItem = unorderedlist.getElementsByTagName("li");
	
	for(var i = 0; i < listItem.length; i++){
		var x = listItem[i].childNodes;
		x = x[0];
		x.checked = true;
		var event = new Event('change');
		x.dispatchEvent(event);
		
		//console.log(x.value);
		//console.log($.inArray(x.value, getGlobalArray()));
		
		if($.inArray(x.value, getGlobalArray()) == -1){
			console.log("ERROR: Problem adding " + x.value);
			return;
		}
	}
	
	console.log("Checkboxes add values successfully!");
	
}

//goes through all checkboxes and checks that for each uncheck, its value is removed from the list
function testRemoving(){
	
	//testAdding();
	
	var unorderedlist = document.getElementById("myul");
	var listItem = unorderedlist.getElementsByTagName("li");
	
	for(var i = 0; i < listItem.length; i++){
		var x = listItem[i].childNodes;
		x = x[0];
		x.checked = false;
		var event = new Event('change');
		x.dispatchEvent(event);
		
		//console.log(x.value);
		//console.log($.inArray(x.value, getGlobalArray()));
		
		if($.inArray(x.value, getGlobalArray()) != -1){
			console.log("ERROR: Problem removing " + x.value);
			return;
		}
	}
	
	console.log("Checkboxes remove values successfully!");
	
}

