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

    if (req.get('User-Agent').includes('iPhone') || req.get('User-Agent').includes('iPad')) {
        req.webp_supported = false;
    }
    if (req.get('User-Agent').includes('Safari') && !req.get('User-Agent').includes('Chrome')) {
        req.webp_supported = false;
    }
  
    next();
});


const generate = () => {
    const files = fs.readdirSync(views_path).map( file => {
        return [file.split('.')[0], fs.readFileSync(path.join(views_path, file), 'utf8')];
    });
    
    const layout = fs.readFileSync(path.join(public_path, 'index.html'), 'utf8');

    let combined = files.reduce( (acc, file) => {
        return acc.replace(`<%= ${file[0]} %>`, file[1]);
    }, layout);

    let temp = combined; // au cas où img_convert a eu un problème
    let combined1 = img_convert(combined, false);
    if (combined1 === undefined || combined1 === null) {
        combined1 = temp;
    }

    let combined2 = img_convert(combined, true);
    if (combined2 === undefined || combined2 === null) {
        combined2 = temp;
    }

    return [combined1, combined2];
}

const explore = (folder) => fs.readdirSync(folder).map( file => {
    file = path.join(folder, file);
    const stat = fs.statSync(file);
    if (file.endsWith('.cache')) return [];
    if (stat.isDirectory()) {
        return explore(file);
    }
    return file;
}).flat();

const regroup_js = () => {
    const folder = path.join(public_path, 'js');

    let files = explore(folder);
    
    const util = files.find( file => file.endsWith('util.js'));
    const index = files.find( file => file.endsWith('index.js'));

    files = files.filter( file => file !== util && file !== index);

    let content = files.reduce( (acc, file) => {
        return acc + '\n\n' + fs.readFileSync(file, 'utf8');
    }, '');

    content += fs.readFileSync(util, 'utf8') + '\n\n';
    content += fs.readFileSync(index, 'utf8');
    
    const cache = path.join(folder, '.cache');
    if (!fs.existsSync(cache)) {
        fs.mkdirSync(cache);
    }

    fs.writeFileSync(path.join(cache, 'app.js'), content);
}

/* HTML files */
let HTML_files = {}
explore(views_path).forEach( file => {
    HTML_files[file] = fs.statSync(file).mtime;
});
HTML_files[path.join(public_path, 'index.html')] = fs.statSync(path.join(public_path, 'index.html')).mtime;  

/* JS files */
let JS_files = {};
const js_path = path.join(public_path, 'js');
explore(js_path).forEach( file => {
    JS_files[file] = fs.statSync(file).mtime;
});

let [JPG_FRIENDLY, WEBP_FRIENDLY] = generate();
regroup_js();

setInterval ( () => {
    let changed_HTML = false,
        changed_JS = false;

    for (let file in HTML_files) {
        if (fs.statSync(file).mtime > HTML_files[file]) {
            HTML_files[file] = fs.statSync(file).mtime;
            changed_HTML = true;
        }
    }

    for (let file in JS_files) {
        if (fs.statSync(file).mtime > JS_files[file]) {
            JS_files[file] = fs.statSync(file).mtime;
            changed_JS = true;
        }
    }

    if (!changed_HTML && !changed_JS) return;

    if (changed_HTML) [JPG_FRIENDLY, WEBP_FRIENDLY] = generate();
    if (changed_JS) regroup_js();
}, 2 * 1000); // 2 secondes because we are only checking for changes and not actually doing much

app.get('/', function(req, res) {
    res.send(req.webp_supported ? WEBP_FRIENDLY : JPG_FRIENDLY);
});

make();

module.exports = app;