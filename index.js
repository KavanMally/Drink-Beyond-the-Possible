$(document).ready(function() {
	var name='';
	var img='';
	var str = 'hello';
	var number=1;
	var amount=""
	var data1="";
	var instructions="";
	var statCode;
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
			// statusCode:{
			// 	200: function(){
			// 		alert('200');
			// 		statCode = 200;
			// 		console.log(statCode);
			// 	},
			// 	404: function(){
			// 		alert('404');
			// 		statCode = 404;
			// 	}

			// },
			// Everything that happens after clicking the random option 
			success: function(data){
				$('#container').load('drinkTemplate1.html');
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
