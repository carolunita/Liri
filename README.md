# Liri
A Node.js application which accepts user input and completes requests accordingly.

# Requirements
You will need to have the following Node.js packages installed prior to running this application: dotenv, inquirer, node-spotify-api, request, and twitter.

# Instructions
In the command line, enter "node liri.js (command) (specify)." (Command) and (specify) are placeholders for user inputs. See below for a list of possible commands. Specify refers to a specific search query, such as a movie or song title, which is entered as a string.

# Commands
1. my-tweets - Displays the user's last 10 tweets and their date of creation.

2. spotify-this-song - Displays the top 10 search results for the user's entered search term. Returns each track's title, artist(s), and album, as well as a preview link. Defaults to "The Sign" by Ace of Base if no search term is entered.

3. movie-this - Displays the top search result for the user's entered search term. Returns information about the movie's title, release year, IMDB rating, Rotten Tomatoes rating, country, language, plot, and actors. Defaults to "Mr. Nobody" is no search term is entered.

4. do-what-it-says - Performs command written in the random.txt file. 

# Log
A record is kept of all executed commands and results in the log.txt file.

# Technologies Used
* JavaScript
* Node.js
* Node.js packages (dotenv, inquirer, node-spotify-api, request, twitter)
