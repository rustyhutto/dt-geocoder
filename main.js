require('dotenv').config()

var express = require('express');
var NodeGeocoder = require('node-geocoder');


var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: process.env.GM_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

var app = express();
var geocoder = NodeGeocoder(options);
PORT=3000

app.get('/geocode', function(req, res) {
	// using Promise		
    geocoder.geocode('29 champs elysée paris')
        .then(function(response) {
            res.send(response)
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get('/reverse_geocode', function(req, res) {
    // using Promise
    geocoder.reverse({
            lat: 45.767,
            lon: 4.833
        })
        .then(function(response) {
            res.send(response)
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.listen(PORT, function() {
    console.log("listening on port: " + PORT);
});