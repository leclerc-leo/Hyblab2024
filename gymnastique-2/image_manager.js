
const fs = require('fs'),
    path = require('path');
const { exit } = require('process');

const PUBLIC_PATH = path.join(__dirname, 'public');
const IMG_PATH = path.join(PUBLIC_PATH,'img');
const CACHE_PATH = path.join(IMG_PATH, '.cache');

const iterate = (sharp) => {
    /* we want to recreate the folder structure of the img folder into the .cache folder inside the img folder */

    if (!fs.existsSync(CACHE_PATH)) fs.mkdirSync(CACHE_PATH);

    const recursive = (dir) => {
        for (let file of fs.readdirSync(dir)) {
            const stat = fs.statSync(path.join(dir, file));
            
            if (file.startsWith('.')) continue;

            if (stat.isDirectory()) {

                const new_dir = path.join(CACHE_PATH, path.relative(IMG_PATH, path.join(dir, file)));
                if (!fs.existsSync(new_dir)) fs.mkdirSync(new_dir);

                recursive(path.join(dir, file));
            }

            else {
                if (!file.endsWith('.jpg') && !file.endsWith('.png')) continue;

                const input = path.join(dir, file);
                const file_name = path.basename(file, path.extname(file));
                const output = path.join(CACHE_PATH, path.relative(IMG_PATH, path.join(dir, file_name)));

                create_versions(sharp, input, output);
            }
        }
    }

    recursive(IMG_PATH);
}

const create_versions = (sharp, input, output) => {
    [
        1920,
        1280,
        640,
        320
    ]
    .forEach( async width => {

        const meta = await sharp(input).metadata();
        width = meta.width > width ? width : meta.width;

        if (!fs.existsSync(output + '-' + width + '.webp')
            || !fs.lstatSync(input).mtimeMs === fs.lstatSync(output + '-' + width + '.webp').mtimeMs)
        sharp(input)
            .resize({ width })
            .toFile(output + '-' + width + '.webp', (err, info) => {
                if (err) console.log(err, input, output + '-' + width + '.webp');
            });

        if (!fs.existsSync(output + '-' + width + '.jpg')
            || !fs.lstatSync(input).mtimeMs === fs.lstatSync(output + '-' + width + '.jpg').mtimeMs)
        sharp(input)
            .resize({ width })
            .toFile(output + '-' + width + '.jpg', (err, info) => {
                if (err) console.log(err, input, output + '-' + width + '.jpg');
            });
    });
}

const get_elements = (content, regex, elements) => {
    let m;
    while ((m = regex.exec(content)) !== null) {
        elements.add(m[1]);
    }
    return elements;
}

const get_width = (file) => {
    const parts = file.split('-');
    return parts[parts.length - 1].split('.')[0];
}

const img_convert = (content, webp_supported) => {
    try {
    let elements = get_elements(content, /<img.*?src=["'](.*?)["']/g, new Set());

    elements = [...elements].filter( file => file.endsWith('.jpg') || file.endsWith('.png'))

    elements = elements.filter( file => file !== 'img/background/frame.jpg');

    elements.forEach( file => {

        let new_file = file.replace('img/', 'img/.cache/')
        const new_file_name = path.basename(new_file, path.extname(new_file));
        new_file = new_file.replace(path.extname(new_file), '');
        const extension = webp_supported ? '.webp' : '.jpg';

        const folder = path.dirname(path.join(PUBLIC_PATH, new_file));
        if (!fs.existsSync(folder)) return;

        const files = fs.readdirSync(folder).filter( f => f.startsWith(new_file_name) && f.endsWith(extension)); 
        if (files.length === 0) return;
        
        const width = get_width(files[0]);
        const new_src = path.join(new_file + '-' + width + extension);

        let srcset = files.map( f => {
            const width = get_width(f);
            return `${path.join(new_file + '-' + width + extension)} ${width}w`;
        }).join(', ');

        srcset = srcset.replace(new_src + ' ' + width + 'w', '');
        srcset = srcset.trim();

        content = content.replaceAll(file, `${new_src}" srcset="${srcset}`);
    });

    return content;

    } 
    catch (e) {
        console.log(e);
        return null;
    }
}

const make = () => {
    try {
        const sharp = require('sharp');

        try {
        iterate(sharp);

        }
        catch (e) {
            console.log(e);
            return;
        }
    } 
    catch (e) {
        console.log('sharp is not installed : Not converting images to webp and resizing images');
        return;
    }
}

module.exports = { make, img_convert };