$(document).ready(function() {
    var add = {};
    var date = '121713' // $("#date").val();
        //for games with date return stats. 
    var storePlayerIds;
    $.post("https://probasketballapi.com/players", {
        'api_key': 'IN72DnQLG0VZ3EWCoPaOfUXtrSsmJq68',

    }, function(data) {
        storePlayerIds = JSON.parse(data);


        console.log(storePlayerIds);


        $.post("https://probasketballapi.com/games", {
            'api_key': 'IN72DnQLG0VZ3EWCoPaOfUXtrSsmJq68',
            'date': date,
        }, function(data) {
            var gamesObj = JSON.parse(data);
            //loop through the gamesObj which contains their dates in order
            //to find the stats for each game
            var numberOfGames = 0;
            for (var key in gamesObj) {
                numberOfGames++;
            }
            var gamesFetched = 0;
            var playersOffRating = {};
            for (var key in gamesObj) {
                $.post("https://probasketballapi.com/games", {
                    'api_key': 'IN72DnQLG0VZ3EWCoPaOfUXtrSsmJq68',
                    'game_id': key,
                    'get_extra': 1
                }, function(data) {
                    gamesFetched++;
                    var parsedObject = JSON.parse(data);
                    console.log(parsedObject);

                    //loop through parsedObject which is an object with all 
                    //the game_ids and extra stats to create key/value pairs 
                    //of player ids and adv_off_ratings.

                    for (var key in parsedObject) {

                        //stores all the away players and off ratings in an object
                        for (var i = 0; i < parsedObject[key].stats.away.length; i++) {
                            playersOffRating[parsedObject[key].stats.away[i].player_id] = parsedObject[key].stats.away[i].adv_off_rating;
                            //stores all the home players and off rating in same object    
                        }
                        for (var i = 0; i < parsedObject[key].stats.home.length; i++) {
                            playersOffRating[parsedObject[key].stats.home[i].player_id] = parsedObject[key].stats.home[i].adv_off_rating;
                        }
                    }

                    if (gamesFetched === numberOfGames) {
                        var topFive = [];
                        for (var key in playersOffRating) {
                            if (topFive.length <= 4) {
                                topFive.push([key, playersOffRating[key]]);

                            } else {
                                var minimum = Math.infinity
                                var minIndex;
                                for (var i = 0; i < topFive.length; i++) {
                                    if (topFive[i][1] < minimum) {
                                        minimum = topFive[i][1];
                                        minIndex = i;
                                    }
                                }

                                if (playersOffRating[key] > minimum) {
                                    topFive.splice(minIndex, 1);
                                    topFive.push([key, playersOffRating[key]]);
                                }
                                //if current value in playersOffRating > min, replace
                            }
                        }
                        var playerName = [];


                        for (var i = 0; i < topFive.length; i++) {
                            for (var j = 0; j < storePlayerIds.length; j++) {
                                if (storePlayerIds[j].player_id.toString() === topFive[i][0]) {
                                    playerName.push(storePlayerIds[j].player_name);
                                    //get the name of that player


                                }

                                //get player name and  

                            }
                        }


                        //look up player_id in stored Player IDs

                    }

                });

            }
        });




    });

});

//for each game_id put 	





// //base logic: 
// //1.date >> game_ids
// //2.game_ids >> player_ids
// //3.player ids >> position???
// //4.position >> Offensive rating. 

// $.post("https://probasketballapi.com/stats/players", {
// 	'api_key': 'IN72DnQLG0VZ3EWCoPaOfUXtrSsmJq68',
// 	'position': 'Guards'
// }, function(data) {
// 	console.log(JSON.parse(data));
// });




//restful API: to retrieve data as client, restful practice is to do it through a get request
//standard that helps people approach/communicate. 
//GET request is more standard >> $.get()






//date, game_id, 
//if we return an empty array prompt user to enter new date: basketball season only occurred on these dates.
// 'player_id': dataObj[0].player_id,


// $(".date").val();











// Inititalize parse:
// Parse.initialize(app id, my id)

// Parse.Object.extend("classnamehere")
//

// 	//on click function select sport/year
// 	$("button").on("click",function() {
// 		var year = $(".input").val();

// var athletes = $(".input").val().get("http://api.espn.com/v1/sports/baseball/mlb/athletes")


// 		//get all athletes for nba season.
// 	}



// }

// //get requests: retrieve data we want. 

// //on click function.
// //
// $.get("http://api.espn.com/v1/sports/baseball/mlb/athletes", function(data){
// console.log(data);	
// });
