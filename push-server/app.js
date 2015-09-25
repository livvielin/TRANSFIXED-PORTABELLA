var express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || '3000';
app.set('port', port);


app.post('/notifications', function(req, res) {

	var headers = {
	    'Content-Type': 'application/json',
	    'X-Ionic-Application-Id': 'APP ID',
	    'Authorization': 'basic ' + 'API KEY HERE'
	};
	
	var data = JSON.stringify({
		"tokens": req.body.tokens,
		"notification": req.body.notification

	});

	var options = {
	    url: 'https://push.ionic.io/api/v1/push',
	    headers: headers,
	    body: data
	};


	function callback(error, response, body) {
		console.log(response.statusCode)
	    if (!error && response.statusCode == 202) {
	        res.send(body);
	    }
	}
	request.post(options, callback);
});

app.listen(port);


/*
curl -u SECRET_API_KEY: -H "Content-Type: application/json" -H "X-Ionic-Application-Id: APP_ID" https://push.ionic.io/api/v1/push -d '{"tokens":["DEVICE-TOKEN"],"notification":{"alert":"I come from planet Ion."}}'
*/
