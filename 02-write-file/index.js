const { stdin, stdout } = process;
const readline = require('readline');
const path = require('path');
const fs = require('fs');
const url = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({ 
  input: stdin, 
  output: stdout 
});

//Create file text.txt and check if it was created
fs.access(url, fs.constants.F_OK, (err) => {
  if (err) {
    fs.writeFile(url, '', (err) => {
      if(err) {
        console.log(err.message);
      }
    });
  }
});

console.log('Enter some text!');

//Add text to file
rl.on('line', (data) => {
  if (data === 'exit') {
    console.log('Exit from app');
    rl.close();
  } 
  else {
   addText(data); 
  }
});

function addText(data) {
  data = data += '\n';
  fs.appendFile(url, data, err => {
    if (err) {
      return console.log(err.message);
    }
  });
}

//Exit
rl.on('SIGINT', () => {
  console.log('Exit from app');
  rl.close();
});
