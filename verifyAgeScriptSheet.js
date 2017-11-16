module.exports = {
function checkingAgeWrapper(){
	input = document.getElementById('VABirthDay').value;
	checkingAge(input);
}


//function checkingAge(input){
exports.checkingAge = function(input){

	var userEnteredBirthDay = input;

	// check to make sure something was entered
	if (userEnteredBirthDay == ""){
		//alert("Please enter your birthdate before entering.");
		return;
	}

	var bDayYear = parseInt(userEnteredBirthDay);
	var bDayMonth = parseInt(userEnteredBirthDay.substr(5,6));
	var bDayDay = parseInt(userEnteredBirthDay.substr(8,9));

	var currentDate = new Date();

	var minYear = currentDate.getFullYear() - 21;
	var minDay = currentDate.getDate();
	var minMonth = currentDate.getMonth() + 1; // min month is 0-11 user month is 1 - 12

	// at some point edit this so it has fewer retern statments, atm it's neccesary.
	if(bDayYear < minYear){
		//alert("welcome");
		return true;
	} else{
		if (bDayYear == minYear){
			if(bDayMonth < minMonth){
				//alert("welcome");
				return true;
			} else if(bDayMonth == minMonth){
				if(bDayDay < minDay){
					//alert("welcome");
					return true;
				}
			}
		}	
		// removes the input and locks the user out
		//document.body.innerHTML = "You're too young to use this website!";
		//document.body.style.fontSize = "75px";
		//document.body.style.textAlign = "center";
		return false;
	}

}

}

/*function loadDoc() {
	
  var xhttp = new XMLHttpRequest();

	/*xmlhttp.onreadystatechange = function() {
			
		if (xmlhttp.readyState == 1) {
			document.body.innerHTML = "loading...";
		}
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//logToAnalytics(url);
		}
	};


	
  xhttp.open("GET", "checklist.html", true);
  xhttp.send();
  alert("AHHHHHHHHHH");
}
*/
