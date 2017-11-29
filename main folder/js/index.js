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

	var setValue = function(attribute, value){
		$(attribute).html(value).fadeIn('3000');
	}
	var attribute = function(attribute1, change, value){
		$(attribute1).attr(change,value);
	}
	var css = function(attribute1, change, value){
		$(attribute1).css(change,value);
	}

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
				name = data.drinks[0].strDrink;
				img = data.drinks[0].strDrinkThumb;
				// console.log(data);
				data1 = data;
				instructions = data.drinks[0].strInstructions;
				console.log(instructions);
				// str = data.drinks[0]["strTngredient" + number];
				// console.log(str);
				
				//$('#drinkName').html('hello');
				//$('#title').html(name);
				
				//$('#drinkName').html(name);
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
			setValue('#ingredients',ingredients)
			while(str != ""){
				str = data1.drinks[0]["strIngredient" + number];
				amount = data1.drinks[0]["strMeasure" + number];
				number = number + 1;
				console.log(str);
				console.log(amount);
				$('#ingredients').append("<p>" + amount + " " + str + "</p>");
			}
			$('#instructions').append("<p> Instructions: "  + instructions + "</p");
			//$('img').attr()
		},2000);
		
	});

	//Button for the find drink by manual ingredient search
	$('.findDrinkButton').on('click', function(){
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
				// $('#' + drinkNudeString).on('click',function(){
					
				// })
				
			}
		},700);
			$(document).on('click','#drink',function(){
				var drinkName = this.innerHTML;
				console.log(drinkName);
				var drinkNudeString = drinkName.replace(/[&\/\\#,+()$~%.'":*?<>{} -!]/g,'');
				$.ajax({
					url: "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName,
					dataType: 'json',
					type: 'GET',
					success: function(data){
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
				attribute('img','src',img);
				//css('img','width','50px;');
				//$('img').attr("width","200px");
				css('img','height','100px;');
				attribute('img','style','height:300px;')
				setValue('#ingredients',ingredients)
				while(str != ""){
					str = data1.drinks[0]["strIngredient" + number];
					amount = data1.drinks[0]["strMeasure" + number];
					number = number + 1;
					console.log(amount);
					$('#ingredients').append("<p>" + amount + " " + str + "</p>");
				}
				$('#instructions').append("<p>"  + instructions + "</p");
				//$('img').attr()
			},700);
		});
		
	});
	


	//Shopping cart remove from cart button
	$(document).on('click','#removeItem',function(){
		$('#singleItem').remove();
	});

	//Shopping cart Add to cart button
	$('#addToCartButton').on('click', function(){
		var value = document.getElementById('manualAdd').value;
		if (value != ""){
			$('#allItems').append("<div id=singleItem><div class= item id=cartItem>" + value +  "</div><div class= item id=removeItem><i class='fa fa-times fa-1x' aria-hidden=true></i></div></div>");
		}
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
