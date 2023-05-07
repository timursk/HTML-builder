const path = require('path');
const fs = require('fs');

const url = path.join(__dirname, 'styles');
const urlBundle = path.join(__dirname, 'project-dist', 'bundle.css');

// Create file bundle.css
fs.writeFile(urlBundle, '', err => {
    if (err) {
      console.log(err.message);
    }
});

// Read styles, then add to bundle
fs.readdir(url, { withFileTypes: true }, (err, files) => {
    if (err) {
      return console.log(err.message);
    }

    for (let file of files) {
      if (!file.isFile()) {
        continue;
      }

      const extname = path.extname(file.name);
      if (extname === '.css') {
        const link = path.join(url, file.name);
        addToArr(link);
      }
    }
});

// Add to bundle function
function addToArr(link) {
  fs.readFile(link, 'utf-8', (err, data) => {
    if (err) {
      return console.log(err.message);
    }

    fs.appendFile(urlBundle, data + '\n', err => {
      if (err) {
        console.log(err.message);
      }
    });
  });
}