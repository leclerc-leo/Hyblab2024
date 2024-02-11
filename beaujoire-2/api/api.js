'use strict';

const app = require( 'express' )();
const path = require('path');
const dataUtils = require('../public/data/dbutils')

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

// Modify the endpoint to use the asynchronous function
app.get('/players/:positionId', function (req, res) {
  const positionId = req.params.positionId;

  dataUtils.getPlayersByPosition(positionId, (players) => {
    res.json({ 'players': players, 'positionId': positionId });
  });

});

// Get player content by id
app.get('/player/:playerId', function (req, res) {
    const playerId = req.params.playerId;

    dataUtils.selectPlayer(playerId, (err, playerContent) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ 'player': playerContent });
        }
    });

});

app.post('/saveVotes', function (req, res) {
    const token = req.body.token;
    const votes = req.body.votes;

    // Call the dataUtils.vote function
    dataUtils.vote(token, votes, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Votes saved successfully.');
            res.status(200).json({ success: true });
        }
    });
});

app.post('/stats/:playerId/:positionId', function (req, res) {
    const playerId = req.params.playerId;
    const positionId = req.params.positionId;

    dataUtils.getPlayerStats(positionId, playerId, (err, playerStats) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Player stats retrieved successfully.');
            res.status(200).json({ success: true, 'player' : playerStats });
        }
    });
});

app.get('/api/top/:positionId', (req, res) => {
    const positionId = req.params.positionId;

    dataUtils.getTop(positionId, (err, topPlayers) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Top players retrieved successfully.');
            // If there is a first row, return it; otherwise, return an empty object
            const responseData = firstRow ? { success: true, topPlayer: firstRow } : { success: true, topPlayer: {} };
            res.status(200).json(responseData);
        }
    });
});

// Export our API
module.exports = app;
