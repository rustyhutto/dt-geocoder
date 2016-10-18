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

app.get('/geocode', function(req, res) {
    // Using callback
    // Or using Promise
    geocoder.geocode('29 champs elysée paris')
        .then(function(response) {
            console.log(response);
            res.send(response)
        })
        .catch(function(err) {
            console.log(err);
        });
    // res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});