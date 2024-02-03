'use strict';

const express = require('express'), 
    path = require('path'), 
    fs = require('fs');

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

const get_files = (content, regex, files) => {
    let m;
    while ((m = regex.exec(content)) !== null) {
        files.add(m[1]);
    }
    return files;
}

const convert_to_webp = (content) => {
    let files = get_files(content, /<img.*?src=["'](.*?)["']/g, new Set());
    files = get_files(content, /background-image: url\(["'](.*?)["']\)/g, files);

    files = [...files].filter( file => file.endsWith('.jpg') || file.endsWith('.png'))
        .filter( file => { /* On vérifie que le fichier webp correspondant existe */
            const f = file.split('/').slice(-1)[0];
            return fs.existsSync(path.join(path.join(public_path, 'img', 'webp'), path.basename(f, path.extname(f)) + '.webp'));
        });

    files.forEach( file => {
        const f = file.split('/').slice(-1)[0];
        const file_name = path.basename(f, path.extname(f));
        
        content = content.replace(new RegExp(file, 'g'), 'img/webp/' + file_name + '.webp');
    });

    return content;
}

app.get('/', function(req, res) {
        const files = fs.readdirSync(views_path).map( file => {
        return [file.split('.')[0], fs.readFileSync(path.join(views_path, file), 'utf8')];
    });
    
    const layout = fs.readFileSync(path.join(public_path, 'index.html'), 'utf8');

    let combined = files.reduce( (acc, file) => {
        return acc.replace(`<%= ${file[0]} %>`, file[1]);
    }, layout);    

    if (req.webp_supported) combined = convert_to_webp(combined);

    res.send(combined);
});

module.exports = app;