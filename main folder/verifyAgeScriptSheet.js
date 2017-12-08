function checkingAgeWrapper(){
 	input = document.getElementById('VABirthDay').value;
 	checkingAge(input);
 }

function checkingAge(input){

	var userEnteredBirthDay = input;
	// check to make sure something was entered
	if (userEnteredBirthDay == ""){
		alert("Please enter a valid birthday.");
		return;
	}

	var bDayYear = parseInt(userEnteredBirthDay);
	var bDayMonth = parseInt(userEnteredBirthDay.substr(5,6));
	var bDayDay = parseInt(userEnteredBirthDay.substr(8,9)) - 1;

	var currentDate = new Date();

	var minYear = currentDate.getFullYear() - 21;
	var minDay = currentDate.getDate();
	var minMonth = currentDate.getMonth() + 1; // min month is 0-11 user month is 1 - 12
	var oldEnough = 0; // the lock out function was triggering before the page changed so I had to implement if statment
	// It serves no technical use but is a simple fix for a visual bug.

	if(bDayYear < minYear){
		window.location.href = window.location.href + "/../index.html";
		oldEnough = 1;
	} else{
		if (bDayYear == minYear){
			if(bDayMonth < minMonth){
				window.location.href = window.location.href + "/../index.html";
				oldEnough = 1;
			} else if(bDayMonth == minMonth){
				if(bDayDay < minDay){
					window.location.href = window.location.href + "/../index.html";
					oldEnough = 1;
				}
			}
		}	
		if (oldEnough == 0) {
			document.body.style.fontSize = "75px";
			document.body.style.textAlign = "center";
			lockOutOfApp(bDayYear, bDayMonth, bDayDay, currentDate);
		}
	}
}

function lockOutOfApp(bDayYear, bDayMonth, bDayDay, currentDate){
	document.getElementById("InputOutput").innerHTML = "You're too young to use this website! <br> The site will unlock when you are 21.";
	var daysLeft = 0;

	// convirting years difference to days
	bDayYear = bDayYear + 21; // goes from DOB to 21st birthday
	bDayYear = bDayYear - currentDate.getFullYear(); // number of years till 21st birthday
	daysLeft = (bDayYear * 365);

	// convirting month difference to days 
	var months = [0,31,59,90,120,151,181,212,243,273,304,334];

	var BdayMToDays = months[bDayMonth - 1] + bDayDay;
	var CDateMToDays = months[currentDate.getMonth()] + currentDate.getDate();

	if (BdayMToDays < CDateMToDays) 
	{
		daysLeft = daysLeft - CDateMToDays + BdayMToDays; 
	}

	if (BdayMToDays > CDateMToDays) 
	{
		daysLeft = daysLeft + BdayMToDays - CDateMToDays;
	}
	// runs every second.
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
	

	if (currentHour == 23 && currentMin == 59 && currentSecond == 59 && daysLeft != 0) 
	{
		daysLeft--;
	}

	document.getElementById("Countdown").innerHTML = " D-" + daysLeft + " H-" + currentHour + " M-" + currentMin + " S-" + currentSecond;

	if (daysLeft == 0 && currentHour == 0 && currentMin == 0 && currentSecond == 0) 
	{
		window.location.href = window.location.href + "/../index.html";
	}
	return daysLeft;
}