// -----------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------Verify Age functions----------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------

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

	if (BdayMToDays < CDateMToDays) {
		daysLeft = daysLeft - CDateMToDays + BdayMToDays; 
	}

	if (BdayMToDays > CDateMToDays) {
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
	
	if (currentHour == 23 && currentMin == 59 && currentSecond == 59 && daysLeft != 0) {
		daysLeft--;
	}

	document.getElementById("Countdown").innerHTML = " D-" + daysLeft + " H-" + currentHour + " M-" + currentMin + " S-" + currentSecond;

	if (daysLeft == 0 && currentHour == 0 && currentMin == 0 && currentSecond == 0) {
		window.location.href = window.location.href + "/../index.html";
	}
	return daysLeft;
}

// -----------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------mapping functions-------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
var map;
var infowindow;
var directionsService;
var directionsDisplay;
var centerCords = {lat: 41.501975, lng: -81.607539}; var directionURL = "";
var selectedMarker = null;
var directionURLString = "";

function initMap() {
	document.getElementById("moreInfo").innerHTML = ""; // resets the buttons because nothing is selected 
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    //determines initial zoom based on radius searched
    var zoomValue = 12;
    if(document.getElementById('radius').value >= 8000){
    	zoomValue = 11;
    	if(document.getElementById('radius').value >= 20000){
    		zoomValue = 10;
    	}
    }
    map = new google.maps.Map(document.getElementById('contact'), {
        center: centerCords,
        zoom: zoomValue
    });
    directionsDisplay.setMap(map);
        //----------------------------------------------------------------  

    if(centerCords.lat == 41.501975 && centerCords.lng == -81.607539){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            	centerCords = {
            		lat: position.coords.latitude,
              		lng: position.coords.longitude
            	};

            	map.setCenter(centerCords);
          	}, function() {
   		        handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
          	// Browser doesn't support Geolocation
        	handleLocationError(false, infoWindow, map.getCenter());
        }
    }
      //-------------------------------------------------------------------------------
    var selectedMarker = null;
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
    	location: centerCords,
    	radius: document.getElementById('radius').value,
    	type: ['liquor_store']
    }, callback);
}

<<<<<<< HEAD
function calculateAndDisplayRoute(directionsService, directionsDisplay, start, finish, finishAddress) {
    directionsService.route({
        origin: start,
        destination: finish,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
        	directionsDisplay.setDirections(response);
        } else {
        	window.alert('Directions could not be produced because ' + status);
=======
        // url that will be texted
        directionURL = "http://www.google.com/maps/dir/" + centerCords.lat + "," + centerCords.lng + "/" + formatStoreName(finishAddress) + "/@" + finish.lat() + "," + finish.lng();
        document.getElementById("moreInfo").innerHTML = '<a class="btn btn-light" href="' + directionURL + '" target="_blank">More Info</a> ' +
        '<a class="btn btn-light directionText">Add Directions to Text</a>'; // Here's the button Vish
          }
   //onclick="secondFunction()"

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var i;
          for (i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
>>>>>>> 8f5d4fdce6ba4eb1827f431eacd46f50d7d767bc
        }
    });
    // url that will be texted
    directionURL = "http://www.google.com/maps/dir/" + centerCords.lat + "," + centerCords.lng + "/" + formatStoreName(finishAddress) + "/@" + finish.lat() + "," + finish.lng();
    document.getElementById("moreInfo").innerHTML = '<a class="btn btn-light" href="' + directionURL + '" target="_blank">More Info</a> ' +
    '<a class="btn btn-light directionText">Add Directions to Text</a>'; // Here's the button Vish
}


function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
    	var i;
        for (i = 0; i < results.length; i++) {
        	createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    //var placeLoc = place.geometry.location; might not be neccesary
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
       
    google.maps.event.addListener(marker, 'click', function() {
    	infowindow.setContent(place.name);
        infowindow.open(map, this);
    });

    google.maps.event.addListener(marker, 'click', function(){
       	if (selectedMarker != null) {
       	  	selectedMarker.setVisible(true);
       	}
       	selectedMarker = marker;
        marker.setVisible(false);
        calculateAndDisplayRoute(directionsService, directionsDisplay, centerCords, place.geometry.location, place.vicinity) // if extra time re add place.name to the vicinty and fix the bug
    }); // can set visibility to false, try to make it so it does directions when you select 
}

function formatStoreName(name){
    var test = 1;
    var formatedName = "";
    while(name.indexOf(' ') != -1){
        formatedName += name.substring(0, name.indexOf(' '));
        formatedName += "+";
        name = name.substring(name.indexOf(' ') + 1);
        test++; 
    }
    formatedName += name;
    return formatedName;
}


var printBack = function(stuff){
		console.log(stuff);
}

