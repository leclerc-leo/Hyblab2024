"use strict";

const fs = require("fs");
const app = require("express")();
const path = require("path");

// Sample endpoint that sends the partner's name
app.get("/topic", function (req, res) {
	let topic;

	// Get partner's topic from folder name
	topic = path.basename(path.join(__dirname, "/.."));
	// Send it as a JSON object
	res.json({ topic: topic });
});

app.use(require("express").json());

app.post("/updateStats", (req, res) => {
	console.log("Received a POST request to /beaujoire-1/updateStats");
	console.log("Request body:", req.body);
	const filePath = path.resolve(__dirname, "../public/data/Stats.json");
	console.log("Writing to file:", filePath);
	fs.writeFile(filePath, JSON.stringify(req.body), (err) => {
		if (err) {
			console.error("Error writing file:", err);
			res.status(500).send(`Error writing file: ${err.message}`);
		} else {
			res.status(200).send("Successfully wrote file");
		}
	});
});

// Chemin vers le fichier Likes.json
const likesFilePath = path.resolve(__dirname, './public/data/Likes.json'); // Ajustez le chemin selon votre structure de dossier

// Route pour récupérer le nombre de likes
app.get('/likes', (req, res) => {
  fs.readFile(likesFilePath, (err, data) => {
    if (err) {
      return res.status(500).send('Erreur lors de la lecture du fichier.');
    }
    res.json(JSON.parse(data));
  });
});

// Route pour incrémenter le nombre de likes pour une composition spécifique
app.post('/like', (req, res) => {
  const compositionId = req.body.compositionId;
  if (!compositionId) {
    return res.status(400).send('ID de composition manquant.');
  }

  fs.readFile(likesFilePath, (err, data) => {
    if (err) {
      return res.status(500).send('Erreur lors de la lecture du fichier.');
    }

    const likes = JSON.parse(data);
    if (typeof likes[compositionId] !== 'undefined') {
      likes[compositionId]++;
      fs.writeFile(likesFilePath, JSON.stringify(likes, null, 2), (err) => {
        if (err) {
          return res.status(500).send('Erreur lors de l\'écriture dans le fichier.');
        }
        res.json({ [compositionId]: likes[compositionId] });
      });
    } else {
      res.status(404).send('Composition non trouvée.');
    }
  });
});

app.get("/test", (req, res) => {
	res.send("This is a test route. Server routing is working!");
});

// Export our API
module.exports = app;
