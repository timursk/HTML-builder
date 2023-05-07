const path = require('path');
const fs = require('fs');

const projectDist = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
const styles = path.join(__dirname, 'styles');
const assets = path.join(__dirname, 'assets');
const index = path.join(projectDist, 'index.html');
const style = path.join(projectDist, 'style.css');

function callback(err) {
    if (err) throw err;
    console.log('Working! Check project-dist!');
}

// Creates directory, index.html and change templates
async function makeIndex() {
    await fs.promises.mkdir(projectDist, { recursive: true });
    await fs.promises.copyFile(template, index);

    let data = await fs.promises.readFile(template, 'utf-8');
    const files = await fs.promises.readdir(components);
    
    for (let file of files) {
        let name = path.parse(file).name;
        let info = await fs.promises.readFile(path.join(components, file), 'utf-8');
        data = data.replace(`{{${name}}}`, info);
    }
    
    fs.writeFile(index, data, callback); 
}
makeIndex();

//Creates style.css, added styles from directory 'styles'
async function makeStyle() {
    await fs.promises.writeFile(style, '');
    const files = await fs.promises.readdir(styles);
    for (let file of files) {
        const data = await fs.promises.readFile(path.join(styles, file), 'utf-8');
        await fs.promises.appendFile(style, data + '\n');
    }
}
makeStyle();

//Copy assets
const newAssets = path.join(__dirname, 'project-dist', 'assets');
async function copyAssets() {
    await fs.promises.mkdir(newAssets, { recursive: true });
    const files = await fs.promises.readdir(assets);
    for (let file of files) {
        let name = path.join(assets, file);
        let dirName = path.join(newAssets, file);
        await fs.promises.mkdir(dirName, { recursive: true });
        const lastFiles = await fs.promises.readdir(name);
        for (let lastFile of lastFiles) {
            let lastName = path.join(name, lastFile);
            let newName = path.join(newAssets, file, lastFile);
            await fs.promises.copyFile(lastName, newName);
        }
    }
}
copyAssets();