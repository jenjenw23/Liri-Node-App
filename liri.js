require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require("fs");
var keys = require("./keys.js")


//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);
//var movieName = "";
var nodeArgs = "";

var task = process.argv[2];

function thirdArg(){
    nodeArgsArray = process.argv;

    for (var i = 3; i < nodeArgsArray.length; i++) {
        nodeArgs += nodeArgsArray[i];
       }
       return nodeArgs; 
}

whatToDo(task, nodeArgs);
//var movieName = "";

function whatToDo(task, nodeArgs) {
    switch (task) {

        case "my-tweets": 
        console.log("tweety tweety");
        //call function
        break;

        case "spotify-this-song": 
        //call function
        break;
        
        case "movie-this": 
        //call function
        break;

        case "do-what-it-says": 
        //call function
        break;
    }
}

