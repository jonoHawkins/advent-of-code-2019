const fs = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');
const readFile = promisify(fs.readFile);

module.exports = function readResource(resource) {
    return readFile(
        resolve(__dirname, '../resources/', resource),
        {
            encoding: 'utf8'
        }
    );
}
