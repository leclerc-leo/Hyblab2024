'use strict';

const express = require('express'), 
    path = require('path'), 
    fs = require('fs'),
    { make, img_convert } = require('./image_manager');

const app = express();

const public_path = path.join(__dirname, 'public');
const views_path = path.join(public_path, 'views');
app.use(express.static(public_path, { index: false }));

// Middleware pour savoir si le navigateur supporte les images webp
app.use((req, _, next) => {
    const accept = req.get('Accept');

    req.webp_supported = accept.includes('image/webp');
  
    next();
});

app.get('/', function(req, res) {
        const files = fs.readdirSync(views_path).map( file => {
        return [file.split('.')[0], fs.readFileSync(path.join(views_path, file), 'utf8')];
    });
    
    const layout = fs.readFileSync(path.join(public_path, 'index.html'), 'utf8');

    let combined = files.reduce( (acc, file) => {
        return acc.replace(`<%= ${file[0]} %>`, file[1]);
    }, layout);    

    let temp = combined; // au cas où img_convert a eu un problème
    combined = img_convert(combined, req.webp_supported);
    if (combined === undefined || combined === null) {
        combined = temp;
    }

    res.send(combined);
});

make();

module.exports = app;