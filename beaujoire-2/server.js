// Use strict mode
'use strict';


// Load usefull expressjs and nodejs objects / modules
const express = require('express');
const path = require('path');

// Create our application
const app = express();

let db = require('./public/data/dbutils');

db.selectPlayer(1);
db.vote("test", [2, 2, 2, 1, 1, 2, 2, 1, 4, 3, 1, 2]);
db.vote("test2", [2, 2, 2, 1, 1, 2, 3, 1, 4, 3, 1, 2]);
db.vote("test3", [2, 4, 2, 1, 3, 2, 2, 1, 4, 3, 1, 2]);
db.selectVotes();
db.getStats(7, 2);
db.getTop(7);

// Load and register our REST API
const api = require('./api/api');
app.use('/api', api);

// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

app.set('view engine', 'html');

// You can then add whatever routing code you need

const ui = express.Router();
ui.get('/', (req, res) => {
    res.redirect('./home');
});

ui.get('/home', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home.html'), {
        locals: {
            pageName: 'Home'
        }
    });
});

ui.get('/field', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public/field.html'), {
        locals: {
            pageName: 'Field'
        }
    });
});

ui.get('/list', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public/list.html'), {
        locals: {
            pageName: 'List of players'
        }
    });
});

ui.get('/archives', async (req, res) => {

    res.sendFile(path.join(__dirname, 'public/archive.html'), {
        locals: {
            pageName: 'Archives'
        }
    });
});

app.use('/', ui);
// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
