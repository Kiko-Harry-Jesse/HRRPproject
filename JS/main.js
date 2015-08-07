$(document).ready(function() {
    
    
    //for games with date return stats. 
    var storePlayerIds;
    $.post("https://probasketballapi.com/players", {
        'api_key': 'IN72DnQLG0VZ3EWCoPaOfUXtrSsmJq68',

    }, function(data) {
        storePlayerIds = JSON.parse(data);


    });
   
    $('.submit').on("click", function (event) {
    	
    	var playerName = [];
    	event.preventDefault();
    	var date = $(".date").val();
    	 console.log(date);

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
            if (numberOfGames === 0) {
            	alert("No Games Played on that Day!")
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
                    // console.log(parsedObject);

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



                        for (var i = 0; i < topFive.length; i++) {
                            for (var j = 0; j < storePlayerIds.length; j++) {
                                if (storePlayerIds[j].player_id.toString() === topFive[i][0]) {
                                    playerName.push(storePlayerIds[j].player_name);

                                }

                            }

                        };
                        // console.log(playerName);
                        $(".players").empty();

                         
                         for (var i = 0; i < playerName.length; i++) {

						 $(".players").prepend("<p>" + playerName[i]+ "</p>");

                    };

                    }
                    

                   

                });
            };



        });


    });

});







//date, game_id, 
//if we return an empty array prompt user to enter new date: basketball season only occurred on these dates.
// 'player_id': dataObj[0].player_id,


// $(".date").val();
