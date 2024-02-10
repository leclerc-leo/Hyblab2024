'use strict';

const app = require( 'express' )();
const path = require('path');

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

// Modify the endpoint to use the asynchronous function
app.get('/api/players/:position', function (req, res) {
  const position = req.params.position;
  
  dataUtils.getPlayersByPosition(position, (players) => {
    res.json({ 'players': players, 'position': position });
  });
});


// Export our API
module.exports = app;