$(document).ready(function() {
	var name='';
	var img='';
	var str = 'hello';
	var number=1;
	var amount=""
	var data1="";
	var instructions="";
	var statCode;
	var ingredients = " ";
	var redCount = 0;

	var listContains = function(key){
	
	for(var i = 0; i < list.length; i++){
		if(list[i].toLowerCase() === key.toLowerCase()) 
			return true;
	}
	
		return false;
	}
	var setValue = function(attribute, value){
		$(attribute).html(value).fadeIn('3000');
	}
	var attribute = function(attribute1, change, value){
		$(attribute1).attr(change,value);
	}
	var css = function(attribute1, change, value){
		$(attribute1).css(change,value);
	}

	$(document).on('click','#drink',function(){
				
				$('#ingredients').empty();
				instructions = " ";
				var drinkName = this.innerHTML;
				var drinkNudeString = drinkName.replace(/[&\/\\#,+()$~%.'":*?<>{} -!]/g,'');

				$.ajax({
					url: "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName,
					dataType: 'json',
					type: 'GET',
					success: function(data){
						document.getElementById('instructions').innerHTML = "";
						name = data.drinks[0].strDrink;
						img = data.drinks[0].strDrinkThumb;
						console.log(data);
						data1 = data;
						instructions = data.drinks[0].strInstructions;
						console.log(instructions);

					}
				})
			setTimeout(function(){
				$("#drinkName").hide();
				$("#drinkName").attr('font-size', "100px;");
				setValue('#drinkName', name);
				//$('img').attr('src',img);
				attribute('.templateImage','src',img);
				css('img','height','100px;');
				attribute('img','style','height:300px;');
				setValue('#ingredients',ingredients);
				str = data1.drinks[0]["strIngredient1"];
				$('#ingredients').append( "Ingredients: (Green means you have it in stock and red means you don't) <br>");
				while(str != ""){
					str = data1.drinks[0]["strIngredient" + number];
					amount = data1.drinks[0]["strMeasure" + number];
					number = number + 1;
					console.log(amount);
					//$('#ingredients').append("<div id=ingredient>" + amount + " " + str + "<br>");
					if (str != ""){
						if (listContains(str)){
							$('#ingredients').append("<div id=ingredient><div id=manualAdd1 style='color:#32CD32'>"+ amount + " " + str + "</div> <div id=addToCartButton1 class='col-md-2 col-sm-2'>Add To Cart</div></div> <br>");
							
						}
						else{
							$('#ingredients').append("<div id=ingredient><div id=manualAdd1 style='color:#FFCCCC'>"+ amount + " " + str + "</div> <div id=addToCartButton1 class='col-md-2 col-sm-2'>Add To Cart</div></div> <br>");
							redCount++;
						}
					}
				}
				$('#ingredients').append("<div id=ingredient><div>You need "+ redCount + " more ingredients to make this drink<br></div></div>");
				$('#instructions').append("Instructions: "+  instructions + "<br>");
				number = 1;
				redCount = 0;
				//$('img').attr()
			},700);
		});
	//Random drink search option is clicked
	$('#randomSelect').on('click', function(){
		$.ajax({
			url:'http://www.thecocktaildb.com/api/json/v1/1/random.php',
			dataType: 'json',
			type: 'GET',
			statusCode:{
				200: function(){
					//alert('200');
					statCode = 200;
					console.log(statCode);
				},
				404: function(){
					//alert('404');
					statCode = 404;
				}

			},
			// Everything that happens after clicking the random option 
			success: function(data){
				//$('#templateContainer').load('drinkTemplate1.html');
				//loadTemplate();
				document.getElementById('instructions').innerHTML = "";
				name = data.drinks[0].strDrink;
				img = data.drinks[0].strDrinkThumb;
				// console.log(data);
				data1 = data;
				instructions = data.drinks[0].strInstructions;
				console.log(instructions);
			},
			//Error message
			error: function(data){
				//Append </p> "Oops something went wrong :/"
			}
		});
			console.log(statCode);
			setTimeout(function(){
			$("#drinkName").hide();
			$("#drinkName").attr('font-size', "100px;");
			setValue('#drinkName', name);
			//$('img').attr('src',img);
			attribute('.templateImage','src',img);
			//css('img','width','50px;');
			//$('img').attr("width","200px");
			css('img','height','100px;');
			attribute('img','style','height:300px;')
			setValue('#ingredients',ingredients);
			str = data1.drinks[0]["strIngredient1"];
			while(str != ""){
				str = data1.drinks[0]["strIngredient" + number];
				amount = data1.drinks[0]["strMeasure" + number];
				number = number + 1;
				if (str != ""){
					if (listContains(str)){
						$('#ingredients').append("<div id=ingredient><div id=manualAdd1 style='color:#32CD32'>"+ amount + " " + str + "</div> <div id=addToCartButton1 class='col-md-2 col-sm-2'>Add To Cart</div></div> <br>");
						
					}
					else{
						$('#ingredients').append("<div id=ingredient><div id=manualAdd1 style='color:#FFCCCC'>"+ amount + " " + str + "</div> <div id=addToCartButton1 class='col-md-2 col-sm-2'>Add To Cart</div></div> <br>");
						redCount++;
					}
				}
			}
			$('#ingredients').append("<div id=ingredient><div>You need "+ redCount + " more ingredients to make this drink<br></div></div>");
			$('#instructions').append("<p> Instructions: "  + instructions + "</p>");
			number = 1;
			redCount = 0;
			//$('img').attr()
		},700);
		
	});

	//Button for the find drink by manual ingredient search
	$('.findDrinkButton').on('click', function(){
		$('#list').empty();
		console.log("here");
		var drinkValue = document.getElementById('manualSearch').value;
		console.log(drinkValue);
		$.ajax({
			url:'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + drinkValue,
			dataType: 'json',
			type: 'GET',
			// Everything that happens after clicking the random option 
			success: function(data){
				if (data.drinks != null){
					length = data.drinks.length;
					drinkList = data.drinks
				
				}
				else{
					length = 0;
				}
			},
			error: function(data){

			}
		});
		//after getting the drink list print them on the result list
		setTimeout(function(){
			for (i=0; i < length; i++){
				//console.log(drinkName);
				var drinkName = drinkList[i].strDrink;
				//created to colve special characters conflict
				
				$('#list').append("<div id=" + "drink" + ">" + drinkName + "</div>" 
		);		
			}
		},700);
		
	});

	$('.keywordSearch').on('click', function(){
		$('#list').empty();
		console.log("here");
		var drinkValue2 = document.getElementById('keywordSearch').value;
		$.ajax({
			url:'http://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkValue2,
			dataType: 'json',
			type: 'GET',
			// Everything that happens after clicking the random option 
			success: function(data){
				length = data.drinks.length;
				drinkList = data.drinks
				//console.log(drinkList[1].strDrink);
				console.log(length);
			},
			error: function(data){

			}
		});
		//after getting the drink list print them on the result list
		setTimeout(function(){
			for (i=0; i < length; i++){
				//console.log(drinkName);
				var drinkName = drinkList[i].strDrink;
				//created to colve special characters conflict
				$('#list').append("<div id=" + "drink" + ">" + drinkName + "</div>" 
		);		
			}
		},700);


		
	});


	//Shopping cart remove from cart button
	$(document).on('click','#removeItem',function(){
		$(this).closest('#singleItem').remove();
	});

	//Shopping cart Add to cart button
	$('#addToCartButton').on('click', function(){
		var value = document.getElementById('manualAdd').value;
		if (value != ""){
			$('#allItems').append("<div id=singleItem><div class= item id=cartItem>" + value +  "</div><div class= item id=removeItem><i class='fa fa-times fa-1x' aria-hidden=true></i></div></div>");
		}
	});
	$(document).on('click','#addToCartButton1',function(){
		var ingredientAdd = $(this).siblings("#manualAdd1").html();
		$('#allItems').append("<div id=singleItem><div class= item id=cartItem>" + ingredientAdd +  "</div><div class= item id=removeItem><i class='fa fa-times fa-1x' aria-hidden=true></i></div></div>");
	});

	//Start Twilio stuff
	const accountSid = "AC2fd72613e1ec4caa123859332ef62cfd";
	const authToken = "c735425985c92c2694e5fe3b08e9b849";
	var counter = 0;
	var currentItem = "";
	var targetString = "";
	$('#sendText').on('click', function(){
		counter = 0;
		var textArray = new Array();
		targetString = document.getElementById('manualNumber').value;
		$('#allItems').children('#singleItem').each(function(){
			var item = document.getElementsByClassName('item');
			var itemName = item[counter].innerHTML;
			counter = counter + 2;;
			textArray.push(itemName);
			
		});
		var bodyString = ""
		textArray.forEach(function(item, index, textArray){
			bodyString += item;
			bodyString += ", ";
		});
		if (directionURL != ""){
			bodyString += "Here is the google maps direction link to your liquor store: "
			bodyString += directionURLString;
		}
		console.log(bodyString);

		$.ajax({
            type: 'POST',
            url: 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid	 + '/Messages.json',
            data: {
               	"To" : targetString,
	   			"From" : "+16176124369",
                "Body" : bodyString
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa(accountSid + ':' + authToken));
            },
            success: function(data) {
                console.log(data);
            },
            error: function(data) {
                console.log(data);
                alert("Something went wrong, invalid number entered");
            }
        });

	});
	var loadTemplate = function(){
		$(".templateContainer").append('<object type="text/html" data="drinkTemplate1.html" ></object>');
	}

	$(document).on('click', '.directionText',function(){
		directionURLString = directionURL;
	});

});

