const path = require('path');
const fs = require('fs');

const url = path.join(__dirname, 'files');
const urlCopy = path.join(__dirname, 'files-copy');

// Create dir
fs.mkdir(urlCopy, { recursive: true }, (err) => {
    if (err) console.log(err.message);
});

// Remove all old files from copy
fs.readdir(urlCopy, (err, files) => {
    if (err) return console.log(err.message);
    for (let file of files) {
        fs.unlink(path.join(urlCopy, file), err => {
            if (err) throw err;
        });
    }
});

// Read original dir, then copy
fs.readdir(url, { withFileTypes: true }, (err, files) => {
    if (err) return console.log(err.message);
    for (let file of files) {
        let orig = path.join(url, file.name);
        let copy = path.join(urlCopy, file.name);
        fs.copyFile(orig, copy, (err) => {
            if (err) console.log(err.message);
        });
    }
});