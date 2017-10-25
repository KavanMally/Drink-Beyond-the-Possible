function checkingAge(){

	var userEnteredBirthDay = document.getElementById('VABirthDay').value;

	// check to make sure something was entered
	if (userEnteredBirthDay == ""){
		alert("Please enter your birthdate before entering.");
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
		alert('welcome');
		return;
	} else{
		if (bDayYear == minYear){
			if(bDayMonth < minMonth){
				alert('welcome');
				return;
			} else if(bDayMonth == minMonth){
				if(bDayDay < minDay){
					alert('welcome');
					return;
				}
			}
		}	
		// removes the input and locks the user out
		document.body.innerHTML = "You're too young to use this website!";
		document.body.style.fontSize = "75px";
		document.body.style.textAlign = "center";
	}

}




