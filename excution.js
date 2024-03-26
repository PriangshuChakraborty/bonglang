
const fs = require('fs').promises;

async function readFile(filepath) {
    try {
        const data = await fs.readFile(filepath, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

module.exports = readFile;

