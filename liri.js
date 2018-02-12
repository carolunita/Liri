// node variables
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
require("dotenv").config();

// read and set environmental variables and keys
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// user input variables
var userinput = process.argv[2];
var specify = process.argv[3];

// user input logic
if (userinput == "my-tweets") {
	myTweets();
} else if (userinput == "spotify-this-song") {
	findSong();
} else if (userinput == "movie-this") {
	findMovie();
} else if (userinput == "do-what-it-says") {
	simonSays();
} else {
	console.log("Error! Invalid user input.");
}

function myTweets() {

}

function findSong() {
	console.log("Hiya");
}

function findMovie() {
	// select a movie
	if (typeof specify != "undefined") {
		// format movie name for search query by replacing spaces with +
		specify = specify.replace(/ /g, "+");
	} else {
		// if no movie is specified, search for Mr. Nobody
		specify = "Mr.+Nobody";
	}

	// query url for OMDB API
	var queryUrl = "http://www.omdbapi.com/?t=" + specify + "&y=&plot=short&apikey=trilogy";

	// run request and print information about the movie
	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
}

function simonSays() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		}

		// split up the data to get user input
		var data = data.split(",");
		userinput = data[0];
		specify = data[1];

		findSong();
	});
}