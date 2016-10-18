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
	console.log(req.query)
	var latLong = req.query['params'].split(",")
    var lat = latLong[0]
    var long = latLong[1]
    // using Promise
    geocoder.reverse({
            lat: lat,
            lon: long
        })
        .then(function(response) {
            res.send(response[0].formattedAddress)
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.listen(PORT, function() {
    console.log("listening on port: " + PORT);
});