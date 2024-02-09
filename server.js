"use strict";

// general routing framework
var express = require("express");
var app = express();

// declare the list of sub apps
var app_names = [];

var hyblab2024_names = [
	"beaujoire-1",
	"beaujoire-2",
	"femmes",
	"gymnastique-1",
	"gymnastique-2",
	"bretons-1",
	"bretons-2",
	"quartiers-1",
	"quartiers-2",
];

app_names.push.apply(app_names, hyblab2024_names);

var sub_apps = [];

// create sub apps
// and register sub-apps
app_names.forEach(function (element, index, array) {
	console.log("Registering: " + element);
	sub_apps[element] = require("./" + element + "/server");
	app.use("/" + element, sub_apps[element]);
});

// redirect catch all url to hyblab website (disabled for dev)
// app.use(/\/$/, function (req, res, next) {
// 	res.redirect("http://www.hyblab.fr/");
// });

// launch main server app

//warning:  do not change the port, it will be automatically taken from env en dev and prod servers ...
var port = "PORT" in process.env ? process.env.PORT : 8080;
var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Hyblab routing app listening at http://%s:%s", host, port);
});
