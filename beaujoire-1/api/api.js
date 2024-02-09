"use strict";

const express = require("express");
const fs = require("fs");
const app = require("express")();
const path = require("path");

app.use("/beaujoire-1/public", express.static("public"));

// Sample endpoint that sends the partner's name
app.get("/topic", function (req, res) {
	let topic;

	// Get partner's topic from folder name
	topic = path.basename(path.join(__dirname, "/.."));
	// Send it as a JSON object
	res.json({ topic: topic });
});

app.post("/beaujoire-1/public/updateStats", (req, res) => {
	fs.writeFile("./data/Stats.json", JSON.stringify(req.body), (err) => {
		if (err) {
			console.error(err);
			res.status(500).send("Error writing file");
		} else {
			res.status(200).send("Successfully wrote file");
		}
	});
});

app.listen(5500, () => {
	console.log("Server is running on port 5500");
});

// Export our API
module.exports = app;
