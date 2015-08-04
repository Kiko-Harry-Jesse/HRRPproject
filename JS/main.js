
$(document).ready(function(){
	var add = {};
	//on click function select sport/year
	$("button").on("click",function() {
		var year = $(".input").val();
		
var athletes = $(".input").val().get("http://api.espn.com/v1/sports/baseball/mlb/athletes")
		
		
		//get all athletes for nba season.
	}



}

//get requests: retrieve data we want. 

//on click function.
//
$.get("http://api.espn.com/v1/sports/baseball/mlb/athletes", function(data){
console.log(data);	
});

