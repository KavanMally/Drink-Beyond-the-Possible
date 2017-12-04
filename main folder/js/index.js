	// var map;
//       var infowindow;
//       var directionsService;
//       var directionsDisplay;
//       var centerCords = {lat: 41.514, lng: -81.606};

//       //FIX THESE VARIABLES SO THEY ARE DECLARED IN A FUNCTION

//      /* function calculateZoomRadius(){
//       	document.getElementById('radius').value;
//       	// min zoom 
//       	// max zoom 16
//       }*/

//       function initMap() {
//         directionsService = new google.maps.DirectionsService;
//         directionsDisplay = new google.maps.DirectionsRenderer;

//         map = new google.maps.Map(document.getElementById('contact'), {
//           center: centerCords,
//           zoom: 12
//         });
//         directionsDisplay.setMap(map);

//         //----------------------------------------------------------------
//                 if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(function(position) {
//             centerCords = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude
//             };

//             map.setCenter(centerCords);
//           }, function() {
//             handleLocationError(true, infoWindow, map.getCenter());
//           });
//         } else {
//           // Browser doesn't support Geolocation
//           handleLocationError(false, infoWindow, map.getCenter());
//         }
//       //-------------------------------------------------------------------------------

//         infowindow = new google.maps.InfoWindow();
//         var service = new google.maps.places.PlacesService(map);
//         service.nearbySearch({
//           location: centerCords,
//           radius: document.getElementById('radius').value,
//           type: ['liquor_store']
//         }, callback);
//       }

//       function calculateAndDisplayRoute(directionsService, directionsDisplay, start, finish) {
//         directionsService.route({
//           origin: start,
//           destination: finish,
//           travelMode: 'DRIVING'
//         }, function(response, status) {
//           if (status === 'OK') {
//             directionsDisplay.setDirections(response);
//           } else {
//             window.alert('Directions could not be produced because ' + status);
//           }
//         });
//         alert(finish);
// 		document.getElementById("OK").innerHTML = 
// 		'<button onclick="routeSelected()">Select this Route</button>';
//       }
// 	 //onclick="secondFunction()"

//       function callback(results, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           var i;
//           for (i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//           }
//         }
//       }

//       function createMarker(place) {
//         //var placeLoc = place.geometry.location; might not be neccesary
//         var marker = new google.maps.Marker({
//           map: map,
//           position: place.geometry.location
//         });

//         google.maps.event.addListener(marker, 'click', function() {
//           infowindow.setContent(place.name);
//           infowindow.open(map, this);
//         });

//        google.maps.event.addListener(marker, 'click', function(){
//        calculateAndDisplayRoute(directionsService, directionsDisplay, centerCords, place.geometry.location)}); // can set visibility to false, try to make it so it does directions when you select 
//       }
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
							$('#ingredients').append("<div id=ingredient><div id=manualAdd1 style='color:red'>"+ amount + " " + str + "</div> <div id=addToCartButton1 class='col-md-2 col-sm-2'>Add To Cart</div></div> <br>");
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
						$('#ingredients').append("<div id=ingredient><div id=manualAdd1 style='color:red'>"+ amount + " " + str + "</div> <div id=addToCartButton1 class='col-md-2 col-sm-2'>Add To Cart</div></div> <br>");
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
		console.log("AFRICAAA");
		var ingredientAdd = $(this).siblings("#manualAdd1").html();
		$('#allItems').append("<div id=singleItem><div class= item id=cartItem>" + ingredientAdd +  "</div><div class= item id=removeItem><i class='fa fa-times fa-1x' aria-hidden=true></i></div></div>");
	});

	//Start Twilio stuff
	const accountSid = "AC2fd72613e1ec4caa123859332ef62cfd";
	const authToken = "c735425985c92c2694e5fe3b08e9b849";
	var counter = 0;
	var currentItem = "";
	$('#sendText').on('click', function(){
		counter = 0;
		var textArray = new Array();
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
		console.log(bodyString);

		$.ajax({
            type: 'POST',
            url: 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid	 + '/Messages.json',
            data: {
               	"To" : "+19783823790",
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
            }
        });

	});
	var loadTemplate = function(){
		$(".templateContainer").append('<object type="text/html" data="drinkTemplate1.html" ></object>');
	}
 	


});


//-------------------------------------------------------------------------------------------------------
//------------------------------------------MAPPING STUFF------------------------------------------------
//-------------------------------------------------------------------------------------------------------

      

//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------