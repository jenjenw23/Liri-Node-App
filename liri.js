require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require("fs");
var keys = require("./keys.js")


var nodeArgs = "";
var movieName = "";
var songTitle = "";

var task = process.argv[2];
thirdArg();

function thirdArg(){
    nodeArgsArray = process.argv;

    for (var i = 3; i < nodeArgsArray.length; i++) {
        if (task === "movie-this") {  
            nodeArgs  += nodeArgsArray[i]  + "+";   
              }
              else {
                nodeArgs  += nodeArgsArray[i]  + " ";
              }          
       }
       return nodeArgs; 
}
fs.appendFile("./log.txt", "Command entered: " + task + " " + nodeArgs + "\r\n",function(err){
    if (err) throw err;
 });

whatToDo(task);

function whatToDo(task) {
    switch (task) {

        case "my-tweets": 
        //call function
        getTweets();
        break;

        case "spotify-this-song": 
        //set song name for search -- call function
        songTitle = nodeArgs;
        if (songTitle === "") { 
            getSpotify("'The Sign' by Ace of Base");
		} else {
            getSpotify(songTitle);
        }
        break;
        
        case "movie-this": 
       //set movie name for search -- call function
        movieName = nodeArgs;
		if (movieName === "") {
			getMovieInfo("Mr. Nobody");
		} else {
			getMovieInfo(movieName);
        }
        break;

        case "do-what-it-says": 
        //call function
        doWhatItSays();
        break;
    }
}


function getMovieInfo(movieName) {  
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        //console.log(queryUrl);
        request(queryUrl, function(error, response, body) {

          if (!error && response.statusCode === 200) {
            var movie = JSON.parse(body);
            console.log("Movie Title: " + movie.Title);
            console.log("Release Year: " + movie.Year);
            console.log("IMDB Rating: " + movie.imdbRating);
            console.log("Rotten Tomatoes Rating : " + movie.Ratings[1].Value);
            console.log("Country Produced In: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors: " + movie.Actors);
          }
        });
    }

    function getSpotify(songTitle){
        var spotify = new Spotify(keys.spotify);

        spotify.search({type: 'track', query: songTitle}, function(err, data) {
            if (err) {
               console.log(err);
               return
        }

        var songsArr = data.tracks.items;
        
        for (var i = 0; i < songsArr.length; i++) {
    
            var songArtist = songsArr[i].artists[0].name;
            var songName = songsArr[i].name;
            var songAlbum = songsArr[i].album.name;
            var songPreview = songsArr[i].preview_url;
            
            if (!songPreview) {
                songPreview = "Not available";
            }

            console.log("Artist(s): " + songArtist + "\n" + "Song: " + songName + "\n" + "Album: " + songAlbum + "\n" + "Preview : " + songPreview + "\n" );
            };
        
        });
    };

    
    function getTweets() {
    var client = new Twitter(keys.twitter);

        //return latest 20 tweets
    var params = {screen_name: 'iamtobiasthecat', count:20};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
          
            if (!error) { 
              for (var i = 0; i < tweets.length ; i++) {
                  var tweetText = tweets[i].text;
                  var tweetDate = tweets[i].created_at;
                  console.log("Tweet: " + tweetText + "\n" + "Date: " + tweetDate + "\n");
              }
          } else {
            console.log(error);
          }
        });    
    }
 
    function doWhatItSays() {
        fs.readFile("./random.txt", "utf8", function(err, data) {
            if (err) {
                console.log(err);
            } else {
    
                var randomArray = data.split(",");
    
                task = randomArray[0];
                nodeArgs = randomArray[1];
    
                whatToDo(task);
            }
        });
    }
    
