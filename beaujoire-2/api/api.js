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


// Export our API
module.exports = app;
