
const fs = require('fs').promises;

async function readFiles() {
    try {
        const files = await fs.readdir('./');
        const bongFiles = files.filter(file => file.endsWith('.bong'));
        const fileContents = await Promise.all(bongFiles.map(readFile));
        return fileContents;
    } catch (error) {
        console.error(error);
    }
}

async function readFile(filepath) {
    try {
        const data = await fs.readFile(filepath, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

module.exports = readFiles; 










