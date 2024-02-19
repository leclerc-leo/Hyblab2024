// Use strict mode
"use strict";

// Load usefull expressjs and nodejs objects / modules
const fs = require("fs");
const express = require("express");
const path = require("path");
// Create our application
const app = express();

// Load and register our REST API
const api = require("./api/api");
app.use("/api", api);

// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../__common-logos__")));
app.use(express.json());

// You can then add whatever routing code you need
app.post("/beaujoire-1/updateStats", (req, res) => {
	console.log("Received a POST request to /beaujoire-1/updateStats");
	console.log("Request body:", req.body);
	fs.writeFile("./data/Stats.json", JSON.stringify(req.body), (err) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error writing file");
		} else {
			res.status(200).send("Successfully wrote file");
		}
	});
});

app.get("/test", (req, res) => {
	res.send("This is a test route. Server routing is working!");
});

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
