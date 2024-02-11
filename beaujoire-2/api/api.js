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

// get all players
app.get('/players', function (req, res) {
    dataUtils.selectPlayers((err, players) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('all votes retrieved successfully.');
            res.status(200).json({ success: true, 'players' : players });
        }
    });
});
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

app.post('/votes/saveVotes', function (req, res) {
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

app.get('/votes', function (req, res) {
    dataUtils.selectVotes((err, votes) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('all votes retrieved successfully.');
            res.status(200).json({ success: true, 'votes' : votes });
        }
    });
});

app.get('/stats/:playerId/:positionId', function (req, res) {
    const playerId = req.params.playerId;
    const positionId = req.params.positionId;

    dataUtils.getPlayerStats(playerId,positionId ,(err, playerStats) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Player stats retrieved successfully.');
            res.status(200).json({ success: true, 'player' : playerStats });
        }
    });
});

app.get('/stats/ratio/:playerId/:positionId', function (req, res) {
    const playerId = req.params.playerId;
    const positionId = req.params.positionId;

    dataUtils.getStats(positionId, playerId, (err, ratio) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Player ratio retrieved successfully.');
            res.status(200).json({ success: true, 'playerRatio' : ratio });
        }
    });
});

app.get('/top/:positionId', (req, res) => {
    const positionId = req.params.positionId;

    dataUtils.getTop(positionId, (err, topPlayer) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Top player retrieved successfully.');
            res.status(200).json({ success: true, 'topPlayer' : topPlayer });
        }
    });
});

app.get('/get-session-token', (req, res) => {
    // Access session token from cookies
    const sessionToken = req.cookies.sessionToken;
    if (sessionToken) {
        // Do something with the sessionToken
        res.status(200).json({ 'sessionToken': sessionToken });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export our API
module.exports = app;
