// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
const express = require('express');
const path = require('path');

// Create our application
const app = express();

// Load and register our REST API
const api = require('./api/api');
app.use('/api', api);

// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// You can then add whatever routing code you need
app.get('/quartiers', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quartiers.html'));
});
app.get('/reportages', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reportages.html'));
});
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});
app.get('/credits', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'credits.html'));
});
app.get('/interview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'interview.html'));
});
// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
