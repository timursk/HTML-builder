const path = require('path');
const fs = require('fs');
const url = path.join(__dirname, 'secret-folder');

fs.readdir(
  url, 
  { withFileTypes: true }, 
  (err, files) => {
    if (err) console.log(err.message);
    for (let file of files) {
      if (file.isFile()) {
        let name = path.parse(file.name).name;
        let extname = path.extname(file.name);
        extname = extname.slice(1, extname.length);

        fs.stat(url + '/' + file.name, (err, stats) => {
          if (err) console.log(err.message);
          stats.size = stats.size / 1000;
          console.log(name + ' - ' + extname + ' - ' + stats.size + 'kb');
        });
      }
    }
  }
);