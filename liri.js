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

// display latest tweets
function myTweets() {
	fs.appendFileSync("./log.txt", "\nCOMMAND \nLook up last 10 tweets. \n \nRESULT \n");
	var parameters = {screen_name: "karmui001"};
	
	client.get("statuses/user_timeline", parameters, function(error, tweets, response) {
		if (!error) {
	    	// display last 10 tweets and when they were created
	    	for (var i = 0; i < 10; i++) {
	    		console.log("\n" + (i + 1));
		    	console.log(tweets[i].text);
		    	console.log(tweets[i].created_at);
		    	fs.appendFileSync("./log.txt", tweets[i].text);
		    	fs.appendFileSync("./log.txt", tweets[i].created_at + "\n \n");
		    }
	  	}
	});
}

// search for a song
function findSong() {
	// select a song
	if (typeof specify != "undefined") {
		fs.appendFileSync("./log.txt", "\nCOMMAND \nSearch for a track called '" + specify + ".' \n \nRESULT \n");

		// format song name for search query by replacing spaces with +
		specify = specify.replace(/ /g, "+");
	} else {
		fs.appendFileSync("./log.txt", "\nCOMMAND \nSearch for a track called 'The Sign.' \n \nRESULT \n");

		// if no song is specified, search for "The Sign" by Ace of Base
		specify = "The+Sign+Ace+of+Base";
	}

	// search for a song and display results
	spotify.search({type: "track", query: specify, limit: 10}, function(error, data) {
  		if (error) {
    		console.log(error);
  		}
 		
 		// display search results
 		console.log("Did you mean...");

 		for (var i = 0; i < data.tracks.items.length; i++) {
 			console.log("\n" + (i+1));
			
			// display track title
			console.log("Track: " + data.tracks.items[i].name); 
			fs.appendFileSync("./log.txt", "Track: " + data.tracks.items[i].name + "\n");

			// logic to handle displaying multiple artists, if needed
			if (data.tracks.items[i].artists.length > 1) {
				var artistnames = [];
				for (var j = 0; j < data.tracks.items[i].artists.length; j++) {
					artistnames.push(data.tracks.items[i].artists[j].name);
				}
				artistnames = artistnames.join(", ");
				console.log("Artist(s): " + artistnames);
				fs.appendFileSync("./log.txt", "Artist(s): " + artistnames + "\n");
			} else {
				console.log("Artist: " + data.tracks.items[i].artists[0].name);
				fs.appendFileSync("./log.txt", "Artist: " + data.tracks.items[i].artists[0].name + "\n");
			}
			
			// display album title
			console.log("Album: " + data.tracks.items[i].album.name);
			fs.appendFileSync("./log.txt", "Album: " + data.tracks.items[i].album.name + "\n");
			
			// display preview url, if it exists
			if (data.tracks.items[i].preview_url != null) {
				console.log("Preview: " + data.tracks.items[i].preview_url);
				fs.appendFileSync("./log.txt", "Preview: " + data.tracks.items[i].preview_url + "\n \n");
			} else {
				console.log("Preview not available.");
				fs.appendFileSync("./log.txt", "Preview not available. \n \n");
			}
		}
	});
}

// search for a movie
function findMovie() {
	// select a movie
	if (typeof specify != "undefined") {
		fs.appendFileSync("./log.txt", "\nCOMMAND \nLook for a movie called '" + specify + ".' \n \nRESULT \n");

		// format movie name for search query by replacing spaces with +
		specify = specify.replace(/ /g, "+");
	} else {
		fs.appendFileSync("./log.txt", "\nCOMMAND \nLook for a movie called 'Mr. Nobody.' \n \nRESULT \n");

		// if no movie is specified, search for "Mr. Nobody"
		specify = "Mr.+Nobody";
	}

	// query url for OMDB API
	var queryUrl = "http://www.omdbapi.com/?t=" + specify + "&y=&plot=short&apikey=trilogy";

	// run request and display information about the movie
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

			fs.appendFileSync("./log.txt", "Title: " + JSON.parse(body).Title + "\n");
			fs.appendFileSync("./log.txt", "Release Year: " + JSON.parse(body).Year + "\n");
			fs.appendFileSync("./log.txt", "IMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\n");
			fs.appendFileSync("./log.txt", "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n");
			fs.appendFileSync("./log.txt", "Country: " + JSON.parse(body).Country + "\n");
			fs.appendFileSync("./log.txt", "Language: " + JSON.parse(body).Language + "\n");
			fs.appendFileSync("./log.txt", "Plot: " + JSON.parse(body).Plot + "\n");
			fs.appendFileSync("./log.txt", "Actors: " + JSON.parse(body).Actors + "\n \n");
		}
	});
}

// do whatever the random.txt file says
function simonSays() {
	fs.appendFileSync("./log.txt", "\nCOMMAND \nDo what random.txt says. \n \nRESULT \n");

	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		}

		// split up the data to get user input
		var data = data.split(",");
		userinput = data[0];
		specify = data[1];

		// user input logic
		if (userinput == "my-tweets") {
			myTweets();
		} else if (userinput == "spotify-this-song") {
			findSong();
		} else if (userinput == "movie-this") {
			findMovie();
		} else {
			console.log("What have you done!?!?!?!?");
		}
	});
}