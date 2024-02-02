'use strict';

const fs = require('fs');

const express = require('express');
const path = require('path');
const app = express();

const public_path = path.join(__dirname, 'public');
const views_path = path.join(public_path, 'views');
app.use(express.static(public_path, { index: false }));

app.get('/', function(req, res) {
    
    const files = fs.readdirSync(views_path).map( file => {
        return [file.split('.')[0], fs.readFileSync(path.join(views_path, file), 'utf8')];
    });
    
    const layout = fs.readFileSync(path.join(public_path, 'index.html'), 'utf8');

    const combined = files.reduce( (acc, file) => {
        return acc.replace(`<%= ${file[0]} %>`, file[1]);
    }, layout);    

    res.send(combined);
});














module.exports = app;
