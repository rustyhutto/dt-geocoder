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
PORT = process.argv[2] || process.env.PORT || 3000;

// http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
    res.send("dt-geocode; GET /geocode?params=ADDRESS; GET /reverse_geocode?params=LAT,LONG")
})

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