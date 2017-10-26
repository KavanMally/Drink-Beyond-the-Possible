

function testGlobalArray(){
	
	var x = getGlobalArray();
	printArray();
}


function unit_testing(){
	
	
}


//go through all checkboxes and check that the label matches id and value
function testCheckBoxes(){

	var unorderedlist = document.getElementById("myul");
	var listItem = unorderedlist.getElementsByTagName("li");
	
	for(var i = 0; i < listItem.length; i++){
		
		var x = listItem[i].childNodes;
		if(x[0].value !== x[1].innerHTML) 
			console.log("Error! Label not the same as value!");
	}
	
	console.log("Checkboxes created successfully!");
	
}

function testAdding(){
	
	
}


//check to make sure html code is complete (ie no missing tags)
function testHTMLCode(){
	
	
	
}