// Use strict mode
'use strict';


// Load usefull expressjs and nodejs objects / modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// Create our application
const app = express();
app.use(cookieParser());

let db = require('./public/data/dbutils.js');

db.selectPlayer(65);
db.vote("test", [2, 2, 2, 1, 1, 2, 2, 1, 4, 3, 1, 2]);
db.vote("test2", [2, 2, 2, 1, 1, 2, 3, 1, 4, 3, 1, 2]);
db.vote("test3", [2, 4, 2, 1, 3, 2, 2, 1, 4, 3, 1, 2]);
db.selectVotes();
db.getStats(7, 1);
db.getTop(5);

// Load and register our REST API
const api = require('./api/api');
app.use('/api', api);

// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

app.set('view engine', 'html');

// Set the session token :
function generateRandomToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }

    return token;
}

// You can then add whatever routing code you need

const ui = express.Router();
ui.get('/', (req, res) => {
    const token = generateRandomToken(10);
    // Set the cookie in the response
    res.cookie('sessionToken', token, { maxAge: 900000, httpOnly: true });

    res.redirect('./home');
});

ui.get('/home', async (req, res) => {
    // Retrieve the token from the 'sessionToken' cookie
    const sessionToken = req.cookies.sessionToken;
    res.sendFile(path.join(__dirname, 'public/home.html'), {
        sessionToken,
        locals: {
            pageName: 'Home'
        }
    });
});

ui.get('/field', async (req, res) => {
    // Retrieve the token from the 'sessionToken' cookie
    const sessionToken = req.cookies.sessionToken;
    res.sendFile(path.join(__dirname, 'public/field.html'), {
        sessionToken,
        locals: {
            pageName: 'Field'
        }
    });
});

ui.get('/list', async (req, res) => {
    // Retrieve the token from the 'sessionToken' cookie
    const sessionToken = req.cookies.sessionToken;
    res.sendFile(path.join(__dirname, 'public/list.html'), {
        sessionToken,
        locals: {
            pageName: 'List of players'
        }
    });
});

ui.get('/archives', async (req, res) => {
// Retrieve the token from the 'sessionToken' cookie
    const sessionToken = req.cookies.sessionToken;
    res.sendFile(path.join(__dirname, 'public/archives.html'), {
        sessionToken,
        locals: {
            pageName: 'Archives'
        }
    });
});

ui.get('/statistics', async (req, res) => {
// Retrieve the token from the 'sessionToken' cookie
    const sessionToken = req.cookies.sessionToken;
    res.sendFile(path.join(__dirname, 'public/statistics.html'), {
        sessionToken,
        locals: {
            pageName: 'Statistics'
        }
    });
});

app.use('/', ui);
// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
