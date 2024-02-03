'use strict';
/* Ce script permet de créer une copie de chaque fichier jpg et png en tant que fichier webp dans le dossier public/img/.cache/todo s'il n'est pas déjà présent 
 * Cela permet de facilement permettre d'uploader les images pour les convertir sans passer longtemps a chercher les images qui n'ont pas encore été converties 
 * Aller sur https://anywebp.com/convert-to-webp pour convertir les images en webp */

const fs = require('fs'),
    path = require('path');

const public_path = path.join(__dirname, 'public');
const img_path = path.join(public_path, 'img');
const webp_path = path.join(img_path, 'webp');
const cache_path = path.join(img_path, '.cache');

if (!fs.existsSync(cache_path)) fs.mkdirSync(cache_path);

const read_dir = (dir) => { // est ce que cela ne vous rappelle pas un certain langage de programmation fonctionnelle ?
    const r = (dir) => {
        return fs.readdirSync(dir).map( file => {
            if (fs.lstatSync(path.join(dir, file)).isDirectory()
                && !file.startsWith('.'))
                return read_dir(path.join(dir, file));

            if (file.endsWith('.jpg') || file.endsWith('.png')) 
                return path.join(dir, file);
        });
    }
    return r(dir).flat().filter( file => file !== undefined);
}

read_dir(img_path).forEach( file => {
    const file_name = file.split(path.sep).slice(-1)[0];
    const dest = path.join(cache_path, file_name);
    
    if (!fs.existsSync(path.join(webp_path, path.basename(file, path.extname(file)) + '.webp'))
        && !fs.existsSync(dest)
    ) fs.copyFileSync(file, dest);
});

fs.readdirSync(webp_path).forEach( file => {
    const f = file.split(path.sep).slice(-1)[0];
    const file_name = path.basename(f, path.extname(f));
    
    if (fs.existsSync(path.join(cache_path, file_name + '.jpg'))
    ) fs.unlinkSync(path.join(cache_path, file_name + '.jpg'));

    else if (fs.existsSync(path.join(cache_path, file_name + '.png'))
    ) fs.unlinkSync(path.join(cache_path, file_name + '.png'));
});