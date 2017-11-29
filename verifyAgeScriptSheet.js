//module.exports = {
	function checkingAgeWrapper(){
 	input = document.getElementById('VABirthDay').value;
 	checkingAge(input);
 }


function checkingAge(input){
//exports.checkingAge = function(input){

	var userEnteredBirthDay = input;
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
		alert("welcome");
		//return true;
	} else{
		if (bDayYear == minYear){
			if(bDayMonth < minMonth){
				alert("welcome");
				//return true;
			} else if(bDayMonth == minMonth){
				if(bDayDay < minDay){
					alert("welcome");
					//return true;
				}
			}
		}	
		// removes the input and locks the user out
		//document.body.innerHTML = "You're too young to use this website!";
		document.body.style.fontSize = "75px";
		document.body.style.textAlign = "center";
		lockOutOfApp(bDayYear, bDayMonth, bDayDay, currentDate);
		return false;
	}

}

function lockOutOfApp(bDayYear, bDayMonth, bDayDay, currentDate){
	document.getElementById("InputOutput").innerHTML = "You're too young to use this website!";


	var daysLeft = 0;

	// convirting years difference to days
	bDayYear = bDayYear + 21; // goes from DOB to 21st birthday
	bDayYear = bDayYear - currentDate.getFullYear(); // number of years till 21st birthday
	daysLeft = (bDayYear * 365);

	// convirting month difference to days 
	var months = [0,31,59,90,120,151,181,212,243,273,304,334];

	var BdayMToDays = months[bDayMonth - 1] + bDayDay;
	var CDateMToDays = months[currentDate.getMonth()] + currentDate.getDate();

	alert(BdayMToDays); //330
	alert(CDateMToDays); // 328

	if (BdayMToDays < CDateMToDays) 
	{
		daysLeft = daysLeft - CDateMToDays + BdayMToDays; 
	}

	if (BdayMToDays > CDateMToDays) {
		daysLeft = daysLeft + BdayMToDays - CDateMToDays;
	}


	var x = setInterval(function(){daysLeft = countdown(daysLeft)}, 1000);
}

function countdown(daysLeft){
	var currentDateAndTime = new Date();
	var currentTime = currentDateAndTime.getTime();
	var currentSecond = Math.floor(60 - currentTime % (1000 * 60) / 1000);
	var currentMin = Math.floor(60 - currentTime % (1000 * 60 * 60) / (1000 * 60));
	var currentHour = Math.floor(24 - currentTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));

	// syncs hours up to complete when the timer hits 0
	currentHour = (currentHour + 5) % 24;
	

	if (currentHour == 23 && currentMin == 59 && currentSecond == 59) 
	{
		daysLeft--;
	}

	document.getElementById("Countdown").innerHTML = " D-" + daysLeft + " H-" + currentHour + " Min-" + currentMin + " S-" + currentSecond;
	return daysLeft;
}

function loadDoc() {
	
  var xhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
			
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
