// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');

// Create our application
const app = express();

// Minimum routing: serve static content from the html directory

// Utiliser connect-history-api-fallback pour gérer les réécritures d'URL
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Gestion de la route pour toutes les autres requêtes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, '../__common-logos__')));

// You can then add whatever routing code you need

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
